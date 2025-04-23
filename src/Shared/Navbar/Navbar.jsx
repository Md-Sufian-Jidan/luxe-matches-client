import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import useAuth from '../../Hooks/useAuth';

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

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70 }}
            className="bg-white shadow sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo with animation */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="text-xl font-bold text-rose-600 flex items-center gap-2">
                        💞 <span className="tracking-wide">LuxeMatches</span>
                    </Link>
                </motion.div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-6">
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
                                        'relative text-gray-700 font-medium transition hover:text-rose-500',
                                        isActive && 'text-rose-600 font-semibold'
                                    )
                                }
                            >
                                {name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-rose-500"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </NavLink>
                        </motion.div>
                    ))}

                    <motion.div whileHover={{ scale: 1.1 }}>
                        {user ? (
                            <NavLink to="/dashboard" className="text-rose-600 font-semibold">
                                Dashboard
                            </NavLink>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition shadow"
                            >
                                Login
                            </Link>
                        )}
                    </motion.div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-rose-600" onClick={toggleMenu}>
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
                        className="md:hidden bg-white shadow-inner"
                    >
                        <div className="flex flex-col px-6 pb-4 space-y-4">
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
                                                'text-gray-700 font-medium hover:text-rose-500 transition',
                                                isActive && 'text-rose-600 font-semibold'
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
                                        className="text-rose-600 font-semibold"
                                    >
                                        Dashboard
                                    </NavLink>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={toggleMenu}
                                        className="bg-rose-600 text-white px-4 py-2 rounded-full block text-center"
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
}

export default Navbar;