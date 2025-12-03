import { ReactNode } from 'react';

import { AuthContext, useAuthLogic } from '@entities/auth/lib';

import { Spinner } from '@heroui/react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isInitialized, ...authContextValue } = useAuthLogic();

  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner label="Загрузка ..." />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
