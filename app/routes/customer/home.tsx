import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Customer | eSaving" },
    { name: "description", content: "eSaving Customer." },
  ];
}

export default function Home() {
    return <h1>Customer Home</h1>;
}