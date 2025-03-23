import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("showcase", "routes/showcase.tsx"),
  route("auth/login", "routes/auth/login.tsx"),
  route("auth/register", "routes/auth/register.tsx"),
  route("auth/forgot-password", "routes/auth/forgot-password.tsx"),
  route("dashboard", "routes/dashboard/index.tsx"),
  route("vocabulary", "routes/vocabulary/index.tsx"),
  route("vocabulary/new", "routes/vocabulary/new.tsx"),
  route("tests", "routes/tests/index.tsx"),
  route("tests/new", "routes/tests/new.tsx")
] satisfies RouteConfig;
