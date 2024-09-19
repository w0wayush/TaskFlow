"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome to TaskFlow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex  justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* // TODO:  */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              onClick={() => signIn("google")}
              variant="outline"
              className="w-full"
            >
              <FaGoogle className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              onClick={() => signIn("github")}
              variant="outline"
              className="w-full"
            >
              <FaGithub className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New here?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Create an account
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
