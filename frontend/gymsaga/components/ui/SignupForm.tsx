"use client"

import { Link } from "react-aria-components"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/field"
import { Input, TextField } from "@/components/ui/textfield"

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

interface SignupFormProps {
onSwitch: () => void;
}

export function SignupForm({ onSwitch }: SignupFormProps) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField className="grid gap-2">
              <Label>First name</Label>
              <Input id="first-name" placeholder="Matthew" required />
            </TextField>
            <TextField className="grid gap-2">
              <Label>Last name</Label>
              <Input id="last-name" placeholder="Lee" required />
            </TextField>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button onClick={onSwitch} className="underline">
            Sign in
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
