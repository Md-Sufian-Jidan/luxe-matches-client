import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useRole from '../../Hooks/useCheck';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Biodatas', path: '/biodatas' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
];

const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.05 * i },
    }),
};

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize from localStorage or system preference
        if (typeof window !== "undefined") {
            if (localStorage.theme) {
                return localStorage.theme === 'dark';
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const { isAdmin } = useRole();

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'User logged out successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70 }}
            className="bg-bg-soft dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                {/* Logo with animation */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="text-2xl font-heading text-primary dark:text-accent flex items-center gap-3 tracking-wide">
                        💞 <span>LuxeMatches</span>
                    </Link>
                </motion.div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ name, path }, i) => (
                        <motion.div
                            key={name}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={linkVariants}
                        >
                            <NavLink
                                to={path}
                                className={({ isActive }) =>
                                    isActive ?
                                        'text-primary dark:text-accent font-semibold' :
                                        'relative font-medium text-lg transition-colors duration-300 hover:text-accent text-text-main dark:text-gray-300'
                                }

                            >
                                {name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent rounded"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </NavLink>
                        </motion.div>
                    ))}

                    <motion.div whileHover={{ scale: 1.1 }}>
                        {user ? (
                            <NavLink
                                to={`${isAdmin ? '/dashboard/admin' : '/dashboard/edit-bio-data'}`}
                                className={({ isActive }) =>
                                    clsx(
                                        'font-medium text-lg transition-colors duration-300 hover:text-accent',
                                        'text-text-main dark:text-gray-300',
                                        isActive && 'text-primary dark:text-accent font-semibold'
                                    )
                                }>
                                Dashboard
                            </NavLink>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-primary text-bg-soft px-6 py-2 rounded-full hover:bg-accent shadow-lg font-medium text-lg transition-colors duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </motion.div>
                    {user && (
                        <motion.button
                            onClick={handleLogout}
                            whileHover={{ scale: 1.05 }}
                            className="bg-accent text-bg-soft px-5 py-1.5 rounded-full hover:bg-primary transition-colors duration-300 font-medium"
                        >
                            Logout
                        </motion.button>
                    )}

                    {/* Dark Mode Toggle */}
                    <motion.button
                        onClick={() => setDarkMode(!darkMode)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle Dark Mode"
                        className="text-primary dark:text-accent focus:outline-none"
                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-primary dark:text-accent" onClick={toggleMenu} aria-label="Toggle menu">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu with animations */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-bg-soft dark:bg-gray-900 shadow-inner transition-colors duration-300"
                    >
                        <div className="flex flex-col px-8 py-6 space-y-6">
                            {navLinks.map(({ name, path }, i) => (
                                <motion.div
                                    key={name}
                                    custom={i}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={linkVariants}
                                >
                                    <NavLink
                                        to={path}
                                        onClick={toggleMenu}
                                        className={({ isActive }) =>
                                            isActive ?
                                                'text-primary dark:text-accent font-semibold' :
                                                'relative font-medium text-lg transition-colors duration-300 hover:text-accent text-text-main dark:text-gray-300'
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div whileHover={{ scale: 1.05 }}>
                                {user ? (
                                    <NavLink
                                        to={`${isAdmin ? '/dashboard/admin' : '/dashboard/edit-bio-data'}`}
                                        onClick={toggleMenu}
                                        className={({ isActive }) =>
                                            clsx(
                                                'font-medium text-lg hover:text-accent transition-colors duration-300',
                                                'text-text-main dark:text-gray-300',
                                                isActive && 'text-primary dark:text-accent font-semibold'
                                            )
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={toggleMenu}
                                        className="bg-primary text-bg-soft px-6 py-2 rounded-full block text-center font-medium text-lg"
                                    >
                                        Login
                                    </Link>
                                )}
                            </motion.div>

                            {/* Mobile dark mode toggle */}
                            <motion.button
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                    toggleMenu();
                                }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle Dark Mode"
                                className="flex justify-center text-primary dark:text-accent focus:outline-none"
                                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;