"use client";

import Link from "next/link";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { email, password } = data;

    const user = await authClient.signIn.email({
      email,
      password,
    });
    if (user) {
      redirect('/')
    } else {
      alert("faild")
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-default-500">
            Sign in to continue to HireLoop
          </p>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email Address</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters long
            </Description>
            <FieldError />
          </TextField>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
          >
            <Check />
            Sign In
          </Button>
        </Form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-default-500">
          Don't have an account?{" "}
          <Link
            href={"/signUp"}
            className="font-medium text-primary hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;