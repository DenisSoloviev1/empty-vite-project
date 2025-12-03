import { FC } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

import { useAuthContext } from '@entities/auth/lib';

import { LogoutIcon, ServerIcon } from '@shared/ui/icons';

export const Header: FC = () => {
  const { user, handleLogout } = useAuthContext();

  return (
    <header className="fixed top-0 left-0 z-50 w-full text-sm bg-white border-b border-white/20 shadow-lg shadow-black/5">
      <div className="w-full max-w-[1536px] px-4 mx-auto flex flex-col">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex justify-center items-center bg-blue-600 text-white rounded-xl">
              <ServerIcon size={20} />
            </div>
            <h1 className="text-lg font-semibold">HubServer</h1>
          </div>

          <div className="w-full hidden md:flex justify-end items-center gap-3">
            <div className="flex items-center ml-3">
              <span className="after:content-['•'] after:mx-3 after:text-sm">
                Название: {user?.name}
              </span>

              <span>Адрес: {user?.address}</span>
            </div>
          </div>

          <div className="max-w-[200px] flex items-center">
            <Dropdown placement="bottom-end">
              <DropdownTrigger className="md:hidden">
                <Button size="sm" variant="bordered">
                  Инфо
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="flat"
                aria-label="Информация о пользователе"
              >
                <DropdownItem
                  key="username"
                  isReadOnly
                  textValue={`Название: ${user?.name}`}
                  className="cursor-default"
                >
                  <span>Название: {user?.name}</span>
                </DropdownItem>
                <DropdownItem
                  key="mac"
                  isReadOnly
                  textValue={`Адрес: ${user?.address}`}
                  className="cursor-default"
                >
                  <span>Адрес: {user?.address}</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              isIconOnly
              variant="light"
              className="ml-3 text-gray-600 hover:text-red-600 transition-colors"
              startContent={<LogoutIcon size={16} />}
              onPress={() => handleLogout()}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
