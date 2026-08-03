"use client";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
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
      <TRPCReactProvider>
        <TooltipProvider>
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
};
