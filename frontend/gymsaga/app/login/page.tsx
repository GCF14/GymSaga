"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { LoginForm } from "../../components/ui/LoginForm";
import { SignupForm } from "../../components/ui/SignupForm";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    console.log("Current theme:", resolvedTheme);
  }, [resolvedTheme]);

  return (
    <div className="w-screen h-screen items-center flex flex-col bg-background p-8">
      <Image
        src={resolvedTheme === "light" ? "/GymSagaDark.svg" : "/GymSagaLight.svg"}
        width={150}
        height={150}
        alt="GymSaga Logo"/>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl m-8">Welcome to GymSaga</h1>
      {isLogin ? <LoginForm onSwitch={() => setIsLogin(false)} /> : <SignupForm onSwitch={() => setIsLogin(true)}/>}
    </div>
  );
}