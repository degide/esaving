import type { Route } from "./+types/register";
import RegisterPage from "~/pages/common/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register | eSaving" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function Register() {
    return <RegisterPage />;
}