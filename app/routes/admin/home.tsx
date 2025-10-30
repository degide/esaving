import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin | eSaving" },
    { name: "description", content: "eSaving Admin." },
  ];
}

export default function Home() {
    return <h1>Admin Home</h1>;
}