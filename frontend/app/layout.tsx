import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { WorkoutsContextProvider } from '@/context/WorkoutsContext';
import { AuthContextProvider } from '@/context/AuthContext';
import { Toaster } from "@/components/ui/sonner";
import NavigationBar from "@/components/navigation-bar"
import { SidebarOverlay } from "@/components/sidebar-overlay"

// Using local fonts as originally intended
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GymSaga",
  description: "GymSaga",
  // Static approach for icons
  icons: [
    { url: "/GymSagaDark.svg", media: "(prefers-color-scheme: light)" },
    { url: "/GymSagaLight.svg", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Put stylesheets in the head rather than body */}
        <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
        <style dangerouslySetInnerHTML={{ __html: `
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
        `}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            <WorkoutsContextProvider>
              <div className="flex flex-col min-h-screen max-w-full overflow-x-hidden">
                <NavigationBar />
                
                
                <SidebarOverlay />
                
                <main className="w-full flex-1 pt-14 px-8 md:pl-72 max-w-full">
                  {children}
                </main>
              </div>
              <Toaster />
            </WorkoutsContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}