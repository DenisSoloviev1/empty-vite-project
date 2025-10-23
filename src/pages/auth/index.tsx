import { useAuthContext } from "@/app/providers/auth";
import { LockIcon } from "@/shared/ui/icons";
import { Button, Form, Input } from "@heroui/react";
import { FC, useState } from "react";

import cls from "./index.module.scss";

const DEFAULT_FORM_DATA = {
  login: "",
  password: "",
};

const AuthPage: FC = () => {
  const { login, isLoading, error } = useAuthContext();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  return (
    <main className={cls.authPage}>
      <Form className={cls.form}>
        <div className={cls.header}>
          <div className={cls.icon}>
            <LockIcon />
          </div>
          <h2>HubServer</h2>
          <h1>Авторизация в системе управления терминалами</h1>
        </div>

        <div className={cls.content}>
          <Input
            isClearable
            size="sm"
            label="Логин"
            variant="bordered"
            labelPlacement="outside-top"
            placeholder="Введите логин"
            value={formData.login}
            onValueChange={(value) =>
              setFormData({ ...formData, login: value })
            }
          />

          <Input
            isClearable
            size="sm"
            label="Пароль"
            variant="bordered"
            labelPlacement="outside-top"
            placeholder="Введите пароль"
            value={formData.password}
            onValueChange={(value) =>
              setFormData({ ...formData, password: value })
            }
          />

          <Button
            color="primary"
            radius="sm"
            isDisabled={isLoading || !formData.login || !formData.password}
            isLoading={isLoading}
            spinnerPlacement="end"
            onPress={() =>
              login({ login: formData.login, password: formData.password })
            }
          >
            Войти
          </Button>

          {error && (
            <span className="text-red-500 text-sm text-center">
              Ошибка: {error.message}
            </span>
          )}

          <div className="flex flex-col items-center text-sm">
            <p>Тестовые данные:</p>
            <p>Логин: emilys, Пароль: emilyspass</p>
          </div>
        </div>
      </Form>
    </main>
  );
};

export default AuthPage;
