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
      <div className="w-full h-full justify-center items-center flex flex-col bg-background mt-10">
        <div className="flex flex-row justify-center items-center">
          <div className="flex items-center">
            <Image
              src={resolvedTheme === "light" ? "/GymSagaSquareDark.svg" : "/GymSagaSquareLight.svg"}
              width={25}
              height={25}
              alt="GymSaga Logo"
              className=""/>
            <h2 className="text-xl font-bold tracking-tight ml-2">GymSaga</h2>
          </div>
        </div>
        <div className="m-4">
          {isLogin ? <LoginForm onSwitch={() => setIsLogin(false)} /> : <SignupForm onSwitch={() => setIsLogin(true)}/>}
        </div>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our <br></br> <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}