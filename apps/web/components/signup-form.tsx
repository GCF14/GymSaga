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
import { useSignup } from '@/hooks/useSignup';

import { LoginForm } from './login-form';

export default function SignupForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
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
    const success = await signup(
      email,
      password,
      userName,
      firstName,
      lastName,
    );

    if (success) {
      router.push('/');
    }
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  return isLogin ? (
    <LoginForm />
  ) : (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl 2xl:text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 2xl:gap-4">
              <div className="grid grid-cols-2 gap-1">
                <Label htmlFor="first-name">First name</Label>
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  required
                  id="first-name"
                  placeholder="Matthew"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  required
                  id="last-name"
                  placeholder="Smith"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  required
                  id="username"
                  placeholder="MatthewSmith05"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
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
                Sign Up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <button
                className="underline underline-offset-4"
                onClick={handleLoginClick}
              >
                Log in
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
