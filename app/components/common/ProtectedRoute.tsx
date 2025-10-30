import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/auth/auth-context";
import { EUserRole } from "~/types/common/enum";

export default function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: EUserRole }) {
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    const homePath = role === EUserRole.ADMIN ? '/admin' : '/customer';
    return <Navigate to={homePath} replace />;
  }

  return <>
    Here
    {children} 
  </>;
}