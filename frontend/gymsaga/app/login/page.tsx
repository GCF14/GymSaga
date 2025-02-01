import Image from "next/image";
import { LoginForm } from "../../components/login-form";
import SignupForm from "../../components/signup-form";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "GymSaga Sign Up",
  description: "GymSaga Sign Up Page",
}

export default function Login() {

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-background">
        <div className="flex items-center">
          <Image
            src="/GymSagaDark.svg"
            width={30}
            height={30}
            alt="GymSaga Logo"
            className=""
          />
          <h2 className="text-xl font-bold tracking-tight ml-2">GymSaga</h2>
        </div>
        <div className="m-4">
          <SignupForm />
        </div>
        <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our <br /> <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}