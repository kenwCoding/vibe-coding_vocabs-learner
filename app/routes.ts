import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("showcase", "routes/showcase.tsx")
] satisfies RouteConfig;
