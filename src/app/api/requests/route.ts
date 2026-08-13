import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const RequestSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır."),
  companyName: z.string().min(2, "Şirket Adı en az 2 karakter olmalıdır."),
  title: z.string().optional(),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  city: z.string().min(2, "Lütfen şehir belirtiniz."),
  subCount: z.preprocess((val) => Number(val) || 0, z.number().nonnegative()),
  employeeCount: z.preprocess((val) => Number(val) || 0, z.number().nonnegative()),
  department: z.string().optional(),
  training: z.string().optional(),
  count: z.preprocess((val) => Number(val) || 0, z.number().nonnegative().optional()),
  format: z.string().optional(),
  date: z.string().optional().transform((val) => val ? new Date(val) : null),
  notes: z.string().optional(),
  gdpr: z.boolean().refine(val => val === true, "KVKK aydınlatma metnini onaylamanız gerekmektedir.")
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = RequestSchema.parse(body);

    const newRequest = await prisma.trainingRequest.create({
      data: {
        name: validated.name,
        companyName: validated.companyName,
        title: validated.title,
        phone: validated.phone,
        email: validated.email,
        city: validated.city,
        subCount: validated.subCount,
        employeeCount: validated.employeeCount,
        department: validated.department,
        training: validated.training,
        count: validated.count,
        format: validated.format,
        date: validated.date,
        notes: validated.notes,
        gdpr: validated.gdpr,
        status: 'BEKLIYOR'
      }
    });

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error) {
    console.error('Error handling request POST:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'İç sunucu hatası oluştu.' }, { status: 500 });
  }
}
