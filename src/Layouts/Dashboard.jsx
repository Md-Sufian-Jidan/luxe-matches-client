import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Menu, X, LayoutDashboard, User, Star, Users, BadgeCheck, Mail } from 'lucide-react';

const Dashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false); // replace with real check
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(localStorage.getItem('role') === 'admin');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('role');
        navigate('/login');
    };

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    const userLinks = [
        { name: 'Edit Biodata', to: 'edit', icon: <User size={18} /> },
        { name: 'View Biodata', to: 'view', icon: <LayoutDashboard size={18} /> },
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
                <h2 className="text-xl font-bold text-rose-600">LuxeMatches</h2>
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
                        <h2 className="text-2xl font-bold text-rose-600 hidden md:block">LuxeMatches</h2>
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
            <div className="flex-1 p-6 md:ml-64 mt-0 md:mt-0">
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