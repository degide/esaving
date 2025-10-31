import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./routes/splash.tsx", {id: "splash"}),

    route("login", "./routes/login.tsx"),
    route("register", "./routes/register.tsx"),

    route("admin", "./layouts/admin.tsx", [
        index("./routes/admin/home.tsx"),
        route("users", "./routes/admin/users.tsx"),
    ]),

    route("customer", "./layouts/customer.tsx", [
        index("./routes/customer/home.tsx"),
    ]),
] satisfies RouteConfig;
