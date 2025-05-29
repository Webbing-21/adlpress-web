"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginDialog({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!phone || !password) {
      setError("Phone number and password are required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signIn("login", {
        redirect: false,
        login: phone, // Match the backend's expected 'identifier' format
        password,
        // callbackUrl: "/", // Specify the redirect URL after successful login
      });

      if (result?.error) {
        // Parse error message for user-friendly display
        try {
          const errorData = JSON.parse(result.error);
          setError(errorData.message || "Invalid phone number or password");
        } catch {
          setError(result.error || "An unexpected error occurred");
        }
      } else if (result?.url) {
        // Navigate to the callback URL (e.g., "/")
        router.push(result.url);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="px-6 py-12 flex flex-col items-center">
      <DialogHeader className="mb-8 text-center">
        <DialogTitle className="text-3xl font-bold">Welcome back!</DialogTitle>
      </DialogHeader>
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone-login" className="text-xl font-medium">
            Phone number
          </Label>
          <div className="flex">
            {/* <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted/50 text-blue-600 font-medium">
              +20
            </div> */}
            <Input
              id="phone-login"
              placeholder="email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Allow only digits
              className="rounded-l-none h-14 text-lg text-gray-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password-login" className="text-xl font-medium">
            Password
          </Label>
          <Input
            id="password-login"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 text-lg text-gray-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full py-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg"
        >
          {loading ? "Logging in..." : "Log in"}
        </Button>
        <div className="text-center pt-4">
          <p className="text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 font-medium"
            >
              Create account
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}