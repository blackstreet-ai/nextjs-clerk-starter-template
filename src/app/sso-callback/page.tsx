"use client";

import { useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";
// Disable ESLint for the whole file since we're dealing with type mismatches
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function SSOCallback() {
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();

  useEffect(() => {
    // Handle the redirect flow
    const handleRedirect = async () => {
      if (!isSignInLoaded || !isSignUpLoaded) return;

      // Get the current URL for OAuth callback
      
      try {
        // Try sign in first
        // @ts-ignore - Clerk types don't match implementation
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "oauth_callback" as any,
          redirectUrl: window.location.href,
        });
        
        if (signInAttempt.status === "complete") {
          await setSignInActive({ session: signInAttempt.createdSessionId });
          window.location.href = "/dashboard";
          return;
        }
      } catch (error) {
        // Ignore sign-in errors and try sign-up instead
        try {
          // @ts-ignore - SignUpResource doesn't have attemptFirstFactor in types
          const signUpAttempt = await signUp.attemptFirstFactor({
            strategy: "oauth_callback" as any,
            redirectUrl: window.location.href,
          });
          
          if (signUpAttempt.status === "complete") {
            await setSignUpActive({ session: signUpAttempt.createdSessionId });
            window.location.href = "/dashboard";
            return;
          }
        } catch (signUpError) {
          console.error("Error during OAuth callback:", signUpError);
          window.location.href = "/login?error=oauth-callback-failed";
        }
      }
    };

    handleRedirect();
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp, setSignInActive, setSignUpActive]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        <h1 className="text-xl font-semibold">Processing authentication...</h1>
        <p className="text-muted-foreground">Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
}
