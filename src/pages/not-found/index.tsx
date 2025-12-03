import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@heroui/react';

import { appRouting } from '@app/config';

import { MainLayout } from '@shared/ui/main-layout';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="w-full max-w-[600px] flex flex-col items-center m-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          404 - Страница не найдена
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Кажется, вы заблудились. Эта страница не существует
        </p>
        <Button
          color="primary"
          size="lg"
          radius="sm"
          onPress={() => navigate(appRouting.main.path)}
        >
          На главную
        </Button>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
