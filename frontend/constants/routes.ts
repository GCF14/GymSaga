export const routes = {
  HOME: "/",
  MAP: "/map",
  SOCIAL_LINK: "/social-link",
  LOGIN: "/login",
  FEED: "/feed",
  HISTORY: "/history",
  TAGS: "/tags",
  TRENDING: "/trending",
  BOOKMARKS: "/bookmarks",
  SETTINGS: "/settings",
} as const;

export const routeBuilders = {
  PROFILE: (username: string) => `/${username}`,
} as const;
