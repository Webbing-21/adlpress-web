"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type AuthDialogProps = {
  trigger?: React.ReactNode;
  defaultOpen?: boolean;
};

export function AuthDialogs({ trigger, defaultOpen = false }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [dialogType, setDialogType] = useState<"login" | "signup">("login");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const switchToLogin = () => {
    setDialogType("login");
  };

  const switchToSignup = () => {
    setDialogType("signup");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger || <Button>Sign in</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 max-h-[90vh] z-[83889383] overflow-y-scroll no-scrollbar gap-0 border rounded-lg">
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close dialog"
          className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-6 w-6" />
        </button>
        {dialogType === "login" ? (
          <LoginDialog onSwitchToSignup={switchToSignup} />
        ) : (
          <SignupDialog onSwitchToLogin={switchToLogin} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoginDialog({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      setError("Phone number is required");
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
        phone: `+20${phone}`,
        password
      });
      if (result?.error) {
        setError(result.error);
      } else {
        // window.location.href = "/";
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
       <div className="flex gap-4">
        <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full py-6 border rounded-md flex items-center justify-center gap-2"
          >
            <GoogleIcon />
            <span>With Google</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
            className="w-full py-6 border rounded-md flex items-center justify-center gap-2"
          >
            <FacebookIcon />
            <span>With Facebook</span>
          </Button>
       </div>
        <div className="space-y-2">
          <Label htmlFor="phone-login" className="text-xl font-medium">
            Phone number
          </Label>
          <div className="flex">
            <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted/50 text-blue-600 font-medium">
              +20
            </div>
            <Input
              id="phone-login"
              placeholder="121212121"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-l-none h-14 text-lg text-gray-500"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password-signup" className="text-xl font-medium">
            Password
          </Label>
          <Input
            id="password-signup"
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
            <button type="button" onClick={onSwitchToSignup} className="text-blue-600 font-medium">
              Create account
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}

function SignupDialog({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password || !phone ) {
      setError("All fields are required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!/^\d{9}$/.test(phone)) {
      setError("Please enter a valid 9-digit phone number");
      return;
    }
    if (!termsAccepted) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("register", {
        redirect: false,
        name,
        password,
        phone: `+20${phone}`,
      });
      if (result?.error) {
        setError(result.error);
      } else {
        // window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="px-6 py-0 flex flex-col items-center">
      <DialogHeader className="mb-8 text-center pt-5">
        <DialogTitle className="text-3xl font-bold">Create account</DialogTitle>
      </DialogHeader>
      <div className="w-full space-y-4 pb-4">
      <div className="flex gap-4">
        <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full py-6 border rounded-md flex items-center justify-center gap-2"
          >
            <GoogleIcon />
            <span>With Google</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
            className="w-full py-6 border rounded-md flex items-center justify-center gap-2"
          >
            <FacebookIcon />
            <span>With Facebook</span>
          </Button>
       </div>
        <div className="space-y-2">
          <Label htmlFor="name-signup" className="text-xl font-medium">
            Name
          </Label>
          <Input
            id="name-signup"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-14 text-lg text-gray-500"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password-signup" className="text-xl font-medium">
            Password
          </Label>
          <Input
            id="password-signup"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 text-lg text-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone-signup" className="text-xl font-medium">
            Phone number
          </Label>
          <div className="flex">
            <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted/50 text-blue-600 font-medium">
              +20
            </div>
            <Input
              id="phone-signup"
              placeholder="121212121"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-l-none h-14 text-lg text-gray-500"
            />
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </Label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={loading || !termsAccepted}
          className="w-full py-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-lg"
        >
          {loading ? "Creating account..." : "Create account"}
        </Button>
        <div className="text-center pt-4">
          <p className="text-gray-500">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-blue-600 font-medium">
              Log in
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#FFC107"
      />
      <path
        d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
        fill="#FF3D00"
      />
      <path
        d="M12 22C14.583 22 16.93 21

.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
        fill="#4CAF50"
      />
      <path
        d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#1976D2"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" />
    </svg>
  );
}