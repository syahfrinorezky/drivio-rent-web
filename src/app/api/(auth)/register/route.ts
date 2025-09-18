import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/nodemailer";

const registerSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parse = registerSchema.safeParse(body);

    if (!parse.success) {
      return NextResponse.json(
        { message: parse.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parse.data;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingAccount = await prisma.users.findUnique({
      where: { email },
    });

    if (existingAccount) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000);

    const hashedOtp = await bcrypt.hash(otp.toString(), 10);

    await prisma.emailVerifications.create({
      data: {
        userId: user.id,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await sendOtpEmail(email, otp.toString());

    return NextResponse.json(
      {
        message: "Register successful, please verify your email",
        user: { id: user.id, email: user.email },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
