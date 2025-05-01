import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Contact = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        Swal.fire('Thank You!', 'Your message has been received. We will contact you soon.', 'success');
        reset();
    };

    return (
        <>
            <Helmet>
                <title>LuxeMatches | ContactUs</title>
            </Helmet>
            <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-bold text-rose-600 mb-4">Contact Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        We'd love to hear from you! Whether you have a question, feedback, or need assistance — feel free to reach out.
                    </p>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white shadow rounded-lg p-8 space-y-6"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Name</label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                placeholder="Enter your name"
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Your Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                placeholder="Enter your email"
                                className="w-full border px-4 py-2 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Your Message</label>
                            <textarea
                                {...register('message', { required: true })}
                                placeholder="Write your message..."
                                className="w-full border px-4 py-2 rounded h-32 resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-rose-600 text-white font-semibold py-2 rounded hover:bg-rose-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-2 text-gray-600"
                >
                    <p>Email: support@luxematches.com</p>
                    <p>Phone: +880 1234 567 890</p>
                    <p>Office: Dhaka, Bangladesh</p>
                </motion.div>
            </div>
        </>
    );
}

export default Contact;