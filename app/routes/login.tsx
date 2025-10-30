import LoginPage from "~/pages/common/login";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | eSaving" },
    { name: "description", content: "Login to your account" },
  ];
}

export default function Login() {
    return <LoginPage/>;
}