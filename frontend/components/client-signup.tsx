"use client";

import SignupForm from "./signup-form";
import GymSagaSquareSmall from "@/public/GymSagaSquareSmall";

export default function ClientSignup() {
  return (
    <>
      <div className="flex items-center">
        <GymSagaSquareSmall />
        <h2 className="text-xl font-extrabold tracking-tight ml-2">GymSaga</h2>
      </div>
      <div className="m-4">
        <SignupForm />
      </div>
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <br />{" "}
        <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
}
