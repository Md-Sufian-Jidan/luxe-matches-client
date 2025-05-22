import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const EditBioData = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { data: bioData, isLoading } = useQuery({
    queryKey: ['bioData'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/get-bio-data/${user?.email}`);
      setCount(res.data?.count);
      return res.data?.result;
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const editBioData = {
      bioDataId: bioData?.bioData?.bioDataId || count + 1,
      ...data,
    };
    try {
      const res = await axiosSecure.patch(`/user/bio-data-edit/${user?.email}`, editBioData);
      if (res.data.matchedCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'BioData edited successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const divisions = ['Dhaka', 'Chattogram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet'];
  const heights = ["4'8\"", "5'0\"", "5'4\"", "5'8\"", "6'0\""];
  const weights = ['45 kg', '50 kg', '55 kg', '60 kg', '70 kg', '80 kg'];
  const occupations = ['Student', 'Job', 'Housewife', 'Engineer', 'Doctor'];
  const races = ['Asian', 'Arab', 'African', 'Other'];

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-16 w-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Edit Biodata</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white dark:bg-bg-soft p-8 rounded-2xl shadow-xl dark:shadow-lg"
      >
        <h2 className="text-3xl font-heading text-primary dark:text-primary mb-8">
          {watch('biodataId') ? 'Edit Your Biodata' : 'Create Your Biodata'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-text-main dark:text-text-main"
        >
          {[
            ['Biodata Type', 'bioDataType', 'select', ['Male', 'Female']],
            ['Name', 'name', 'text'],
            ['Profile Image URL', 'image', 'url'],
            ['Date of Birth', 'dob', 'date'],
            ['Height', 'height', 'select', heights],
            ['Weight', 'weight', 'select', weights],
            ['Age', 'age', 'number'],
            ['Occupation', 'occupation', 'select', occupations],
            ['Race', 'race', 'select', races],
            ['Father’s Name', 'fathersName', 'text'],
            ['Mother’s Name', 'mothersName', 'text'],
            ['Permanent Division', 'permanentDivision', 'select', divisions],
            ['Present Division', 'presentDivision', 'select', divisions],
            ['Expected Partner Age', 'expectedPartnerAge', 'text'],
            ['Expected Partner Height', 'expectedPartnerHeight', 'select', heights],
            ['Expected Partner Weight', 'expectedPartnerWeight', 'select', weights],
            ['Mobile Number', 'mobile', 'tel'],
          ].map(([label, name, type, options]) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm text-text-secondary dark:text-text-secondary">{label} *</label>
              {type === 'select' ? (
                <select
                  {...register(name, { required: true })}
                  defaultValue={bioData?.bioData?.[name]}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-text-main dark:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent"
                >
                  <option value="">Choose...</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  defaultValue={bioData?.bioData?.[name]}
                  {...register(name, { required: true })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-secondary dark:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent"
                />
              )}
              {errors[name] && (
                <p className="text-xs text-red-500 mt-1">This field is required.</p>
              )}
            </div>
          ))}

          {/* Contact Email - ReadOnly */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-secondary dark:text-text-secondary">Your Email (readonly)</label>
            <input
              type="email"
              {...register('contactEmail')}
              defaultValue={user?.email}
              readOnly
              className="w-full px-4 py-2 rounded-xl border bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
          </div>
        </form>

        {/* Save Button */}
        <div className="mt-10 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="bg-btn dark:bg-btn text-white font-semibold px-6 py-3 rounded-2xl shadow-md dark:shadow-lg hover:bg-primary dark:hover:bg-primary transition disabled:opacity-50"
          >
            {isSubmitting ? 'Saving…' : 'Save & Publish Now'}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default EditBioData;