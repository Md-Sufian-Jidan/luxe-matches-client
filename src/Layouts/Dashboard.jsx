import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Menu, X, LayoutDashboard, User, Star, Users, BadgeCheck, Mail } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false); // replace with real check
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const handleLogout = () => {
        logOut()
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Logout successfully.',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    };
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const userLinks = [
        { name: 'Edit Biodata', to: 'edit-bio-data', icon: <User size={18} /> },
        { name: 'View Biodata', to: 'view-bio-data', icon: <LayoutDashboard size={18} /> },
        { name: 'My Favourites', to: 'favourites', icon: <Star size={18} /> },
        { name: 'My Contact Requests', to: 'requests', icon: <Mail size={18} /> },
        { name: 'Got Married', to: 'married', icon: <BadgeCheck size={18} /> },
    ];
    const adminLinks = [
        { name: 'Dashboard', to: 'admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Manage Users', to: 'manage-users', icon: <Users size={18} /> },
        { name: 'Approve Premiums', to: 'approve-premium', icon: <Star size={18} /> },
        { name: 'Approve Contacts', to: 'approve-contacts', icon: <Mail size={18} /> },
        { name: 'Success Stories', to: 'success-stories', icon: <BadgeCheck size={18} /> },
    ];
    const navItems = isAdmin ? adminLinks : userLinks;

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Mobile Header */}
            <div className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
                <Link to={'/'} className="text-xl font-bold text-rose-600">LuxeMatches</Link>
                <button onClick={toggleSidebar}>
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || window.innerWidth >= 768) && (
                    <motion.aside
                        initial={{ x: -250 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.3 }}
                        className="w-64 bg-white shadow-md p-6 space-y-6 md:block fixed md:relative top-0 left-0 z-40 h-full md:h-auto"
                    >
                        <Link to={'/'} className="md:text-2xl text-xl font-bold text-rose-600 md:block">LuxeMatches</Link>
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium ${isActive
                                            ? 'bg-rose-100 text-rose-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`
                                    }
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    {item.icon} {item.name}
                                </NavLink>
                            ))}
                        </nav>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 p-6 mt-0 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;