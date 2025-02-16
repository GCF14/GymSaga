"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import SignupForm from "./signup-form"
import { useLogin } from "@/hooks/useLogin"
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { toast } from "sonner"

export function LoginForm() {
  const [isSignup, setIsSingup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin()
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error("Error: " + error, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
        style: {
          color: "#ffffff",
          borderColor: "#7f1d1d",
          backgroundColor: "#7f1d1d",
        },
        actionButtonStyle: {
          backgroundColor: "#7f1d1d",
          borderColor: "#ffffff",
          color: "#ffffff",
          borderWidth: "1px",
          borderStyle: "solid", 
        }
      });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const success = await login(email, password);

    if (success) { 
      router.push("/");
    }

  }

  const handleSignupClick = () => {
    setIsSingup(true);
  };

  return (
    isSignup ? <SignupForm /> :
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required 
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>Login</Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <button className="underline underline-offset-4" onClick={handleSignupClick}>
                    Sign up
                </button>
            </div>              
          </form>
        </CardContent>
      </Card>
    </div>
  )
}