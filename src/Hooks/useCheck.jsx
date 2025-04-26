import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: [user?.email, 'check'],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/check/${user?.email}`);
            return res.data;
        },
    });

    return { isAdmin: data?.isAdmin, isPremium: data?.isPremium, isLoading, isError };
};

export default useRole;
