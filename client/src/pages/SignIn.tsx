import type { FC } from "react";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import * as z from "zod";

import Button from "@/components/Button";
import InputCheckbox from "@/components/InputCheckox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { AUTH_LOGIN } from "@/store/statics";
import axiosInstance from "@/utils/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

type Inputs = {
  email: string;
  password: string;
};

const SignIn: FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await axiosInstance.post(AUTH_LOGIN, {
        email: data.email.trim(),
        password: data.password.trim(),
      });

      if (response.status === 200) {
        setUser(response.data);
        // Store the token and use it for subsequent authenticated requests
        console.log("Login successful:", response);
        redirect("/");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Email Or Password Is Invalid!", {
        toastId: 1,
        updateId: 1,
      });
    }
  };
  return (
    <>
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-120px)] lg:py-0">
        <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 animate animate-jump-in animate-duration-1000 animate-delay-300">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="text-gray-500 text-sm">
              <b>Demo: </b>user@example.com | password123
            </div>
            <form
              className="space-y-1 md:space-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  title="Email"
                  {...register("email")}
                  name="email"
                  required
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  title="Password"
                  {...register("password")}
                  name="password"
                  type="password"
                  required
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <InputCheckbox
                  title={"Remember me"}
                  name="remember"
                  register={register}
                  options={{ errors }}
                />
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-400"
                >
                  Forgot password?
                </a>
              </div>
              <div className="text-center">
                <div className="mt-5" />
                <Button
                  title={"Sign in"}
                  classExtend="bg-emerald-500 dark:bg-white text-emerald-500 dark:text-emerald-500"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
