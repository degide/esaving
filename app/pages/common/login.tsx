import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Button from "~/components/common/Button";
import Card from "~/components/common/Card";
import CardContent from "~/components/common/CardContent";
import Input from "~/components/common/Input";
import PasswordInput from "~/components/common/PasswordInput";
import { useAuth } from "~/context/auth/auth-context";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login({username: email, password: password});
            const userRole = JSON.parse(localStorage.getItem('authUser') || 'null')?.role;
            
            const from = location.state?.from?.pathname;

            if (from && from !== '/login') {
                navigate(from, { replace: true });
            } else {
                const homePath = userRole === userRole.ADMIN ? '/admin' : '/customer';
                navigate(homePath, { replace: true });
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center bg-slate-100 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <ShieldCheck className="mx-auto h-12 w-auto text-indigo-600" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                                <p className="text-sm font-medium text-red-700">{error}</p>
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="abc@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <PasswordInput
                                id="password"
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                                Sign in
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}