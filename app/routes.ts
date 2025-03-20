import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("showcase", "routes/showcase.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("forgot-password", "routes/auth/forgot-password.tsx"),
  route("dashboard", "routes/dashboard/index.tsx"),
  route("vocabulary", "routes/vocabulary/index.tsx"),
  route("tests", "routes/tests/index.tsx")
] satisfies RouteConfig;
