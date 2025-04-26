import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2';

const VITE_IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_HOSTING_KEY}`

const Register = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [strength, setStrength] = useState('');
    const [color, setColor] = useState('');
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation()

    const evaluateStrength = (value) => {
        let score = 0;
        if (value.length >= 6) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[!@#$%^&*(),.?":{}|<>_\-\\[\]`~+=;'/]/.test(value)) score++;

        switch (score) {
            case 5:
                setStrength('Strong');
                setColor('bg-green-500');
                break;
            case 4:
                setStrength('Medium');
                setColor('bg-yellow-400');
                break;
            default:
                setStrength('Weak');
                setColor('bg-red-500');
                break;
        }
    };

    const onSubmit = async (data) => {
        if (data.password.length < 6) {
            return toast.error('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(data.password)) {
            return toast.error('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(data.password)) {
            return toast.error('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(data.password)) {
            return toast.error('Password must contain at least one number');
        }
        if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]`~+=;'/]/.test(data.password)) {
            return toast.error('Password must contain at least one special character');
        }

        const image_file = { image: data?.photo[0] };
        const res = await axiosPublic.post(image_hosting_api, image_file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            createUser(data.email, data.password)
                .then(result => {
                    updateUserProfile(data.name, res.data.data.display_url)
                        .then(() => {
                            const userInfo = {
                                name: data.name,
                                email: data.email,
                                photoURL: res.data.data.display_url,
                                isAdmin: false,
                                isPremium: false,
                                createdAt: new Date(),
                            };
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'User created successfully.',
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate(location?.state ? location.pathname : '/');
                                    }
                                })
                        })
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: `${err.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                })
        }

        console.log('✅ Form Data:', data);
        // TODO: send data to backend
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Helmet>
                <title>LuxeMatches | Register</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-white px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-center mb-6"
                    >
                        <Link to="/" className="text-3xl font-bold text-rose-600 flex justify-center items-center gap-2">
                            💍 <span className="font-serif">LuxeMatches</span>
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">Find your forever, elegantly.</p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1 text-black">Name</label>
                            <input
                                type="text"
                                {...register('name')}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-black">Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="w-full border rounded px-3 py-2"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-black">Password</label>
                            <input
                                type="password"
                                {...register('password')}
                                onChange={(e) => evaluateStrength(e.target.value)}
                                onPaste={(e) => e.preventDefault()}
                                onCopy={(e) => e.preventDefault()}
                                className="w-full border rounded px-3 py-2"
                            />
                            {/* Strength Meter */}
                            {strength && (
                                <div className="mt-2 flex items-center gap-3 text-sm">
                                    <div className={clsx('w-3 h-3 rounded-full', color)}></div>
                                    <span className="text-gray-700">{strength} Password</span>
                                </div>
                            )}
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-black">Photo URL</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo", { required: "Photo is required" })}
                                onChange={handleImageChange}
                                className="w-full"
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-full mt-2" />
                            )}
                            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition shadow"
                        >
                            Register
                        </motion.button>

                        <p className="text-sm text-gray-600 text-center">
                            Already have an account? <Link to="/login" className="text-rose-600 underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;