"use client";

import { useEffect } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs";

export default function SSOCallback() {
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();

  useEffect(() => {
    // Handle the redirect flow
    const handleRedirect = async () => {
      if (!isSignInLoaded || !isSignUpLoaded) return;

      const params = new URLSearchParams(window.location.search);
      
      try {
        // Try sign in first
        const signInAttempt = await signIn.attemptFirstFactor({
          strategy: "oauth_callback",
          redirectUrl: window.location.href,
        });
        
        if (signInAttempt.status === "complete") {
          await setSignInActive({ session: signInAttempt.createdSessionId });
          window.location.href = "/";
          return;
        }
      } catch (error) {
        // If sign in fails, try sign up
        try {
          const signUpAttempt = await signUp.attemptFirstFactor({
            strategy: "oauth_callback",
            redirectUrl: window.location.href,
          });
          
          if (signUpAttempt.status === "complete") {
            await setSignUpActive({ session: signUpAttempt.createdSessionId });
            window.location.href = "/";
            return;
          }
        } catch (error) {
          console.error("Error during OAuth callback:", error);
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
