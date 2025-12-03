import { FC, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '@heroui/react';

import { Providers } from './providers';

const App: FC = () => {
  return (
    <Providers>
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner label="Загрузка ..." />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Providers>
  );
};

export default App;
