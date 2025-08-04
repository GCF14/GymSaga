'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useLogin';

import SignupForm from './signup-form';

export function LoginForm() {
  const [isSignup, setIsSingup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`, {
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
        style: {
          color: '#ffffff',
          borderColor: '#7f1d1d',
          backgroundColor: '#7f1d1d',
        },
        actionButtonStyle: {
          backgroundColor: '#7f1d1d',
          borderColor: '#ffffff',
          color: '#ffffff',
          borderWidth: '1px',
          borderStyle: 'solid',
        },
      });
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      router.push('/');
    }
  };

  const handleSignupClick = () => {
    setIsSingup(true);
  };

  return isSignup ? (
    <SignupForm />
  ) : (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" disabled={isLoading} type="submit">
                Login
              </Button>
              <Button className="w-full" variant="outline">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <button
                className="underline underline-offset-4"
                onClick={handleSignupClick}
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
