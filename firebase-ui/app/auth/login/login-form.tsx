"use client";

import React from "react";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignIn from "@/firebase/auth/sign-in";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type FormType = z.infer<typeof formSchema>;

const LoginForm = (props: Props) => {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    const { error } = await SignIn(data);

    if (error) {
      const errorMessage: string = error.message
        .split("Firebase: Error (auth/")
        .join("")
        .split(")")
        .join("")
        .split("-")
        .join(" ");
      toast.error(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
      return;
    }

    router.push(`/`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-4"
      >
        <h1 className="w-full pb-4 text-center text-3xl font-bold">Login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="johndoe@email.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-4">
          <Button disabled={isLoading} type="submit" className="w-full">
            Login
          </Button>
          <Button disabled={isLoading} variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
