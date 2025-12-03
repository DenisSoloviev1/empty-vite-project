import { FC, ReactNode } from 'react';

import { HeroUIProvider as Provider } from '@heroui/react';
import { useHref, useNavigate } from 'react-router-dom';

interface HeroUIProviderProps {
  children: ReactNode;
}

export const HeroUIProvider: FC<HeroUIProviderProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Provider navigate={navigate} useHref={useHref}>
      {children}
    </Provider>
  );
};
