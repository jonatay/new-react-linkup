import React from "react";

const SignInPage = React.lazy(() =>
  import("../views/pages/service/sign-in-page")
);
const RegisterUserPage = React.lazy(() =>
  import("../views/pages/service/register-user-page")
);

export const serviceRoutes = [
  { path: "/sign-in", component: SignInPage },
  { path: "/register", component: RegisterUserPage },
];
