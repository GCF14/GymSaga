'use client';

import SignupForm from './signup-form';

import GymSagaSquareSmall from '@/public/GymSagaSquareSmall';

export default function ClientSignup() {
  return (
    <>
      <div className="flex items-center">
        <GymSagaSquareSmall />
        <h2 className="ml-2 text-xl font-extrabold tracking-tight">GymSaga</h2>
      </div>
      <div className="m-4">
        <SignupForm />
      </div>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <br /> <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
}
