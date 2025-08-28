'use client';

import { useState, useEffect, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBack, IoShield, IoRefresh, IoTime } from 'react-icons/io5';
import { verifyPinSchema, VerifyPinInput } from "@/lib/validations/auth";

// Loading component for Suspense fallback
function VerifyPinLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-6"></div>
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="flex justify-center space-x-2 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Main component that uses useSearchParams
function VerifyPinForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(120);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyPinInput>({
    resolver: zodResolver(verifyPinSchema),
    defaultValues: { email },
  });

  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Update form value
    setValue("pin", newPin.join(""));
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const numbers = pastedData.replace(/\D/g, "").slice(0, 6);
    
    if (numbers.length === 6) {
      const newPin = numbers.split("");
      setPin(newPin);
      setValue("pin", numbers);
      inputRefs.current[5]?.focus();
    }
  };

  const onSubmit = async (data: VerifyPinInput) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "PIN verification failed");
      }

      // Redirect to reset password with token
      router.push(`/reset-password?token=${result.token}`);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "PIN verification failed. Please try again.");
      } else {
        setError("PIN verification failed. Please try again.");
      }
      // Clear PIN on error
      setPin(["", "", "", "", "", ""]);
      setValue("pin", "");
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to resend code");
      }

      setCanResend(false);
      setResendCountdown(120);
      // Clear current PIN
      setPin(["", "", "", "", "", ""]);
      setValue("pin", "");
      inputRefs.current[0]?.focus();

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to resend code. Please try again.");
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center mb-6">
          <Link
            href="/auth/forgot-password"
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <IoArrowBack size={20} className="mr-2" />
            Back
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoShield className="text-blue-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
          <p className="text-gray-600">
            We sent a 6-digit code to
          </p>
          <p className="text-gray-900 font-medium">{email}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter 6-digit code
            </label>
            <div className="flex justify-center space-x-2">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  disabled={isLoading}
                />
              ))}
            </div>
            {errors.pin && (
              <p className="mt-2 text-sm text-red-600 text-center">{errors.pin.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || pin.some(digit => !digit)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Code</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-500 mb-3">
            <IoTime size={16} />
            <span className="text-sm">
              {resendCountdown > 0 ? (
                `Resend code in ${Math.floor(resendCountdown / 60)}:${(resendCountdown % 60).toString().padStart(2, '0')}`
              ) : (
                "Code expired? Request a new one"
              )}
            </span>
          </div>
          
          <button
            onClick={handleResendCode}
            disabled={!canResend || isLoading}
            className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1 mx-auto"
          >
            <IoRefresh size={16} />
            <span>Resend Code</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Didn&apos;t receive the code? Check your spam folder or{" "}
            <Link 
              href="/forgot-password" 
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline"
            >
              try again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main exported component with Suspense wrapper
export default function VerifyPinPage() {
  return (
    <Suspense fallback={<VerifyPinLoading />}>
      <VerifyPinForm />
    </Suspense>
  );
}