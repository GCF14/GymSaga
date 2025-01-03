import Image from "next/image";
import { LoginForm } from "../components/ui/LoginForm";

export default function Home() {
  return (
    <div className="w-screen h-screen items-center flex flex-col bg-background p-8">
      <Image
      className="mb-10"
        src="/GymSaga.svg"
        width={200}
        height={200}
        alt="GymSaga Logo"/>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">Welcome to GymSaga</h1>
      <LoginForm />
    </div>
  );
}