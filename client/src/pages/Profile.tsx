import React, { useEffect, useState } from "react";
import { Camera, Pencil } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { TUser } from "@/store/authStore";
import { useAuthStore } from "@/store/authStore";
import withAuthentication from "@/utils/withAuthentication";
import { zodResolver } from "@hookform/resolvers/zod";

import profile from "/profile.png";

const schema = z.object({
  displayName: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  bio: z.string().optional(),
});

const Profile: FC = () => {
  const user = useAuthStore((state) => state.user);
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || "/1.png");
  const [didCancel, setDidCancel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<TUser, "uid" | "photoURL">>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (
    event: React.FormEvent,
    data: Omit<TUser, "uid" | "photoURL">
  ) => {
    event.preventDefault();
    setDidCancel(false);
    console.log(data);
    setIsEditing(!isEditing);
    // try {
    //   // Simulate an async API call
    //   const response = await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       if (!didCancel) {
    //         resolve("Success");
    //       } else {
    //         reject("Cancelled");
    //       }
    //     }, 2000);
    //   });

    //   if (!didCancel) {
    //     console.log(response);
    //     // Handle successful response
    //   }
    // } catch (error) {
    //   if (error === "Cancelled") {
    //     console.log("Request was cancelled");
    //   } else {
    //     console.error("Error:", error);
    //   }
    // }
  };

  useEffect(() => {
    return () => {
      setDidCancel(true);
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Card className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex md:flex-row items-center justify-start gap-2 relative w-full">
          <div className="">
            <button
              className="p-2 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil
                size={16}
                strokeWidth={1.25}
                className="dark:text-white"
              />
            </button>
          </div>
          <div className="w-full md:w-2/3">
            <h4 className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
              <span className="">User Profile</span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-sky-400 dark:bg-white opacity-25"></span>
            </h4>
          </div>
        </div>

        <div className=" h-32 overflow-hidden">
          <img className="w-full" src={profile} alt="" />
        </div>
        <div className="profile-header flex justify-center">
          <div className="w-32 h-32 px-5b -mt-12 relative group">
            <Avatar className="w-32 h-32  animate animate-jump-in animate-duration-1000 animate-delay-300">
              <AvatarImage src={avatarUrl} alt="Avatar" className="avatar" />
              <AvatarFallback>{user?.displayName}</AvatarFallback>
            </Avatar>
            <div className="rounded-full absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300">
              <div className="cursor-pointer flex items-center justify-center h-full w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
                <Camera size={20} strokeWidth={1.5} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-body">
          {isEditing ? (
            <form
              onSubmit={(e) => handleSubmit((data) => onSubmit(e, data))()}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  title="Name"
                  {...register("displayName")}
                  name="displayName"
                  defaultValue={user?.displayName}
                  required
                />
                {errors.displayName && (
                  <span className="text-red-500">
                    {errors.displayName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  title="Email"
                  {...register("email")}
                  name="email"
                  defaultValue={user?.email}
                  required
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  title="Bio"
                  {...register("bio")}
                  name="bio"
                  defaultValue={user?.bio}
                />
                {errors.bio && (
                  <span className="text-red-500">{errors.bio.message}</span>
                )}
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          ) : (
            <div className="space-y-4 animate animate-fade-down animate-duration-1000 animate-delay-300">
              <div className="text-center px-4">
                <h2 className="text-gray-800 dark:text-white text-3xl font-bold">
                  {user?.displayName}
                </h2>
                {user?.email}
                <p className="mt-2 text-gray-500 text-sm">{user?.bio}</p>
              </div>
              <hr className="mt-6" />
              <div className="flex bg-gray-50 dark:bg-white  dark:text-gray-800">
                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                  <p>
                    <span className="font-semibold">2.5 k </span> Followers
                  </p>
                </div>
                <div className="border"></div>
                <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                  <p>
                    <span className="font-semibold">2.0 k </span> Following
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default withAuthentication(Profile);
