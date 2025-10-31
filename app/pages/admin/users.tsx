import { useEffect, useState } from "react";
import { UserApi } from "~/api/users";
import Table from "~/components/common/Table";
import type { User } from "~/types/auth";
import { humanizeEnum } from "~/utils";
import moment from "moment";
import StatusBadge from "~/components/common/StatusBadge";
import { EllipsisVertical, Users2 } from "lucide-react";
import { EGeneralStatus } from "~/types/common/enum";
import Input from "~/components/common/Input";
import Pagination from "~/components/common/Pagination";

type UsersPagination = {
    search: string;
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export default function UsersPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [showActions, setShowActions] = useState<number | null>(null);
    const [pagination, setPagination] = useState<UsersPagination>({
        search: "",
        page: 1,
        limit: 15,
        total: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });

    const fectUsers = ()=> {
        setLoading(true);
        setError(null);
        UserApi.getAllUsers({
            search: pagination.search,
            page: pagination.page,
            limit: pagination.limit,
        }).then((res) => {
            if (!res) throw new Error("No data received.");
            setUsers(res.data);
            setPagination((prev) => ({
                ...prev,
                total: res.total,
                hasNextPage: res.hasNextPage,
                hasPrevPage: res.hasPrevPage,
            }));
        }).catch((err) => {
            setError(err.message || "Failed to fetch users.");
        }).finally(() => {
            setLoading(false);
        });
    }

    const activateUser = async (userId: number)=> {
        await UserApi.activateUser(userId);
        fectUsers();
    }

    const approveUser = async (userId: number)=> {
        await UserApi.approveUser(userId);
        fectUsers();
    }

    const suspendUser = async (userId: number)=> {
        await UserApi.suspendUser(userId);
        fectUsers();
    }

    useEffect(() => {
        fectUsers();   
    }, [pagination.page, pagination.limit, pagination.search]);

    return (
        <div className="w-full h-full bg-white overflow-y-auto rounded p-4 lg:px-8 flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-md font-medium mt-2">
                    <Users2 className="inline mb-1 mr-2" size={20} />
                    Users management
                </h1>
                <Input
                    id="search-users"
                    type="text"
                    placeholder="Search users..."
                    value={pagination.search}
                    onChange={(e) => setPagination((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                    className="w-64"
                />
            </div>
            {error && <p className="text-red-500 my-4">{error}</p>}
            <Table
                className="mt-6 h-full"
                headers={["ID", "Name", "Email", "Gender", "Role", "Status", "Created At", "Actions"]}
            >
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider">{user.id}</td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider">{user.firstName + (user.middleName ? " " + user.middleName : "")} {user.lastName}</td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider">{user.email}</td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider">{user.gender}</td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider">{humanizeEnum(user.role)}</td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider font-bold">
                            <StatusBadge status={user.status} />
                        </td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900 tracking-wider">{moment(user.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                        <td className="px-6 py-3 text-left text-sm text-gray-900">
                            <div className="relative">
                                <button
                                    onClick={() => setShowActions(user.id === showActions ? null : user.id)}
                                    className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <EllipsisVertical size={20} />
                                </button>

                                {showActions === user.id && (
                                    <div className="absolute z-40 right-0 mt-2 w-30 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none">
                                        {user.status === EGeneralStatus.PENDING && (
                                            <button onClick={()=> approveUser(user.id)} className="block w-full font-medium text-left px-4 py-2 text-sm text-green-900 hover:bg-gray-100 border-b border-gray-200 cursor-pointer">
                                                Approve
                                            </button>
                                        )}
                                        {user.status === EGeneralStatus.INACTIVE || user.status == EGeneralStatus.SUSPENDED && (
                                            <button onClick={()=> activateUser(user.id)} className="block w-full font-medium text-left px-4 py-2 text-sm text-green-900 hover:bg-gray-100 border-b border-gray-200 cursor-pointer">
                                                Activate
                                            </button>
                                        )}
                                        {(user.status !== EGeneralStatus.SUSPENDED) && (
                                            <button onClick={()=> suspendUser(user.id)} className="block w-full text-left px-4 py-2 text-sm text-red-900 hover:bg-gray-100 border-b border-gray-200 cursor-pointer">
                                                Suspend
                                            </button>
                                        )}
                                        <button className="block w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-gray-100 cursor-pointer">
                                            View
                                        </button>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
            <div className="pagination">
                <Pagination
                    currentPage={pagination.page}
                    totalPages={Math.ceil(pagination.total / pagination.limit)}
                    total={pagination.total}
                    hasNextPage={pagination.hasNextPage}
                    hasPrevPage={pagination.hasPrevPage}
                    limit={pagination.limit}
                    onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                />
            </div>
        </div>
    );
}