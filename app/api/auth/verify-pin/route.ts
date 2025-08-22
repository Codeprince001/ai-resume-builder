// app/api/auth/verify-pin/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyPinSchema } from "@/lib/validations/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = verifyPinSchema.parse(body);
    const { email, pin } = validatedData;

    // Find the reset request
    const resetRequest = await prisma.passwordReset.findFirst({
      where: {
        email,
        pin,
        verified: false,
        used: false,
        expiresAt: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!resetRequest) {
      return NextResponse.json(
        { 
          error: "Invalid or expired PIN. Please request a new reset code.",
          code: "INVALID_PIN" 
        },
        { status: 400 }
      );
    }

    // Mark as verified
    await prisma.passwordReset.update({
      where: { id: resetRequest.id },
      data: { verified: true },
    });

    return NextResponse.json({
      success: true,
      message: "PIN verified successfully.",
      token: resetRequest.token,
    });

  } catch (error) {
    console.error("PIN verification error:", error);
    
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