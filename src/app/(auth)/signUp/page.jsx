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
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data)

    const { email, password, name, role } = data;

    const user = await authClient.signUp.email({
      email,
      password,
      name,
      role,
    });
    if (user) {
      redirect('/')
    }else{
      alert("faild")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-sm text-default-500">
            Join HireLoop and start your journey
          </p>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Name */}
          <TextField isRequired name="name">
            <Label>Full Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

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

          {/* Role Selection */}
          <div className="flex flex-col gap-3">
            <Label>I am a</Label>

            <RadioGroup
              name="role"
              defaultValue="seeker"
              orientation="horizontal"
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>

              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
          >
            <Check />
            Create Account
          </Button>
        </Form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-default-500">
          Already have an account?{" "}
          <Link
            href="/signIn"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;