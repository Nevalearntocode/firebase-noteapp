"use client";

import React from "react";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignInWithGoogle, signIn, signUp } from "@/firebase/auth";

type Props = {};

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  password2: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type FormType = z.infer<typeof formSchema>;

const RegisterForm = (props: Props) => {
  const router = useRouter();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    const { error } = await signUp(data);

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

    toast.success("Sign up successful");

    await signIn(data);

    router.push(`/`);
  };

  const googleSignIn = async () => {
    await SignInWithGoogle();
    router.push(`/`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-4"
      >
        <h1 className="w-full pb-4 text-center text-3xl font-bold">Sign Up</h1>
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
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-4">
          <Button disabled={isLoading} type="submit" className="w-full">
            Sign Up
          </Button>
          <Button disabled={isLoading} variant="outline" className="w-full" onClick={(e) => {
            e.preventDefault()
            googleSignIn()
          }}>
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
