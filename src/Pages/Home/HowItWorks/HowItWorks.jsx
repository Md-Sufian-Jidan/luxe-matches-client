import { motion } from 'framer-motion';
import { FaUserPlus, FaSearch, FaHeart, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        id: 1,
        title: 'Create Your Profile',
        desc: 'Sign up and fill out your biodata with detailed information about yourself.',
        icon: <FaUserPlus className="text-3xl text-accent" />,
    },
    {
        id: 2,
        title: 'Browse Premium Matches',
        desc: 'Explore our curated list of premium profiles tailored to your preferences.',
        icon: <FaSearch className="text-3xl text-accent" />,
    },
    {
        id: 3,
        title: 'Send Interest',
        desc: 'Like a profile? Send interest and wait for a match.',
        icon: <FaHeart className="text-3xl text-accent" />,
    },
    {
        id: 4,
        title: 'Request Contact Info',
        desc: 'Upgrade to premium and request verified contact details securely.',
        icon: <FaEnvelope className="text-3xl text-accent" />,
    },
];

const HowItWorks = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-bg-soft py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-heading text-center text-primary mb-5"
                >
                    How It Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-heading text-center text-primary mb-12"
                >
                    A step-by-step guide to using LuxeMatches effectively
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="bg-accent/10 p-3 rounded-full">{step.icon}</div>
                                <span className="text-sm font-semibold text-accent">
                                    Step {step.id}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-text-main mb-2">{step.title}</h3>
                            <p className="text-sm text-text-secondary">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-btn text-white px-6 py-3 rounded-full text-sm font-semibold shadow hover:bg-primary transition"
                    >
                        Join Now
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
