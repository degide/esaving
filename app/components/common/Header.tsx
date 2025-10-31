import { Bell, ChevronDown, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/context/auth/auth-context";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  
  useEffect(() => {
    if (user) {
      setNotifications([]);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', {replace: true});
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>{/* search */}</div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell size={20} />
            {notifications.some(n => !n.isRead) && (
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>
          
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-3 border-b border-slate-100">
                <h4 className="text-sm font-medium text-slate-800">Notifications</h4>
              </div>
              <div className="py-1 max-h-80 overflow-y-auto">
                {notifications.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No new notifications.</p>
                )}
                {notifications.map(notif => (
                  <div key={notif.id} className={`p-3 border-b border-slate-100 ${!notif.isRead ? 'bg-indigo-50' : ''}`}>
                    <p className="text-sm text-slate-700">{notif.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button className="flex items-center gap-2 rounded-full p-1 pr-2 text-sm text-slate-600 hover:bg-slate-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 font-medium">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </span>
            <span className="hidden sm:inline">{user?.firstName} {user?.lastName}</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <button 
          onClick={handleLogout}
          title="Logout"
          className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}