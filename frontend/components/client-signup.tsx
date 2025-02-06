"use client"

import Image from "next/image";
import SignupForm from "./signup-form";

export default function ClientSignup() {

  return (
    <>
          <div className="flex items-center">
            <Image
              src="/GymSagaDark.svg"
              width={30}
              height={30}
              alt="GymSaga Logo Dark"
              className="block dark:hidden"
            />
            <Image
                src="/GymSagaLight.svg"
                width={30}
                height={30}
                alt="GymSaga Logo Light"
                className="hidden dark:block"
              />
            <h2 className="text-xl font-bold tracking-tight ml-2">GymSaga</h2>
          </div>
          <div className="m-4">
            <SignupForm/>
          </div>
          <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our <br /> <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
    </>
  );
}