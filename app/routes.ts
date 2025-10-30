import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
    index("./routes/splash.tsx"),

    route("login", "./routes/login.tsx"),
    route("register", "./routes/register.tsx"),

    route("admin", "./layouts/admin.tsx", [
        index("./routes/admin/home.tsx"),
    ]),

    route("customer", "./layouts/customer.tsx", [
        index("./routes/customer/home.tsx"),
    ]),
] satisfies RouteConfig;
