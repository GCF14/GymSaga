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
      <div className="w-screen h-screen items-center flex flex-col bg-background">
        <Image
          src={resolvedTheme === "light" ? "/GymSagaDark.svg" : "/GymSagaLight.svg"}
          width={150}
          height={150}
          alt="GymSaga Logo"
          className="mt-8"/>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl m-4">Welcome to GymSaga</h1>
        <div className="m-4">
          {isLogin ? <LoginForm onSwitch={() => setIsLogin(false)} /> : <SignupForm onSwitch={() => setIsLogin(true)}/>}
        </div>
      </div>
    </>
  );
}