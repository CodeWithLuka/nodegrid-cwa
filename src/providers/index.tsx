"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ThemeProvider } from "./theme/theme-provider";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export const ClientProviders = ({
  children,
}: Readonly<ClientProvidersProps>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="nodegrid-cwa"
    >
      <TooltipProvider>
        {children}
        <Toaster richColors position="top-right" />
      </TooltipProvider>
    </ThemeProvider>
  );
};
