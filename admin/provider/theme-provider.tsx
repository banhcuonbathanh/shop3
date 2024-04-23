"use client";

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { type ThemeProviderProps } from "next-themes/dist/types"

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: ReactNode;
  attribute: string; // Add the attribute prop
  defaultTheme: string; // Add the defaultTheme prop
  // Other props if needed
}

export function ThemeProvider({
  children,
  attribute,
  defaultTheme,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
