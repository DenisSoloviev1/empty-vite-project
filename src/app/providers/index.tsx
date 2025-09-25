import { FC, ReactNode } from "react";

import { HeroUIProvider } from "@heroui/react";
import { QueryProvider } from "./query";
import { AuthProvider } from "./auth";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <HeroUIProvider>
        <AuthProvider>{children}</AuthProvider>
      </HeroUIProvider>
    </QueryProvider>
  );
};
