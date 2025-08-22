// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = resetPasswordSchema.parse(body);
    const { token, password } = validatedData;

    // Find and validate the reset request
    const resetRequest = await prisma.passwordReset.findUnique({
      where: {
        token,
      },
    });

    if (!resetRequest) {
      return NextResponse.json(
        { error: "Invalid reset token." },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (resetRequest.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "Reset token has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if PIN was verified
    if (!resetRequest.verified) {
      return NextResponse.json(
        { error: "PIN not verified. Please verify your PIN first." },
        { status: 400 }
      );
    }

    // Check if already used
    if (resetRequest.used) {
      return NextResponse.json(
        { error: "Reset token has already been used." },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: resetRequest.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update password and mark reset as used
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.update({
        where: { id: resetRequest.id },
        data: { used: true },
      }),
      // Clean up old reset requests for this email
      prisma.passwordReset.deleteMany({
        where: {
          email: resetRequest.email,
          id: { not: resetRequest.id },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully.",
    });

  } catch (error) {
    console.error("Reset password error:", error);
    
    if (error instanceof Error && 'issues' in error) {
      // Zod validation error
      return NextResponse.json(
        { error: "Invalid input", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}