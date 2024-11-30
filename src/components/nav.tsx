"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

export function Nav() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-4 left-8 right-8 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            MindMap AI
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="/team"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Team
            </Link>
          </div>
          {isSignedIn ? (
            <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-gray-200">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10", // Increased size from default
                  },
                }}
              />
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Dashboard →
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Button
                onClick={() => router.push("/auth/sign-in")}
                variant="outline"
                className="text-gray-900 border-gray-900 hover:bg-gray-100"
              >
                Sign In
              </Button>
              <Button
                onClick={() => router.push("/auth/sign-up")}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
