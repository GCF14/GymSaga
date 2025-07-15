'use client';

import { useEffect, useState } from 'react';

import { AnimatedIconBeam } from './animated-icon-beam';

import DeleteAccountButton from '@/components/delete-account-button';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface SettingsCardProps {
  className?: string;
}

export default function SettingsCard({ className }: SettingsCardProps) {
  const [username, setUsername] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
    const storedFirstName = localStorage.getItem('firstName');
    setFirstName(storedFirstName);
    const storedLastName = localStorage.getItem('lastName');
    setLastName(storedLastName);
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail);
  }, []);

  return (
    <BlurFade className="col-span-3" direction="left">
      <Card className={`h-[calc(100vh-8rem)] overflow-auto ${className}`}>
        <CardHeader>
          <CardTitle className="text-3xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8 w-full">
            <CardTitle className="mb-2 text-2xl" id="account">
              Account
            </CardTitle>
            <Separator />
            <div className="flex flex-col">
              <h3 className="my-4 ml-4 scroll-m-20 text-xl font-semibold tracking-tight">
                Account Details
              </h3>
              <div className="ml-8 flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                  <span className="w-24 text-right">Email</span>
                  <Input disabled className="w-96" placeholder={email ?? ''} type="username" />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="w-24 text-right">Username</span>
                  <Input disabled className="w-96" placeholder={username ?? ''} type="username" />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="w-24 text-right">First Name</span>
                  <Input
                    disabled
                    className="w-96"
                    placeholder={firstName ?? ''}
                    type="first name"
                  />
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="w-24 text-right">Last Name</span>
                  <Input disabled className="w-96" placeholder={lastName ?? ''} type="last name" />
                </div>
              </div>
              <Button className="mt-4 ml-auto w-20" onClick={() => alert('Not implemented')}>
                Edit
              </Button>
            </div>
            <h3 className="my-4 ml-4 scroll-m-20 text-xl font-semibold tracking-tight text-red-800">
              Danger Zone
            </h3>
            <div className="flex justify-center">
              <DeleteAccountButton />
            </div>
          </div>
          <div className="mb-8">
            <CardTitle className="mb-2 text-2xl" id="credits">
              Credits
            </CardTitle>
            <Separator />
            <p className="m-4">Made with ❤️ by the GymSaga Team</p>
            <AnimatedIconBeam />
          </div>
        </CardContent>
      </Card>
    </BlurFade>
  );
}
