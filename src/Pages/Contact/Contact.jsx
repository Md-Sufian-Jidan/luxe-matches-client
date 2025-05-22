import { motion } from 'framer-motion'; 
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';

const Contact = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const axiosSecure = useAxiosSecure();

  const contact = useMutation({
    mutationFn: (contactData) =>
      axiosSecure.post('/user-contact', contactData)
  });

  const onSubmit = async (data) => {
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return toast.error('All fields are required.');
    }
    const newContact = { name, email, message, createdAt: new Date() };
    try {
      contact.mutate(newContact, {
        onSuccess: () => {
          Swal.fire('Thank You!!', 'Your message has been received. We will contact you soon.', 'success');
          refetch();
        }
      });
      reset();
    } catch (error) {
      console.error(error);
      Swal.fire('Oops!', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Contact Us</title>
      </Helmet>
      <div className="px-4 py-16 space-y-16 bg-bg-soft dark:bg-gray-900 shadow-md dark:shadow-lg font-body">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center px-4"
        >
          <h1 className="text-5xl font-heading font-bold text-primary dark:text-accent mb-4">
            Contact Us
          </h1>
          <p className="text-text-secondary dark:text-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
            We'd love to hear from you! Whether you have a question, feedback, or need assistance — feel free to reach out.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-bg-soft rounded-2xl shadow-md dark:shadow-lg p-10 max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-sm font-heading font-semibold text-primary dark:text-primary-dark mb-2">
                Your Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                defaultValue={user?.displayName}
                placeholder="Enter your name"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-5 py-3 text-text-main dark:text-text-main-dark font-body placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark transition focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-primary dark:text-primary-dark mb-2">
                Your Email
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                defaultValue={user?.email}
                readOnly
                placeholder="Enter your email"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-5 py-3 text-text-main dark:text-text-main-dark font-body placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark transition focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-primary dark:text-primary-dark mb-2">
                Your Message
              </label>
              <textarea
                {...register('message', { required: true })}
                placeholder="Write your message..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-2xl px-5 py-4 text-text-main dark:text-text-main-dark font-body placeholder:text-text-secondary dark:placeholder:text-text-secondary-dark resize-none h-36 transition focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent dark:bg-accent-dark hover:bg-primary dark:hover:bg-primary-dark text-white font-semibold font-body py-3 rounded-2xl shadow-md dark:shadow-lg transition"
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
          className="text-center space-y-3 text-text-secondary dark:text-text-secondary-dark px-4 font-body max-w-md mx-auto"
        >
          <p>Email: <a href="mailto:support@luxematches.com" className="text-accent dark:text-accent-dark hover:underline">support@luxematches.com</a></p>
          <p>Phone: <a href="tel:+8801234567890" className="text-accent dark:text-accent-dark hover:underline">+880 1234 567 890</a></p>
          <p>Office: Dhaka, Bangladesh</p>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
