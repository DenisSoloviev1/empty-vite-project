import { FC } from 'react';

import { Header } from '@widgets/header';
import { useAuthContext } from '@/entities/auth/lib';
import { MainLayout } from '@/shared/ui/main-layout';

const MainPage: FC = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Header />

      <MainLayout classNames={'mt-16'}>
        {user && <p>Привет, {user.username}!</p>}
      </MainLayout>
    </>
  );
};

export default MainPage;
