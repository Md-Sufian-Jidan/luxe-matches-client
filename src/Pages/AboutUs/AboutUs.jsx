import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <>
            <Helmet>
                <title>LuxeMatches | About Us</title>
            </Helmet>
            <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-rose-600 mb-4">About LuxeMatches</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        LuxeMatches is a premium matrimonial platform that connects hearts, builds trust, and celebrates love.
                        We believe that every individual deserves a safe, genuine, and elegant journey to find their perfect match.
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="bg-white shadow rounded-lg p-6 space-y-4"
                    >
                        <h2 className="text-2xl font-semibold text-rose-500">Our Mission</h2>
                        <p className="text-gray-600">
                            At LuxeMatches, our mission is simple yet profound — to create meaningful and lasting relationships.
                            We strive to provide a secure and sophisticated platform where individuals can meet, connect, and begin
                            a new chapter of their lives with someone truly special.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="bg-white shadow rounded-lg p-6 space-y-4"
                    >
                        <h2 className="text-2xl font-semibold text-rose-500">Why Choose LuxeMatches?</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>🛡️ 100% Verified Profiles</li>
                            <li>💖 Premium Member Benefits</li>
                            <li>🎯 Smart Filtering and Search Options</li>
                            <li>🔒 Secure Payments and Privacy</li>
                            <li>🌎 Serving Users Across Bangladesh & Beyond</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                        Start Your Journey With LuxeMatches Today
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Thousands of success stories. One next could be yours.
                    </p>
                    <a
                        href="/register"
                        className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 rounded-full transition"
                    >
                        Create Your Profile
                    </a>
                </motion.div>
            </div>
        </>
    );
}

export default AboutUs;