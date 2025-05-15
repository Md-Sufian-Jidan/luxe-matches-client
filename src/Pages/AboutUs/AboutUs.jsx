import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>LuxeMatches | About Us</title>
      </Helmet>
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12 font-body bg-bg-soft rounded-2xl shadow-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <h1 className="text-5xl font-heading font-bold text-primary mb-4">
            About LuxeMatches
          </h1>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
            LuxeMatches is a premium matrimonial platform that connects hearts, builds trust, and celebrates love.
            We believe that every individual deserves a safe, genuine, and elegant journey to find their perfect match.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-10 px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-8 space-y-6"
          >
            <h2 className="text-3xl font-heading font-semibold text-accent">
              Our Mission
            </h2>
            <p className="text-text-main leading-relaxed text-base font-body">
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
            className="bg-white rounded-2xl shadow-md p-8 space-y-6"
          >
            <h2 className="text-3xl font-heading font-semibold text-accent">
              Why Choose LuxeMatches?
            </h2>
            <ul className="list-disc list-inside text-text-main space-y-3 font-body leading-relaxed">
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
          className="text-center px-4"
        >
          <h3 className="text-3xl font-heading font-semibold text-text-main mb-4">
            Start Your Journey With LuxeMatches Today
          </h3>
          <p className="text-text-secondary mb-8 font-body text-lg leading-relaxed max-w-xl mx-auto">
            Thousands of success stories. One next could be yours.
          </p>
          <a
            href="/register"
            className="inline-block bg-accent hover:bg-primary text-white font-semibold font-body px-8 py-3 rounded-full shadow-lg transition"
          >
            Create Your Profile
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default AboutUs;