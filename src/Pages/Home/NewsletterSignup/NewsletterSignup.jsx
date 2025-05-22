import { useState } from "react";
import { motion } from "framer-motion";

const NewsletterSignup = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        // Here you would handle submission logic (API call, etc)
        setSubmitted(true);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const buttonHover = {
        scale: 1.05,
        transition: { duration: 0.3 },
    };

    return (
        <section className="bg-bg-soft dark:bg-gray-900 py-12 px-6 transition-colors duration-300">
            <motion.div
                className="max-w-xl mx-auto text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-4xl font-heading font-bold text-primary dark:text-accent mb-4"
                    variants={containerVariants}
                >
                    Stay in the Loop
                </motion.h2>
                <motion.p
                    className="mb-8 font-body text-text-secondary dark:text-gray-400 text-lg"
                    variants={containerVariants}
                    transition={{ delay: 0.2 }}
                >
                    Subscribe to LuxeMatches updates and get the latest dating tips and news.
                </motion.p>

                {submitted ? (
                    <motion.p
                        className="text-primary font-semibold font-body"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Thanks for subscribing!
                    </motion.p>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-grow rounded-xl border border-gray-300 px-4 py-3 text-text-main font-body placeholder:text-text-secondary dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent transition"
                            aria-label="Email address"
                        />
                        <motion.button
                            type="submit"
                            className="bg-btn hover:bg-primary text-white font-semibold rounded-xl px-6 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                            whileHover={buttonHover}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Subscribe to newsletter"
                        >
                            Subscribe
                        </motion.button>
                    </motion.form>
                )}
            </motion.div>
        </section>
    );
}

export default NewsletterSignup;