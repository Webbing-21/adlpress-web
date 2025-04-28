"use client";

import { use, useState } from "react";
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
import LinkApp from "@/components/global/LinkApp";

export default function ProfileSettings({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = use(params);

  const [image, setImage] = useState<string>("/icons/settings/user.jpeg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div className="min-h-screen text-gray-700 p-6 max-w-2xl space-y-8">
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
            className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Change image
          </Label>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full-name" className="text-xl">
            Full Name
          </Label>
          <div className="flex gap-4">
            <Input disabled id="full-name" defaultValue="Moh" />
            <LinkApp href="/account/settings/edit" >
              <Button variant="link" className="underline">
                Change
              </Button>
            </LinkApp>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xl">
            Email
          </Label>
          <div className="flex gap-4">
            <Input
              disabled
              id="email"
              type="email"
              defaultValue="Mohamed@gmail"
            />
            <LinkApp href="/account/settings/edit" >
              <Button variant="link" className="underline">
                Change
              </Button>
            </LinkApp>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xl">Password</Label>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  disabled
                  id="current-password"
                  type="password"
                  placeholder="********"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  disabled
                  id="new-password"
                  type="password"
                  placeholder="********"
                />
              </div>
            </div>
            <LinkApp href="/account/settings/edit" >
              <Button variant="link" className="underline">
                Change
              </Button>
            </LinkApp>
          </div>
          <div className="flex items-center mt-2">
            <span>Cant remember your password? </span>
            <LinkApp href="/auth/forgot-password" >
              <Button variant="link" className="underline">
                Reset your password
              </Button>
            </LinkApp>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-xl">
            Address
          </Label>
          <div className="flex gap-4">
            <Input
              disabled
              id="address"
              defaultValue="Nasr City Floor 3 apart"
            />
            <Button variant="link" className="underline">
              Change
            </Button>
          </div>
        </div>

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
    </div>
  );
}
