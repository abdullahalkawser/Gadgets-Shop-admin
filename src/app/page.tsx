"use client";
import { useUser, SignIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter to handle redirection
import { useEffect } from "react";
import New from "./sign/[[...sign-up]]/page";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the admin dashboard if the user is signed in
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-screen p-8 pb-20 flex justify-center items-center flex-col">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center py-4">
        <div className="text-xl font-bold">Your Logo</div>
        <div className="flex gap-4">
          {!isSignedIn ? (
            // Show the sign-in form if the user is not signed in
            <New />
          ) : (
            <>
              <span>Welcome, {user.username}</span>
              <UserButton />
              <SignedOut />
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-3xl">Welcome to Next.js with Clerk</h1>
        <p>Sign in to access the admin dashboard!</p>
      </main>
    </div>
  );
}
