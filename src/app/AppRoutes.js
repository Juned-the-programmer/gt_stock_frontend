import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Spinner from "../app/views/shared/Spinner";

const Error404 = lazy(() => import("./views/pages/error/Error404"));
const Login = lazy(() => import("./views/pages/auth/Login"));
const Users = lazy(() => import("./views/pages/user/Users"));
const UserDetail = lazy(() => import("./views/pages/user/UserDetail"));
const AddUser = lazy(() => import("./views/pages/user/AddUser"));

const SecureRoute = ({ redirectPath = "/login", children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        <Route
          path="/user"
          element={
            <SecureRoute>
              <Users />
            </SecureRoute>
          }
        />
        <Route
          path="/user/add"
          element={
          <SecureRoute>
            <AddUser />
          </SecureRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
          <SecureRoute>
            <UserDetail />
          </SecureRoute>
          }
        />
        <Route path="*" element={
          <SecureRoute>
            <Error404 />
          </SecureRoute>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
