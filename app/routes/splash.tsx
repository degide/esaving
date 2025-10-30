import { useAuth } from "~/context/auth/auth-context";
import type { Route } from "./+types/splash";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { EUserRole } from "~/types/common/enum";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome | eSaving" },
    { name: "description", content: "Welcome to eSaving." },
  ];
}

export default function Splash() {
  const { isLoggedIn, role, loadUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    if(isLoggedIn && role) {
      navigate(role == EUserRole.ADMIN? "/admin" : "/customer", {replace: true})
      return () => {};
    }
  }, [isLoggedIn, role]);

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      loadUserProfile().then(loaded=> {
        if(loaded) {
          console.log("Role: ", role)
        } else {
          navigate("/login", {replace: true});
        }
      });
    } else {
      navigate("/login", {replace: true});
    }
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <div className="my-auto flex flex-col items-center justify-center gap-24">
        <h3 className="text-4xl font-bold text-blue-800 font-serif animate-pulse">eSaving</h3>
      </div>
    </main>
  );
}
