import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WorkoutsContextProvider } from '@/context/WorkoutsContext'
import { PostsContextProvider } from "@/context/PostsContext"
import { AuthContextProvider } from '@/context/AuthContext'
import { Toaster } from "@/components/ui/sonner"
import GymSagaDark from "@/public/GymSagaDark.svg"
import GymSagaLight from "@/public/GymSagaLight.svg"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GymSaga",
  description: "GymSaga",
  icons: [
    { 
        media: "(prefers-color-scheme: light)", 
        url: GymSagaDark.src,
        type: "image/svg+xml", 
    },
    { 
        media: "(prefers-color-scheme: dark)", 
        url: GymSagaLight.src,
        type: "image/svg+xml",
    },
],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.tsx" sizes="any" />
        <link rel="preload" href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" as="style"/>
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" as="style"/>
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"/>
        <style>
          {`
            .material-symbols-rounded {
              font-variation-settings:
              'FILL' 0,
              'wght' 300,
              'GRAD' 0,
              'opsz' 24;
              font-size: 20px;
            }
            .material-symbols-rounded.thin {
              font-variation-settings:
              'FILL' 0,
              'wght' 150,
              'GRAD' 0,
              'opsz' 24;
              font-size: 20px;
            }
            .material-symbols-rounded.filled {
              font-variation-settings:
              'FILL' 1,
              'wght' 300,
              'GRAD' 0,
              'opsz' 24;
              color: #ef4444;
            }
            .material-symbols-rounded.small {
              font-size: 1rem;
            }
            .material-symbols-rounded.medium {
              font-size: 3rem;
            }
            .material-symbols-rounded.large {
              font-size: 7rem;
            }
            .hover-button:hover {
              color: hsl(var(--muted-foreground));
              background-color: hsl(var(--secondary));
            }
            .dark .hover-button:hover {
              color: hsl(var(--muted-foreground));
              background-color: hsl(var(--secondary));
            }
            .hover-underline:hover {
              text-decoration: underline;
            }
          `}
        </style>
      </head>
      <body lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <AuthContextProvider>
            // <PostsContextProvider>
            <WorkoutsContextProvider>
              {children}
              <Toaster />
            </WorkoutsContextProvider>
            </PostsContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}