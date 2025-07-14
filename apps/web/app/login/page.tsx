import type { Metadata } from "next";
import ClientSignup from "@/components/client-signup";

export const metadata: Metadata = {
  title: "GymSaga Sign Up",
  description: "GymSaga Sign Up Page",
};

export default function Login() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-background">
        <ClientSignup />
      </div>
    </>
  );
}
