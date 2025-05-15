import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

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
    const toggleMenu = () => setMenuOpen((prev) => !prev);
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
            className="bg-bg-soft shadow-md sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                {/* Logo with animation */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="text-2xl font-heading text-primary flex items-center gap-3 tracking-wide">
                        💞 <span>LuxeMatches</span>
                    </Link>
                </motion.div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-10">
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
                                    clsx(
                                        'relative text-text-main font-medium text-lg transition-colors duration-300 hover:text-accent',
                                        isActive && 'text-primary font-semibold'
                                    )
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
                            <NavLink to="/dashboard"
                                className={({ isActive }) =>
                                    clsx(
                                        'text-text-main font-medium text-lg hover:text-accent transition-colors duration-300',
                                        isActive && 'text-primary font-semibold'
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
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-primary" onClick={toggleMenu} aria-label="Toggle menu">
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
                        className="md:hidden bg-bg-soft shadow-inner"
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
                                            clsx(
                                                'text-text-main font-medium text-lg hover:text-accent transition-colors duration-300',
                                                isActive && 'text-primary font-semibold'
                                            )
                                        }
                                    >
                                        {name}
                                    </NavLink>
                                </motion.div>
                            ))}

                            <motion.div whileHover={{ scale: 1.05 }}>
                                {user ? (
                                    <NavLink
                                        to="/dashboard"
                                        onClick={toggleMenu}
                                        className={({ isActive }) =>
                                            clsx(
                                                'text-text-main font-medium text-lg hover:text-accent transition-colors duration-300',
                                                isActive && 'text-primary font-semibold'
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;