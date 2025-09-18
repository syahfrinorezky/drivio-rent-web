import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    const verification = await prisma.emailVerifications.findFirst({
      where: {
        user: { email },
        used: false,
        expiresAt: { gte: new Date() },
      },
      include: {
        user: true,
      },
    });

    if (!verification) {
      return NextResponse.json(
        { message: "OTP Invalid or Expired" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(otp, verification.otp);

    if (!isValid) {
      return NextResponse.json({ message: "OTP Invalid" }, { status: 400 });
    }

    await prisma.emailVerifications.update({
      where: { id: verification.id },
      data: { used: true },
    });

    await prisma.users.update({
      where: { id: verification.userId },
      data: { verifiedAt: new Date() },
    });

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
