import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WorkoutsContextProvider } from '@/context/WorkoutsContext';
import { Toaster } from "@/components/ui/sonner"

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adding Mapbox CSS */}
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
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
            .material-symbols-rounded.filled {
              font-variation-settings:
              'FILL' 1,
              'wght' 300,
              'GRAD' 0,
              'opsz' 24;
              color: #ef4444;
            }
            .material-symbols-rounded.medium {
              font-size: 3rem;
            }
            .material-symbols-rounded.large {
              font-size: 7rem;
            }
            .hover-button:hover {
              color: hs(var(--muted-foreground));
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <WorkoutsContextProvider>
            {children}
            <Toaster />
          </WorkoutsContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
