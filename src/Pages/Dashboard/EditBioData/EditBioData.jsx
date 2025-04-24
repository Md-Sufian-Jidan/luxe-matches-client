import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query'

// 🔸 Mock fetch helpers – replace with real API calls
const fetchExistingBiodata = async () => null;          // GET /api/biodata/me
const saveOrUpdateBiodata = async (data) => console.log('Sent →', data);

const EditBioData = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, },
    } = useForm({
        defaultValues: {
            bioDataType: '',
            name: '',
            image: '',
            dob: '',
            height: '',
            weight: '',
            age: '',
            occupation: '',
            race: '',
            fathersName: '',
            mothersName: '',
            permanentDivision: '',
            presentDivision: '',
            expectedPartnerAge: '',
            expectedPartnerHeight: '',
            expectedPartnerWeight: '',
            contactEmail: user?.email,
            mobile: ''
        }
    });
    const { data: bioData, isLoading } = useQuery({
        queryKey: ['bioData'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/get-bio-data/${user?.email}`);
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const bioData = {
            bioDataId: bioData.bioData.bioDataId + 1,
            bioDataType: data.bioDataType,
            name: data.name,
            image: data.image,
            dob: data.dob,
            height: data.height,
            weight: data.weight,
            age: data.age,
            occupation: data.occupation,
            race: data.race,
            fathersName: data.fathersName,
            mothersName: data.mothersName,
            permanentDivision: data.permanentDivision,
            presentDivision: data.presentDivision,
            expectedPartnerAge: data.expectedPartnerAge,
            expectedPartnerHeight: data.expectedPartnerHeight,
            expectedPartnerWeight: data.expectedPartnerWeight,
            contactEmail: data.contactEmail,
            mobile: data.mobile,
        };
        axiosSecure.patch(`/bio-data-edit/${user?.email}`, bioData)
            .then(res => {
                console.log(res.data);
                if (res.data.matchedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'BioData edited successfully.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                    setIsSubmitting(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const divisions = ['Dhaka', 'Chattogram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet',];
    const heights = ["4'8\"", "5'0\"", "5'4\"", "5'8\"", "6'0\""];
    const weights = ['45 kg', '50 kg', '55 kg', '60 kg', '70 kg', '80 kg'];
    const occupations = ['Student', 'Job', 'Housewife', 'Engineer', 'Doctor'];
    const races = ['Asian', 'Arab', 'African', 'Other'];

    if (isLoading) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-rose-500 mx-auto max-w-16"></div>

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8"
        >
            <h2 className="text-2xl font-bold text-rose-600 mb-6">
                {watch('biodataId') ? 'Edit Your Biodata' : 'Create Your Biodata'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Biodata Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Biodata Type *</label>
                    <select
                        {...register('bioDataType', { required: 'Select Male or Female' })}
                        className="w-full border rounded px-3 py-2"
                        defaultValue={bioData?.bioData?.bioDataType}
                    >
                        <option value="">Choose...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.bioDataType && <p className="text-red-500 text-xs">{errors.bioDataType.message}</p>}
                </div>
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name required' })}
                        className="w-full border rounded px-3 py-2"
                        defaultValue={bioData?.bioData?.name}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                {/* Profile Image */}
                <div>
                    <label className="block text-sm font-medium mb-1">Profile Image URL *</label>
                    <input
                        type="url"
                        defaultValue={bioData.bioData.image}
                        {...register('image', { required: 'Image link required' })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
                </div>
                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                    <input
                        type="date"
                        {...register('dob', { required: 'Select DOB' })}
                        className="w-full border rounded px-3 py-2"
                        defaultValue={bioData.bioData.dob}
                    />
                    {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                </div>
                {/* Height */}
                <div>
                    <label className="block text-sm font-medium mb-1">Height *</label>
                    <select
                        {...register('height', { required: 'Height required' })}
                        defaultValue={bioData.bioData.height}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {heights.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                    {errors.height && <p className="text-red-500 text-xs">{errors.height.message}</p>}
                </div>
                {/* Weight */}
                <div>
                    <label className="block text-sm font-medium mb-1">Weight *</label>
                    <select
                        defaultValue={bioData.bioData.weight}
                        {...register('weight', { required: 'Weight required' })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {weights.map((w) => (
                            <option key={w}>{w}</option>
                        ))}
                    </select>
                    {errors.weight && <p className="text-red-500 text-xs">{errors.weight.message}</p>}
                </div>
                {/* Age */}
                <div>
                    <label className="block text-sm font-medium mb-1">Age *</label>
                    <input
                        defaultValue={bioData.bioData.age}
                        type="number"
                        {...register('age', { required: 'Age required', min: 18, max: 99 })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.age && <p className="text-red-500 text-xs">{errors.age.message}</p>}
                </div>
                {/* Occupation */}
                <div>
                    <label className="block text-sm font-medium mb-1">Occupation *</label>
                    <select
                        defaultValue={bioData.bioData.occupation}
                        {...register('occupation', { required: 'Occupation required' })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {occupations.map((o) => (
                            <option key={o}>{o}</option>
                        ))}
                    </select>
                    {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation.message}</p>}
                </div>
                {/* Race */}
                <div>
                    <label className="block text-sm font-medium mb-1">Race *</label>
                    <select
                        defaultValue={bioData.bioData.race}
                        {...register('race', { required: 'Race required' })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {races.map((r) => (
                            <option key={r}>{r}</option>
                        ))}
                    </select>
                    {errors.race && <p className="text-red-500 text-xs">{errors.race.message}</p>}
                </div>
                {/* Fathers & Mothers Names */}
                <div>
                    <label className="block text-sm font-medium mb-1">Father’s Name *</label>
                    <input
                        defaultValue={bioData.bioData.fathersName}
                        type="text"
                        {...register('fathersName', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Mother’s Name *</label>
                    <input
                        defaultValue={bioData.bioData.mothersName}
                        type="text"
                        {...register('mothersName', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                {/* Divisions */}
                <div>
                    <label className="block text-sm font-medium mb-1">Permanent Division *</label>
                    <select
                        defaultValue={bioData.bioData.permanentDivision}
                        {...register('permanentDivision', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {divisions.map((d) => (
                            <option key={d}>{d}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Present Division *</label>
                    <select
                        defaultValue={bioData.bioData.presentDivision}
                        {...register('presentDivision', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {divisions.map((d) => (
                            <option key={d}>{d}</option>
                        ))}
                    </select>
                </div>
                {/* Partner Expectations */}
                <div>
                    <label className="block text-sm font-medium mb-1">Expected Partner Age *</label>
                    <input
                        defaultValue={bioData.bioData.expectedPartnerAge}
                        type="text"
                        {...register('expectedPartnerAge', { required: true })}
                        placeholder="e.g. 25‑32"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Expected Partner Height *</label>
                    <select
                        defaultValue={bioData.bioData.expectedPartnerHeight}
                        {...register('expectedPartnerHeight', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {heights.map((h) => (
                            <option key={h}>{h}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Expected Partner Weight *</label>
                    <select
                        defaultValue={bioData.bioData.expectedPartnerWeight}
                        {...register('expectedPartnerWeight', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Choose...</option>
                        {weights.map((w) => (
                            <option key={w}>{w}</option>
                        ))}
                    </select>
                </div>
                {/* Contact Email (readonly) */}
                <div>
                    <label className="block text-sm font-medium mb-1">Your Email (readonly)</label>
                    <input
                        type="email"
                        {...register('contactEmail')}
                        defaultValue={user?.email}
                        className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                </div>
                {/* Mobile */}
                <div>
                    <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                    <input
                        defaultValue={bioData.bioData.mobile}
                        type="tel"
                        {...register('mobile', { required: true })}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
            </form>
            {/* Footer Buttons */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="bg-rose-600 text-white px-6 py-2 rounded hover:bg-rose-700 disabled:opacity-60 transition"
                >
                    {isSubmitting ? 'Saving…' : 'Save & Publish Now'}
                </button>
            </div>
        </motion.div>
    );
}

export default EditBioData;