import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { appRouting } from "@/app/config";
import ProtectedRoute from "./protected-route";

const App = lazy(() => import("../index"));
const Main = lazy(() => import("@/pages/main"));
const Auth = lazy(() => import("@/pages/auth"));
const NotFound = lazy(() => import("@/pages/not-found"));

export const router = createBrowserRouter([
  {
    path: appRouting.main.path,
    element: <App />,
    children: [
      {
        path: appRouting.auth.path,
        element: <Auth />,
      },
      {
        path: appRouting.notFound.path,
        element: <NotFound />,
      },
      {
        path: appRouting.main.path,
        element: (
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
