import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "./components/user/UserRegister";
import Login from "./components/user/UserLogin";
import StarsCanvas from "./components/canvas/Stars";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./components/auth/AuthProvider";
import GuestOnly from "./components/auth/GuestOnly";
import AuthOnly from "./components/auth/AuthOnly";
import PineappleUpload from "./components/pineapple/PineappleUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthOnly component={PineappleUpload} />,
  },
  {
    path: "/login",
    element: <GuestOnly component={Login} />,
  },
  {
    path: "/register",
    element: <GuestOnly component={Register} />,
  },
  {
    path: "/upload",
    element: <AuthOnly component={PineappleUpload} />,
  },
]);

function App() {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <StarsCanvas />
          <RouterProvider router={router} />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
