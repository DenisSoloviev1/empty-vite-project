import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Providers } from "./providers";
import { Spinner } from "@heroui/react";

import "./styles/index.scss";

const App: FC = () => {
  return (
    <Providers>
      <Suspense fallback={<Spinner label="Загрузка..." />}>
        <Outlet />
      </Suspense>
    </Providers>
  );
};

export default App;
