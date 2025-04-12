"use client"

import Link from "next/link"
import { useSignUp, useAuth } from "@clerk/nextjs"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up with your GitHub or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (!isLoaded) return;

            setIsLoading(true);
            setError("");

            try {
              const result = await signUp.create({
                emailAddress: email,
                password,
              });

              if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                window.location.href = "/dashboard";
              } else {
                // Email verification required
                window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
              }
            } catch (err: unknown) {
              const errorMessage = err instanceof Error ? err.message : "Something went wrong";
              setError(errorMessage);
            } finally {
              setIsLoading(false);
            }
          }}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={async () => {
                    if (!isLoaded) return;
                    try {
                      await signUp.authenticateWithRedirect({
                        strategy: "oauth_github",
                        redirectUrl: "/sso-callback",
                        redirectUrlComplete: "/dashboard"
                      });
                    } catch (err) {
                      // Check if this is a single session mode error
                      const errorMessage = err instanceof Error ? err.message : String(err);
                      if (errorMessage.includes("single session mode")) {
                        // Sign out the current user and try again
                        try {
                          await signOut();
                          // After signing out, try to authenticate again
                          await signUp.authenticateWithRedirect({
                            strategy: "oauth_github",
                            redirectUrl: "/sso-callback",
                            redirectUrlComplete: "/dashboard"
                          });
                        } catch (signOutErr) {
                          console.error("Error during sign out:", signOutErr);
                        }
                      } else {
                        console.error(err);
                      }
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={async () => {
                    if (!isLoaded) return;
                    try {
                      await signUp.authenticateWithRedirect({
                        strategy: "oauth_google",
                        redirectUrl: "/sso-callback",
                        redirectUrlComplete: "/dashboard"
                      });
                    } catch (err) {
                      // Check if this is a single session mode error
                      const errorMessage = err instanceof Error ? err.message : String(err);
                      if (errorMessage.includes("single session mode")) {
                        // Sign out the current user and try again
                        try {
                          await signOut();
                          // After signing out, try to authenticate again
                          await signUp.authenticateWithRedirect({
                            strategy: "oauth_google",
                            redirectUrl: "/sso-callback",
                            redirectUrlComplete: "/dashboard"
                          });
                        } catch (signOutErr) {
                          console.error("Error during sign out:", signOutErr);
                        }
                      } else {
                        console.error(err);
                      }
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Clerk CAPTCHA element */}
                <div id="clerk-captcha" className="mt-2"></div>
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Create Account"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  )
}
