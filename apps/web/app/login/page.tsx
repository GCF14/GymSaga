import type { Metadata } from 'next';

import ClientSignup from '@/components/client-signup';

export const metadata: Metadata = {
  title: 'GymSaga Sign Up',
  description: 'GymSaga Sign Up Page',
};

export default function Login() {
  return (
    <>
      <div className="bg-background flex h-screen w-full flex-col items-center justify-center">
        <ClientSignup />
      </div>
    </>
  );
}
