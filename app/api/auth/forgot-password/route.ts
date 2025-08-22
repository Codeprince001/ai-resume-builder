// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { sendPasswordResetEmail, generatePin, generateResetToken } from "@/lib/email";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);
    const { email } = validatedData;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account with this email exists, you will receive a reset code.",
      });
    }

    // Check for recent reset requests (rate limiting)
    const recentReset = await prisma.passwordReset.findFirst({
      where: {
        email,
        createdAt: {
          gte: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        },
      },
    });

    if (recentReset) {
      return NextResponse.json(
        {
          error: "Please wait 2 minutes before requesting another reset code.",
        },
        { status: 429 }
      );
    }

    // Generate PIN and token
    const pin = generatePin();
    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store reset request
    await prisma.passwordReset.create({
      data: {
        email,
        token,
        pin,
        expiresAt,
      },
    });

    // Send email
    const emailResult = await sendPasswordResetEmail(email, pin, user.name ?? undefined);

    if (!emailResult.success) {
      // Delete the reset request if email fails
      await prisma.passwordReset.deleteMany({
        where: { token },
      });

      return NextResponse.json(
        { error: "Failed to send reset email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reset code sent to your email address.",
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    
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