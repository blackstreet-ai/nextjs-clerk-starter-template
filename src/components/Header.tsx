"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";

export default function Header() {
  const { userId } = useAuth();
  const isSignedIn = !!userId;

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div>
        <Link href="/" className="text-xl font-bold">
          Next.js + Clerk
        </Link>
      </div>
      <nav className="flex gap-4 items-center">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <div className="flex items-center gap-2">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </nav>
    </header>
  );
}
