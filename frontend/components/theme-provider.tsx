"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Use the type directly instead of importing from dist
type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}