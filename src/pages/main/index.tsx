import { FC } from "react";
import { Button } from "@heroui/react";
import { useAuthContext } from "@/app/providers/auth";

import { LogoutIcon } from "@/shared/ui/icons";
import cls from "./index.module.scss";

const MainPage: FC = () => {
  const { user, logout } = useAuthContext();

  return (
    <>
      <header className={cls.header}>
        <div className={cls.wrapper}>
          <div className="flex justify-between items-center">
            <h1>HubServer</h1>

            <div className="max-w-[250px] flex items-center gap-4">
              <span>Пользователь: {user?.username}</span>
              <Button
                isIconOnly
                variant="light"
                className={cls.logout}
                startContent={<LogoutIcon size={16} />}
                onPress={() => logout()}
              />
            </div>
          </div>
        </div>
      </header>

      <main className={cls.main}>
        <div className={cls.wrapper}>
          {user && <p>Привет, {user.username}!</p>}
        </div>
      </main>
    </>
  );
};

export default MainPage;
