import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const socials = [
    { icon: <Facebook size={20} />, href: 'https://facebook.com' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com' },
    { icon: <Mail size={20} />, href: 'mailto:support@matrimoji.com' },
];

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-rose-50 border-t border-rose-200 py-10 mt-16"
        >
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo & Tagline */}
                <div>
                    <Link to="/" className="text-2xl font-bold text-rose-600">💞 LuxeMatches</Link>
                    <p className="text-sm text-gray-600 mt-2">
                        Helping hearts meet and lives unite. A premium Bengali matrimony platform.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                        <li><Link to="/about" className="hover:text-rose-600 transition">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-rose-600 transition">Contact</Link></li>
                        <li><Link to="/biodatas" className="hover:text-rose-600 transition">Browse Biodatas</Link></li>
                        <li><Link to="/login" className="hover:text-rose-600 transition">Login</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Connected</h3>
                    <div className="flex space-x-4 text-rose-600">
                        {socials.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="hover:text-rose-800 transition"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">&copy; {new Date().getFullYear()} LuxeMatches. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
}

export default Footer;