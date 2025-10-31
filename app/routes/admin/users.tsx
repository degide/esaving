import UsersPage from "~/pages/admin/users";
import type { Route } from "./+types/users";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Users Management | eSaving" },
    { name: "description", content: "Manage users in eSaving." },
  ];
}

export default function UsersRoute() {
    return <UsersPage />;
}