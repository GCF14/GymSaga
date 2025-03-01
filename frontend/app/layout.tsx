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
import "@/public/mapbox-gl.css"
import 'material-symbols/rounded.css';


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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
          <AuthContextProvider>
            <PostsContextProvider>
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