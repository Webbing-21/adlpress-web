"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axiosClient from "@/lib/axiosClient";
import ChangePasswordInput from "@/components/account/ChangePasswordInput";
import ChangeDataProfile from "@/components/account/ChangeDataProfile";

export default function ProfileSettings() {
  const [image, setImage] = useState<string>("/icons/settings/user.jpeg");
  const [profile, setProfile] = useState<{
    username: string
    email: string
    phone: string
    created_at: string
    address: string
    role: string
    status: string
  }|null>(null)

  const [disabled, setDisabled] = useState<{
    username: boolean
    email: boolean
    phone: boolean
    address: boolean
  }>({
    username: true,
    email: true,
    phone: true,
    address: true,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const getProfile = async () => {
    const api = await axiosClient()
    const res = await api.get("/customer/profile")
    setProfile(res?.data?.user)
  }

  useEffect(() => {
    getProfile()
  }, [])

  const changeData = async (data: any) => {
    const api = await axiosClient()
    await api.put("/customer/profile", {
      ...data
    })
  }

  return (
    <div className="min-h-screen text-gray-700 p-6 max-w-2xl space-y-8">
      {
        profile ? <>
          <div className="flex items-center gap-4">
            <Avatar className="size-20 bg-center bg-contain">
              <AvatarImage src={image} alt="Profile picture" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div>
              <Input
                disabled
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <Label
                htmlFor="image-upload"
                className="bg-primary px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-500 transition-colors"
              >
                Change image
              </Label>
            </div>
          </div>
          <div className="space-y-6">
            <ChangeDataProfile label="Full Name" data={profile.username} keyData="username"/>
            <ChangeDataProfile label="Email" data={profile.email} keyData="email"/>
            <ChangeDataProfile label="Phone" data={profile.phone} keyData="phone"/>
            <ChangePasswordInput email={profile?.email}/>
            <ChangeDataProfile label="Address" data={profile.address} keyData="address"/>


            <div className="space-y-4 pt-6">
              <h2 className="text-xl">Delete Account</h2>
              <p className="text-gray-400">
                Deleting your account is permanent and cannot be undone. This means
                all your data, including [list specific data points, e.g., messages,
                posts, purchase history], will be removed from our system.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Delete account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </> :
        <>loading ..</>
      }
    </div>
  );
}
