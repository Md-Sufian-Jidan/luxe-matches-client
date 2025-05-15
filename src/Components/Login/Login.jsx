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
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'User logged in successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
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
        await axiosPublic.post('/users', userInfo);
        Swal.fire({
          title: 'Success',
          text: 'User logged in successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(location?.state ? location.pathname : '/');
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-soft px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 flex flex-col"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mb-8 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 justify-center text-primary font-heading text-4xl select-none"
            aria-label="LuxeMatches Home"
          >
            💍 <span>LuxeMatches</span>
          </Link>
          <p className="mt-2 text-text-secondary font-body text-sm">Welcome back to love, elegantly.</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 font-heading text-text-main text-lg"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email', { required: 'Email is required' })}
              className="font-body text-text-main rounded-2xl border border-primary px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-body">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="mb-2 font-heading text-text-main text-lg"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password', { required: 'Password is required' })}
              className="font-body text-text-main rounded-2xl border border-primary px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-[52px] text-text-secondary hover:text-accent transition"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 font-body">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-primary text-white font-heading rounded-2xl py-3 shadow-md hover:bg-accent transition"
          >
            Login
          </motion.button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-text-secondary font-body text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="text-primary font-heading underline hover:text-accent transition"
          >
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="relative my-8 text-text-secondary font-body text-sm text-center before:absolute before:top-1/2 before:left-6 before:right-6 before:h-px before:bg-primary/20">
          <span className="relative bg-bg-soft px-4">or</span>
        </div>

        {/* Google Login Button */}
        <motion.button
          type="button"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.03 }}
          className="flex items-center justify-center gap-3 w-full rounded-2xl border border-primary py-3 font-body text-text-main shadow-sm hover:border-accent hover:text-accent transition"
        >
          <FcGoogle size={24} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;