import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "../components/shared/AuthLayout";
import Layout from "../components/shared/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";

type ComponentRoute = {
  path: string;
  element: ReactElement;
};

const routes: ComponentRoute[] = [{ path: "", element: <Home /> }];
const authRoutes: ComponentRoute[] = [
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/login", element: <Login /> },
];

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }: ComponentRoute) => (
          <Route key={path} path={path} element={<Layout>{element}</Layout>} />
        ))}
        {authRoutes.map(({ path, element }: ComponentRoute) => (
          <Route
            key={path}
            path={path}
            element={<AuthLayout>{element}</AuthLayout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
