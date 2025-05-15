import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const socials = [
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/md.abu.sufian.158992' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com' },
    { icon: <Mail size={20} />, href: 'mailto:support@luxematches.com' },
];

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-bg-soft border-t border-accent/30 py-12 mt-20"
        >
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-text-main font-body">
                {/* Logo & Tagline */}
                <div>
                    <Link to="/" className="text-2xl font-heading text-primary flex items-center gap-2">
                        💞 <span>LuxeMatches</span>
                    </Link>
                    <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-sm">
                        Helping hearts meet and lives unite. A premium Bengali matrimony platform for meaningful connections.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-heading text-primary mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-base">
                        <li><Link to="/about" className="hover:text-accent transition">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
                        <li><Link to="/biodatas" className="hover:text-accent transition">Browse Biodatas</Link></li>
                        <li><Link to="/login" className="hover:text-accent transition">Login</Link></li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-xl font-heading text-primary mb-3">Stay Connected</h3>
                    <div className="flex space-x-5 text-primary">
                        {socials.map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                className="hover:text-accent transition"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>
                    <p className="text-xs text-text-secondary mt-6">
                        &copy; {new Date().getFullYear()} LuxeMatches. All rights reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;