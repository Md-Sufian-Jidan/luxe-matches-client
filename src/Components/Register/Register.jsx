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
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_HOSTING_KEY}`;

const Register = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { createUser, updateUserProfile } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [strength, setStrength] = useState('');
  const [color, setColor] = useState('');
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

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

    const formData = new FormData();
    formData.append('image', data.photo[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { 'content-type': 'multipart/form-data' }
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
                  });
              });
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: `${err.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    } catch (error) {
      toast.error('Image upload failed. Please try again.');
    }
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
      <div className="min-h-screen flex items-center justify-center bg-bg-soft dark:bg-gray-900 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white dark:bg-bg-soft rounded-2xl shadow-lg p-10"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-flex justify-center items-center gap-2 text-primary dark:text-accent font-heading text-3xl font-bold select-none">
              💍 <span className="font-serif">LuxeMatches</span>
            </Link>
            <p className="mt-2 text-text-secondary font-body text-sm">
              Find your forever, elegantly.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-heading text-primary font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={clsx(
                  'w-full rounded-2xl border border-gray-300 px-4 py-3 text-text-main dark:text-text-secondary font-body placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition',
                  errors.name && 'border-red-500'
                )}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-heading text-primary font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className={clsx(
                  'w-full rounded-2xl border border-gray-300 px-4 py-3 text-text-main dark:text-text-secondary font-body placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition',
                  errors.email && 'border-red-500'
                )}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block font-heading text-primary font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                onChange={(e) => evaluateStrength(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                className={clsx(
                  'w-full rounded-2xl border border-gray-300 px-4 py-3 text-text-main dark:text-text-secondary font-body placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent transition',
                  errors.password && 'border-red-500'
                )}
                placeholder="Create a strong password"
              />
              {strength && (
                <div className="mt-2 flex items-center gap-3 text-sm font-body text-text-secondary select-none">
                  <div className={clsx('w-3 h-3 rounded-full', color)}></div>
                  <span>{strength} Password</span>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block font-heading text-primary font-semibold mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                {...register('photo', { required: 'Photo is required' })}
                onChange={handleImageChange}
                className={clsx(
                  'w-full text-text-main dark:text-text-secondary font-body',
                  errors.photo && 'border-red-500'
                )}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full mt-3 object-cover mx-auto"
                />
              )}
              {errors.photo && (
                <p className="mt-1 text-sm text-red-500">{errors.photo.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-btn text-white py-3 rounded-2xl shadow-md font-body font-semibold hover:bg-accent transition"
            >
              Register
            </motion.button>

            <p className="text-center text-text-secondary text-sm font-body mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-accent underline hover:text-primary transition">
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Register;