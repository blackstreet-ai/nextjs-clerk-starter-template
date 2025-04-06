"use client";

import { useEffect, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const { isLoaded, signUp } = useSignUp();

  useEffect(() => {
    // Get email from URL query parameter
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleResendVerification = async () => {
    if (!isLoaded || !email) return;

    setIsLoading(true);
    setError("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationSent(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isLoaded || !verificationCode) return;

    setVerifying(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        // User is logged in and verification is complete
        window.location.href = "/dashboard";
      } else {
        // Verification may not be complete yet
        setError("Verification is incomplete. Please try again.");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed. Please check your code and try again.";
      setError(errorMessage);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 9 6 9-6" />
              <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
            </svg>
          </div>
          Acme Inc.
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a verification code to{" "}
              <span className="font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <p className="text-sm text-center">
                  Enter the verification code from your email to complete the sign-up process.
                </p>
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                {verificationSent && (
                  <p className="text-sm text-green-500 text-center">
                    Verification code resent successfully!
                  </p>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleVerifyCode}
                  disabled={verifying || !verificationCode}
                >
                  {verifying ? "Verifying..." : "Verify Email"}
                </Button>
                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-sm"
                    onClick={handleResendVerification}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Resend verification code"}
                  </Button>
                </div>
              </div>
              <div className="text-center text-sm">
                <Link href="/login" className="underline underline-offset-4">
                  Back to sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
          and <Link href="#">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  );
}
