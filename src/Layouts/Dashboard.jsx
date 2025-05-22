import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Menu, X, LayoutDashboard, User, Star, Users, BadgeCheck, Mail } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import useCheck from '../Hooks/useCheck';

const Dashboard = () => {
  const { logOut } = useAuth();
  const { isAdmin } = useCheck();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully.',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    });
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

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
    <div className="min-h-full flex flex-col md:flex-row bg-bg-soft font-body">

      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-heading text-primary">LuxeMatches</Link>
        <button onClick={toggleSidebar} className="text-primary">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-white dark:bg-bg-soft shadow-lg md:static fixed z-50 top-0 left-0 h-[100vh] p-6 rounded-r-2xl font-body"
          >
            <div className="mb-6">
              <Link to="/" className="text-2xl font-heading text-primary dark:text-accent block">LuxeMatches</Link>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-2xl transition-colors duration-200 text-sm ${isActive
                      ? 'bg-accent/10 text-primary dark:text-text-secondary font-semibold'
                      : 'text-text-secondary hover:bg-bg-soft hover:text-primary'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-8 flex items-center gap-2 text-sm text-rose-600 hover:text-primary transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white dark:bg-bg-soft shadow p-4 md:p-6"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;