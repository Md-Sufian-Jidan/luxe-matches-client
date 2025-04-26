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
            .then(res => {
                Swal.fire({
                    title: "Success!",
                    text: "Your Message is saved.",
                    icon: "success"
                });
            })
        setSuccess(true);
        setTimeout(() => navigate('/'), 1500); // kick to home where story will appear
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
                className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8"
            >
                <h1 className="text-2xl font-bold text-rose-600 mb-6">Share Your Success Story</h1>

                {success ? (
                    <p className="text-emerald-600 font-medium">🎉 Thank you! Your story is pending review.</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Self ID */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Biodata ID *</label>
                            <input
                                type="number"
                                {...register('selfId', { required: 'Enter your biodata ID' })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.selfId && <p className="text-xs text-red-500">{errors.selfId.message}</p>}
                        </div>

                        {/* Partner ID */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Partner Biodata ID *</label>
                            <input
                                type="number"
                                {...register('partnerId', { required: 'Enter partner biodata ID' })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.partnerId && <p className="text-xs text-red-500">{errors.partnerId.message}</p>}
                        </div>

                        {/* Image link */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Couple Image URL *</label>
                            <input
                                type="url"
                                {...register('image', { required: 'Image link required' })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.image && <p className="text-xs text-red-500">{errors.image.message}</p>}
                        </div>
                        {/* marriage date */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Marriage Date *</label>
                            <input
                                type="date"
                                {...register('marriageDate', {
                                    required: 'Select a date'
                                })}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.marriageDate && (
                                <p className="text-xs text-red-500">
                                    {errors.marriageDate.message}
                                </p>
                            )}
                        </div>
                        {/* Review */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Your Story *</label>
                            <textarea
                                rows={4}
                                {...register('review', { required: 'Share your feelings' })}
                                className="w-full border rounded px-3 py-2"
                                placeholder="We met on LuxeMatches and..."
                            />
                            {errors.review && <p className="text-xs text-red-500">{errors.review.message}</p>}
                        </div>

                        {/* Submit */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 disabled:opacity-60"
                        >
                            {isSubmitting ? 'Submitting…' : 'Submit Story'}
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </>
    );
}

export default GotMarried;