import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  classNames?: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, classNames }) => {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <div
        className={`w-full max-w-[1536px] h-full px-4 mx-auto flex flex-1 flex-col ${classNames}`}
      >
        {children}
      </div>
    </main>
  );
};
