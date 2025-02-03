"use client"

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
import { LoginForm } from "./login-form"

export default function SignupForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const[userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
    console.log("Username: ", userName);
    console.log("Email: ", email);
    console.log("Password: ", password);

  }

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  return (
    isLogin ? <LoginForm /> :
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
          Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Label htmlFor="first-name">First name</Label>
                <Label htmlFor="last-name">Last name</Label>
                <Input 
                  id="first-name" 
                  type="text" 
                  placeholder="Matthew" 
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required />
                <Input id="last-name" 
                  type="text" 
                  placeholder="Smith" 
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="MatthewSmith05"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  required
                />
              </div>
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
                </div>
                <Input id="password" 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required 
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button className="underline underline-offset-4" onClick={handleLoginClick}>
                    Log in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
