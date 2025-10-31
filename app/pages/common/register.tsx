import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Button from "~/components/common/Button";
import Card from "~/components/common/Card";
import CardContent from "~/components/common/CardContent";
import Input from "~/components/common/Input";
import PasswordInput from "~/components/common/PasswordInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EGender, EUserRole } from "~/types/common/enum";
import SelectInput from "~/components/common/SelectInput";
import { AuthApi } from "~/api/auth";

const schema = z.object({
    firstName: z.string().min(3, { error: "First name must be at least 3 characters long" }).max(50, {error: "First name must be at most 50 characters long"}),
    middleName: z.string().max(50, {error: "Middle name must be at most 50 characters long"}).optional(),
    lastName: z.string().min(3, { error: "Last name must be at least 3 characters long" }).max(50, {error: "Last name must be at most 50 characters long"}),
    email: z.email({error: "Please enter a valid email address"}),
    password: z.string().min(6, { error: "Password must be at least 6 characters long" }).max(100, { error: "Password must be at most 100 characters long" }),
    gender: z.enum([EGender.MALE, EGender.FEMALE, EGender.OTHER]),
    role: z.enum([EUserRole.CUSTOMER, EUserRole.ADMIN]),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage(){
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        setIsLoading(true);
        AuthApi.register({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            gender: data.gender,
            role: data.role,
            ...(data.middleName && data.middleName.trim().length > 0 ? { middleName: data.middleName } : {})
        }).then(async () => {
            setIsLoading(false);
            navigate({pathname: '/login'});
        }).catch((err: any) => {
            setError(err.message);
            setIsLoading(false);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="flex min-h-screen flex-col justify-center bg-slate-100 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <ShieldCheck className="mx-auto h-12 w-auto text-indigo-600" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
                Create your account
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
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input
                                id="firstName"
                                type="text"
                                label="First Name"
                                className="mb-0"
                                {...register("firstName")}
                            />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}

                            <Input
                                id="middleName"
                                type="text"
                                label="Middle Name"
                                className="mb-0"
                                {...register("middleName")}
                            />
                            {errors.middleName && <p className="text-sm text-red-500">{errors.middleName.message}</p>}

                            <Input
                                id="lastName"
                                type="text"
                                label="Last Name"
                                className="mb-0"
                                {...register("lastName")}
                            />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}

                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="abc@example.com"
                                className="mb-0"
                                {...register("email")}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

                            <PasswordInput
                                id="password"
                                label="Password"
                                placeholder="••••••••"
                                {...register("password")}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

                            <div className="flex flex-row gap-6">
                                <div className="w-full">
                                    <SelectInput
                                        id="gender"
                                        label="Gender"
                                        options={[
                                            { value: EGender.MALE, label: EGender.MALE },
                                            { value: EGender.FEMALE, label: EGender.FEMALE },
                                            { value: EGender.OTHER, label: EGender.OTHER },
                                        ]}
                                        {...register("gender")}
                                    />
                                </div>
                                <div className="w-full">
                                    <SelectInput
                                        id="role"
                                        label="Role"
                                        options={[
                                            { value: EUserRole.ADMIN, label: EUserRole.ADMIN },
                                            { value: EUserRole.CUSTOMER, label: EUserRole.CUSTOMER },
                                        ]}
                                        {...register("role")}
                                    />
                                </div>
                            </div>
                            
                            {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
                            {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}

                            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
                                Sign up
                            </Button>
                        </form>
                        <div>
                            <span>Do you have an account? <Link to="/login" className="text-indigo-800 hover:text-indigo-700">Sign in</Link></span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}