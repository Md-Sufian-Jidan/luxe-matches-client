import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Login successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(async (result) => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    isAdmin: false,
                    isPremium: false,
                    createdAt: new Date(),
                };
                await axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            title: "Success",
                            text: "User Login Successfully",
                            icon: "success"
                        });
                        navigate(location?.state ? location.pathname : '/');
                    }
                    );
            })
            .catch(res => {
                console.log(res);
            });
    };

    return (
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
                    <p className="text-sm text-gray-500 mt-1">Welcome back to love, elegantly.</p>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full border rounded px-3 py-2 focus:outline-rose-400"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { required: 'Password is required' })}
                                className="w-full border rounded px-3 py-2 focus:outline-rose-400 pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-2.5 text-gray-500 hover:text-rose-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition shadow"
                    >
                        Login
                    </motion.button>

                    <p className="text-sm text-gray-600 text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-rose-600 underline">Register</Link>
                    </p>
                </form>

                {/* Divider */}
                <div className="text-center text-gray-400 text-sm my-2">or</div>

                {/* Google Login Button */}
                <motion.button
                    type="button"
                    onClick={handleGoogleLogin}
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-md text-gray-700 hover:border-rose-500 transition"
                >
                    <FcGoogle size={20} />
                    Continue with Google
                </motion.button>

            </div>
        </div>
    );
}

export default Login;