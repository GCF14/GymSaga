'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navbarRoutes, routeBuilders } from '@/constants/routes';

export default function NavbarMenu() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navbarRoutes.map((route) => (
          <NavigationMenuItem key={route.title}>
            <Link legacyBehavior passHref href={route.link}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {route.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <Link
            legacyBehavior
            passHref
            href={username ? routeBuilders.PROFILE(username) : '#'}
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
