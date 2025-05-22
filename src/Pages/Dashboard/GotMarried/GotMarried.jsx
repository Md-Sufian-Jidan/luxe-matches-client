import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const GotMarried = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const marriageDetails = {
      maleId: +data.selfId,
      femaleId: +data.partnerId,
      image: data.image,
      review: data.review,
      marriageDate: data.marriageDate
    };
    await axiosSecure.post('/user/success-stories', { ...marriageDetails })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your Message is saved.",
          icon: "success",
          confirmButtonColor: '#4B1D3F'
        });
      });
    setSuccess(true);
    setTimeout(() => navigate('/'), 1500); // redirect to home
  };

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Got Married</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg mx-auto bg-white dark:bg-bg-soft rounded-2xl shadow-lg dark:shadow-xl p-8 font-body"
      >
        <h1 className="text-3xl font-heading text-primary dark:text-primary mb-8 text-center">
          Share Your Success Story
        </h1>

        {success ? (
          <p className="text-accent font-medium text-center text-lg">
            🎉 Thank you! Your story is pending review.
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Self ID */}
            <div>
              <label
                htmlFor="selfId"
                className="block font-heading text-text-main dark:text-text-secondary mb-2"
              >
                Your Biodata ID <span className="text-accent dark:text-accent">*</span>
              </label>
              <input
                id="selfId"
                type="number"
                {...register('selfId', { required: 'Enter your biodata ID' })}
                className="w-full rounded-2xl border border-text-secondary dark:border-gray-700 px-4 py-3 font-body text-text-main dark:text-text-secondary placeholder:text-text-secondary dark:placeholder:text-text-secondary bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                placeholder="Enter your ID"
              />
              {errors.selfId && (
                <p className="text-xs text-red-500 mt-1">{errors.selfId.message}</p>
              )}
            </div>

            {/* Partner ID */}
            <div>
              <label
                htmlFor="partnerId"
                className="block font-heading text-text-main dark:text-text-secondary mb-2"
              >
                Partner Biodata ID <span className="text-accent dark:text-accent">*</span>
              </label>
              <input
                id="partnerId"
                type="number"
                {...register('partnerId', { required: 'Enter partner biodata ID' })}
                className="w-full rounded-2xl border border-text-secondary dark:border-gray-700 px-4 py-3 font-body text-text-main dark:text-text-secondary placeholder:text-text-secondary dark:placeholder:text-text-secondary bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                placeholder="Enter partner ID"
              />
              {errors.partnerId && (
                <p className="text-xs text-red-500 mt-1">{errors.partnerId.message}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block font-heading text-text-main dark:text-text-secondary mb-2"
              >
                Couple Image URL <span className="text-accent dark:text-accent">*</span>
              </label>
              <input
                id="image"
                type="url"
                {...register('image', { required: 'Image link required' })}
                className="w-full rounded-2xl border border-text-secondary dark:border-gray-700 px-4 py-3 font-body text-text-main dark:text-text-secondary placeholder:text-text-secondary dark:placeholder:text-text-secondary bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>
              )}
            </div>

            {/* Marriage Date */}
            <div>
              <label
                htmlFor="marriageDate"
                className="block font-heading text-text-main dark:text-text-secondary mb-2"
              >
                Marriage Date <span className="text-accent dark:text-accent">*</span>
              </label>
              <input
                id="marriageDate"
                type="date"
                {...register('marriageDate', { required: 'Select a date' })}
                className="w-full rounded-2xl border border-text-secondary dark:border-gray-700 px-4 py-3 font-body text-text-main dark:text-text-secondary bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
              />
              {errors.marriageDate && (
                <p className="text-xs text-red-500 mt-1">{errors.marriageDate.message}</p>
              )}
            </div>

            {/* Review */}
            <div>
              <label
                htmlFor="review"
                className="block font-heading text-text-main dark:text-text-secondary mb-2"
              >
                Your Story <span className="text-accent dark:text-accent">*</span>
              </label>
              <textarea
                id="review"
                rows={5}
                {...register('review', { required: 'Share your feelings' })}
                placeholder="We met on LuxeMatches and..."
                className="w-full rounded-2xl border border-text-secondary dark:border-gray-700 px-4 py-3 font-body text-text-main dark:text-text-secondary placeholder:text-text-secondary dark:placeholder:text-text-secondary bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition resize-none"
              />
              {errors.review && (
                <p className="text-xs text-red-500 mt-1">{errors.review.message}</p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-btn dark:bg-btn text-white py-3 rounded-2xl font-heading text-lg shadow-md dark:shadow-lg hover:bg-accent dark:hover:bg-accent disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Story'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </>
  );
};

export default GotMarried;