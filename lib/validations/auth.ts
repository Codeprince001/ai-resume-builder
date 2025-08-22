// lib/validations/auth.ts
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export const verifyPinSchema = z.object({
  email: z.string().email(),
  pin: z
    .string()
    .min(6, "PIN must be 6 digits")
    .max(6, "PIN must be 6 digits")
    .regex(/^\d{6}$/, "PIN must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Invalid reset token"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
      .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
      .regex(/^(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type VerifyPinInput = z.infer<typeof verifyPinSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;