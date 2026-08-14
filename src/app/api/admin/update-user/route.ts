import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, newRole, newStatus } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Kullanıcı ID zorunludur.' }, { status: 400 });
    }

    const dataToUpdate: any = {};
    if (newRole) dataToUpdate.role = newRole;
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate
    });

    return NextResponse.json({ 
      success: true, 
      user: updatedUser, 
      message: 'Kullanıcı yetki ve rolü başarıyla güncellendi.' 
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ success: false, message: 'Güncelleme hatası oluştu.' }, { status: 500 });
  }
}
