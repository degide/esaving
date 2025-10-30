import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { AuthApi } from "~/api/auth";
import type { LoginDTO, User } from "~/types/auth";
import type { EUserRole } from "~/types/common/enum";

type AuthContextProps = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  role: EUserRole | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (dto: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
  loadUserProfile: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken') || null);
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refreshToken") || null);
  const [role, setRole] = useState<EUserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const storedUser = JSON.parse(localStorage.getItem('authUser') || 'null');
  //       if (storedUser) {
  //         setUser(storedUser);
  //         setRole(storedUser.role);
  //       } else {
  //         throw new Error("No user found");
  //       }
  //     } catch (error) {
  //       console.error("Invalid token or user data", error);
  //       localStorage.removeItem('authToken');
  //       localStorage.removeItem('authUser');
  //       setToken(null);
  //       setUser(null);
  //       setRefreshToken(null);
  //       setLoading(true);
  //     }
  //   }
  // }, [token]);

  const loadUserProfile = async ()=> {
    try {
      if(localStorage.getItem("authToken")) {
        setToken(localStorage.getItem('authToken'));
        setRefreshToken(localStorage.getItem("refreshToken"));
        const profileResponse = await AuthApi.getUserProfile();
        if(profileResponse && profileResponse.data) {
          setUser(profileResponse.data.user);
          setRole(profileResponse.data.user.role);
          localStorage.setItem('authUser', JSON.stringify(profileResponse.data.user));
          setLoading(false);
        }
      }
      return true;
    } catch (error) {
      console.error("Error loading user profile", error);
      setUser(null);
      setRole(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authUser');
      return false;
    }
  }

  const login = async (dto: LoginDTO) => {
    const loginResponse = await AuthApi.login(dto);
    if(loginResponse && loginResponse.data) {
      setToken(loginResponse.data.token);
      setRefreshToken(loginResponse.data.refreshToken);
      localStorage.setItem('authToken', loginResponse.data.token);
      localStorage.setItem("refreshToken", loginResponse.data.refreshToken);

      const profileResponse = await AuthApi.getUserProfile();
      if(profileResponse && profileResponse.data) {
        setUser(profileResponse.data.user);
        setRole(profileResponse.data.user.role);
        localStorage.setItem('authUser', JSON.stringify(profileResponse.data.user));
        setLoading(false);
      }
    }
  };

  const logout = async () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authUser');
    await AuthApi.logout();

  };

  const value = useMemo(() => ({
    user,
    token,
    refreshToken,
    role,
    isLoggedIn: !!token,
    loading,
    login,
    logout,
    loadUserProfile,
  }), [user, token, role, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};