import { Link, Navigate, Outlet } from "react-router";
import type { Route } from "./+types/admin";
import { LayoutDashboard, Users, CreditCard, Settings, ShieldCheck } from "lucide-react";
import Header from "./header";
import { useLocation } from "react-router";
import { EUserRole } from "~/types/common/enum";
import { useAuth } from "~/context/auth/auth-context";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin | eSaving" },
    { name: "description", content: "eSaving Admin." },
  ];
}

const adminNavItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Loan Approvals', href: '/admin/loans', icon: CreditCard },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();

  if(isLoggedIn && role === null) {
    return <Navigate to={{ pathname: "/" }} replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return (
    <div className="flex h-screen bg-slate-100">
      <nav className="hidden md:flex md:shrink-0 md:flex-col md:w-64">
        <div className="flex h-0 flex-1 flex-col overflow-y-auto border-r border-slate-200 bg-white">
          <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
            <ShieldCheck className="h-8 w-auto text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-slate-800">eSaving / Admin</span>
          </div>
          <div className="flex-1 overflow-y-auto py-6">
            <div className="space-y-1 px-4">
              {adminNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center rounded-lg px-3 py-2 text-sm font-medium
                    ${location.pathname.startsWith(item.href)
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
}
