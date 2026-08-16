import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserSystemRoles, SYSTEM_ROLE_MAP } from '@/lib/rbac';

// Helper to extract session data
async function getSessionUser(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const sessionMatch = cookieHeader.match(/user_session=([^;]+)/);
  if (!sessionMatch) return null;
  try {
    const data = JSON.parse(decodeURIComponent(sessionMatch[1]));
    if (!data?.id) return null;
    return data;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const roles = await getUserSystemRoles(session.id);
    if (!roles.includes('ORGANIZATION_ADMIN') && !roles.includes('PLATFORM_ADMIN')) {
      return NextResponse.json({ success: false, message: 'Bu alanı görüntüleme yetkiniz yok.' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: { companyId: true }
    });

    if (!user?.companyId && !roles.includes('PLATFORM_ADMIN')) {
      return NextResponse.json({ success: false, message: 'Bir kuruma bağlı değilsiniz.' }, { status: 400 });
    }

    // STRICT ORGANIZATION ISOLATION: query only employees in user's company!
    const whereCondition = roles.includes('PLATFORM_ADMIN') && !user?.companyId
      ? {}
      : { companyId: user?.companyId || undefined };

    const employees = await prisma.user.findMany({
      where: whereCondition,
      include: {
        professionalPosition: true,
        department: true,
        userRoles: { include: { role: true } },
        enrollments: { include: { training: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const company = user?.companyId ? await prisma.company.findUnique({
      where: { id: user.companyId },
      include: { package: true }
    }) : null;

    return NextResponse.json({
      success: true,
      employees: employees.map(emp => ({
        id: emp.id,
        name: emp.name,
        surname: emp.surname || '',
        email: emp.email,
        role: emp.role,
        systemRoles: emp.userRoles.map(ur => ur.role.name),
        professionalPosition: emp.professionalPosition?.name || emp.title || 'Belirtilmedi',
        department: emp.department?.name || 'Genel',
        storeRegion: emp.storeRegion || 'Merkez',
        accountStatus: emp.accountStatus || 'ACTIVE',
        assignedTrainingsCount: emp.enrollments.length,
        createdAt: emp.createdAt
      })),
      company: company ? {
        id: company.id,
        name: company.name,
        employeeCount: employees.length,
        licenseLimit: company.licenseLimit,
        packageName: company.package?.name || 'Standart Kurumsal'
      } : null
    });
  } catch (error) {
    console.error('Error fetching corporate employees:', error);
    return NextResponse.json({ success: false, message: 'Çalışan listesi yüklenemedi.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Yetkisiz erişim.' }, { status: 401 });
    }

    const roles = await getUserSystemRoles(session.id);
    if (!roles.includes('ORGANIZATION_ADMIN') && !roles.includes('PLATFORM_ADMIN')) {
      return NextResponse.json({ success: false, message: 'Çalışan ekleme yetkiniz yok.' }, { status: 403 });
    }

    const currentUser = await prisma.user.findUnique({ where: { id: session.id } });
    if (!currentUser?.companyId && !roles.includes('PLATFORM_ADMIN')) {
      return NextResponse.json({ success: false, message: 'Bir kuruma bağlı değilsiniz.' }, { status: 400 });
    }

    const body = await req.json();
    const { action } = body; // "SINGLE_ADD" | "EMAIL_INVITE" | "BULK_IMPORT" | "GENERATE_INVITE_LINK"

    if (action === 'SINGLE_ADD' || action === 'EMAIL_INVITE') {
      const { name, surname, email, professionalPositionId, systemRole, departmentId, storeRegion } = body;

      if (!name || !email) {
        return NextResponse.json({ success: false, message: 'Ad ve e-posta zorunludur.' }, { status: 400 });
      }

      const cleanEmail = email.trim().toLowerCase();

      // Check existing email
      const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
      if (existingUser) {
        return NextResponse.json({ success: false, message: 'Bu e-posta adresi zaten kayıtlı.' }, { status: 400 });
      }

      // Check license limit
      if (currentUser?.companyId) {
        const company = await prisma.company.findUnique({ where: { id: currentUser.companyId } });
        const currentCount = await prisma.user.count({ where: { companyId: currentUser.companyId } });
        if (company && currentCount >= company.licenseLimit) {
          return NextResponse.json({
            success: false,
            message: `Kurum lisans limitinize (${company.licenseLimit} kullanıcı) ulaştınız. Lütfen paketinizi yükseltin.`
          }, { status: 400 });
        }
      }

      const newUser = await prisma.user.create({
        data: {
          name: name.trim(),
          surname: surname?.trim() || '',
          email: cleanEmail,
          password: 'Pka' + Math.random().toString(36).slice(-6) + '!',
          role: systemRole || 'PARTICIPANT',
          companyId: currentUser?.companyId,
          professionalPositionId: professionalPositionId || undefined,
          departmentId: departmentId || undefined,
          storeRegion: storeRegion?.trim() || 'Mağaza Operasyon',
          customerType: 'CORPORATE',
          accountStatus: action === 'EMAIL_INVITE' ? 'PENDING' : 'ACTIVE'
        }
      });

      // Assign system role in UserRole
      const systemRoleName = systemRole || 'STUDENT';
      let sysRoleObj = await prisma.systemRole.findUnique({ where: { name: systemRoleName } });
      if (sysRoleObj) {
        await prisma.userRole.create({
          data: {
            userId: newUser.id,
            roleId: sysRoleObj.id
          }
        });
      }

      return NextResponse.json({
        success: true,
        message: action === 'EMAIL_INVITE' ? `${cleanEmail} adresine davet e-postası gönderildi.` : 'Çalışan başarıyla eklendi.',
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      });
    }

    if (action === 'BULK_IMPORT') {
      const { usersList } = body; // Array of { name, surname, email, position, department }
      if (!Array.isArray(usersList) || usersList.length === 0) {
        return NextResponse.json({ success: false, message: 'Yüklenecek liste boş.' }, { status: 400 });
      }

      let addedCount = 0;
      for (const u of usersList) {
        if (!u.email || !u.name) continue;
        const cleanEmail = u.email.trim().toLowerCase();
        const exists = await prisma.user.findUnique({ where: { email: cleanEmail } });
        if (exists) continue;

        const created = await prisma.user.create({
          data: {
            name: u.name,
            surname: u.surname || '',
            email: cleanEmail,
            password: 'Pka' + Math.random().toString(36).slice(-6) + '!',
            role: 'PARTICIPANT',
            companyId: currentUser?.companyId,
            customerType: 'CORPORATE',
            accountStatus: 'ACTIVE'
          }
        });

        const studentRoleObj = await prisma.systemRole.findUnique({ where: { name: 'STUDENT' } });
        if (studentRoleObj) {
          await prisma.userRole.create({
            data: { userId: created.id, roleId: studentRoleObj.id }
          });
        }
        addedCount++;
      }

      return NextResponse.json({
        success: true,
        message: `${addedCount} çalışan başarıyla sisteme yüklendi ve hesapları oluşturuldu.`
      });
    }

    if (action === 'GENERATE_INVITE_LINK') {
      const companyId = currentUser?.companyId || 'default';
      const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000'}/kayit?corpToken=${companyId}_${Date.now()}`;
      return NextResponse.json({
        success: true,
        inviteUrl
      });
    }

    return NextResponse.json({ success: false, message: 'Geçersiz işlem.' }, { status: 400 });
  } catch (error) {
    console.error('Error managing corporate employees:', error);
    return NextResponse.json({ success: false, message: 'İşlem sırasında sunucu hatası oluştu.' }, { status: 500 });
  }
}
