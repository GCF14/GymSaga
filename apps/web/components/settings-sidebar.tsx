'use client';

import { BlurFade } from '@/components/magicui/blur-fade';
import { BoxReveal } from '@/components/magicui/box-reveal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SettingsSidebarProps {
  className?: string;
}

export default function SettingsSidebar({ className }: SettingsSidebarProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BlurFade direction="up">
      <Card className={`h-[calc(100vh-8rem)] ${className}`}>
        <CardHeader>
          <BoxReveal boxColor="hsl(var(--primary))" duration={0.5}>
            <CardTitle className="text-3xl">Settings</CardTitle>
          </BoxReveal>
          <BoxReveal boxColor="hsl(var(--primary))" duration={0.5}>
            <CardDescription>Manage your preferences here!</CardDescription>
          </BoxReveal>
          <CardContent className="w-full p-0 pt-4">
            <div className="flex flex-col gap-2">
              <Button
                className="w-full justify-start"
                variant="ghost"
                onClick={() => scrollToSection('account')}
              >
                <span className="material-symbols-rounded">person</span>
                Account
              </Button>
              <Button
                className="w-full justify-start"
                variant="ghost"
                onClick={() => scrollToSection('credits')}
              >
                <span className="material-symbols-rounded">info</span>
                About
              </Button>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </BlurFade>
  );
}
