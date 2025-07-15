import { History, Bookmark, TrendingUp, Hash, CirclePlus } from 'lucide-react';

export const routes = {
  HOME: '/',
  MAP: '/map',
  SOCIAL_LINK: '/social-link',
  LOGIN: '/login',
  FEED: '/feed',
  HISTORY: '/history',
  TAGS: '/tags',
  TRENDING: '/trending',
  BOOKMARKS: '/bookmarks',
  SETTINGS: '/settings',
} as const;

export const sidebarRoutes = [
  {
    title: 'Feed',
    url: routes.FEED,
    icon: CirclePlus,
  },
  {
    title: 'Trending',
    url: routes.TRENDING,
    icon: TrendingUp,
  },
  {
    title: 'Tags',
    url: routes.TAGS,
    icon: Hash,
  },
  {
    title: 'History',
    url: routes.HISTORY,
    icon: History,
  },
  {
    title: 'Bookmarks',
    url: routes.BOOKMARKS,
    icon: Bookmark,
  },
] as const;

export const navbarRoutes = [
  {
    title: 'Home',
    link: routes.HOME,
  },
  {
    title: 'Map',
    link: routes.MAP,
  },
  {
    title: 'Social Link',
    link: routes.SOCIAL_LINK,
  },
] as const;

export const routeBuilders = {
  PROFILE: (username: string) => `/${username}`,
} as const;
