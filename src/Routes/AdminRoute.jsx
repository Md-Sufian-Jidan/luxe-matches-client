import { Navigate, useLocation } from "react-router-dom";
import useCheck from '../Hooks/useCheck';
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const { isAdmin, isLoading, } = useCheck();

    if (loading || isLoading) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-rose-500 mx-auto max-w-16"></div>

    if (user && isAdmin) return children;

    return <Navigate to="/" state={location.pathname} replace></Navigate>
};

export default AdminRoute;