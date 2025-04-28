"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast"; // لعرض رسائل تنبيه للمستخدم
import AxiosApp from "@/lib/axios";

export default function ChangePasswordInput({
  email
}:{
  email: string
}) {
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changePassword = async () => {
    setLoading(true);
    try {
      await AxiosApp.post("/auth/change-password", {
        email, 
        ...passwords,
      });

      toast.success("Password changed successfully!");
      setPasswords({ old_password: "", new_password: "" }); // إعادة تعيين الحقول
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xl">Change Password</Label>
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              name="old_password"
              type="password"
              placeholder="********"
              value={passwords.old_password}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              name="new_password"
              type="password"
              placeholder="********"
              value={passwords.new_password}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button 
          variant="link" 
          className="underline" 
          onClick={changePassword}
          disabled={loading}
        >
          {loading ? "Changing..." : "Change"}
        </Button>
      </div>
      <div className="flex items-center mt-2">
        <span>Can&apos;t remember your password? </span>
        {/* <LinkApp href="/auth/forgot-password">
          <Button variant="link" className="underline">
            Reset your password
          </Button>
        </LinkApp> */}
      </div>
    </div>
  );
}
