"use client"

import { useState } from "react";
import Image from "next/image";
import { LoginForm } from "../../components/login-form";
import { SignupForm } from "../../components/signup-form";
import { useTheme } from "next-themes";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { resolvedTheme } = useTheme();

  return (
    <>
      <head>
        <title>GymSaga - Login</title>
        <meta name="description" content="GymSaga Login" />
      </head>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-background">
        <div className="flex items-center">
          <Image
            src={resolvedTheme === "light" ? "/GymSagaDark.svg" : "/GymSagaLight.svg"}
            width={30}
            height={30}
            alt="GymSaga Logo"
            className=""
          />
          <h2 className="text-xl font-bold tracking-tight ml-2">GymSaga</h2>
        </div>
        <div className="m-4">
          {isLogin ? <LoginForm onSwitch={() => setIsLogin(false)} /> : <SignupForm onSwitch={() => setIsLogin(true)} />}
        </div>
        <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our <br /> <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}