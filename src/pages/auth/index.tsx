import { FC } from 'react';
import { Button, Form, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthContext } from '@entities/auth/lib';
import { LockIcon } from '@shared/ui/icons';
import { MainLayout } from '@shared/ui/main-layout';
import { loginSchema, LoginFormData } from '@shared/lib';

const AuthPage: FC = () => {
  const { handleLogin, isLoading } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin({ login: data.login, password: data.password });
  };

  return (
    <MainLayout>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[445px] flex flex-col gap-6 p-6 border border-gray-100 rounded-xl shadow-xl m-auto"
      >
        <div className="w-full flex flex-col items-center gap-1">
          <div className="w-12 h-12 flex justify-center items-center bg-blue-600 rounded-full mb-4">
            <LockIcon className="text-white" />
          </div>
          <h2 className="text-neutral-700 mb-1">HubServer</h2>
          <h1 className="text-neutral-700 text-center">
            Авторизация в системе управления терминалами
          </h1>
        </div>

        <div className="w-full flex flex-col gap-4">
          <Input
            {...register('login')}
            isClearable
            radius="sm"
            label="Логин"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Введите логин"
            isInvalid={!!errors.login}
            errorMessage={errors.login?.message}
          />

          <Input
            {...register('password')}
            isClearable
            radius="sm"
            label="Пароль"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Введите пароль"
            type="password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <Button
            color="primary"
            radius="sm"
            type="submit"
            isDisabled={isLoading || isSubmitting}
            isLoading={isLoading || isSubmitting}
            spinnerPlacement="end"
          >
            Войти
          </Button>
        </div>
      </Form>
    </MainLayout>
  );
};

export default AuthPage;
