import { useForm, Controller } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
import Select from 'react-select';
import { motion } from 'framer-motion';

// ----- CONSTANTS -----
const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];
const divisionOptions = [
    'Dhaka', 'Chattogram', 'Rangpur', 'Barisal',
    'Khulna', 'Maymansign', 'Sylhet',
].map((d) => ({ label: d, value: d }));
const heightOpt = ['4\'8"', '5\'0"', '5\'4"', '5\'8"', '6\'0"'].map((h) => ({ label: h, value: h }));
const weightOpt = ['45 kg', '55 kg', '65 kg', '75 kg'].map((w) => ({ label: w, value: w }));
const occOpt = ['Student', 'Job', 'Housewife'].map((o) => ({ label: o, value: o }));
const raceOpt = ['Asian', 'Arab', 'Caucasian', 'African'].map((r) => ({ label: r, value: r }));

// ----- ZOD SCHEMA -----
// const schema = z.object({
//   biodataType: z.string(),
//   name: z.string().min(2),
//   photo: z.string().url({ message: 'Must be a valid URL' }),
//   dob: z.string(),
//   height: z.string(),
//   weight: z.string(),
//   age: z.number().min(18),
//   occupation: z.string(),
//   race: z.string(),
//   fathersName: z.string().min(2),
//   mothersName: z.string().min(2),
//   permanentDivision: z.string(),
//   presentDivision: z.string(),
//   expPartnerAge: z.string(),
//   expPartnerHeight: z.string(),
//   expPartnerWeight: z.string(),
//   contactEmail: z.string().email(),
//   mobile: z.string().min(10),
// });

const EditBioData = () => {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();
    // {
    //     resolver: zodResolver(schema),
    //     defaultValues: {
    //         ...defaultValues,
    //         contactEmail: user.email,    // readonly
    //     },
    // }

    const onSubmit = async (data) => {
        /* 🔄 call POST / PUT endpoint */
        console.log(data);
    };

    // Quick error helper
    const err = (k) => errors[k]?.message;

    return (
        <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-rose-600 mb-2">Edit Biodata</h2>

            {/* 2‑column grid */}
            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label className="font-medium">Biodata Type *</label>
                    <Controller
                        name="biodataType"
                        control={control}
                        render={({ field }) =>
                            <Select options={genderOptions} {...field} />
                        }
                    />
                    <span className="text-xs text-red-500">{err('biodataType')}</span>
                </div>

                <div>
                    <label className="font-medium">Name *</label>
                    <input {...register('name')} className="input" />
                    <span className="error">{err('name')}</span>
                </div>

                <div>
                    <label className="font-medium">Profile Image URL *</label>
                    <input {...register('photo')} className="input" />
                    <span className="error">{err('photo')}</span>
                </div>

                <div>
                    <label className="font-medium">Date of Birth *</label>
                    <input type="date" {...register('dob')} className="input" />
                    <span className="error">{err('dob')}</span>
                </div>

                <div>
                    <label className="font-medium">Height *</label>
                    <Controller
                        name="height"
                        control={control}
                        render={({ field }) => <Select options={heightOpt} {...field} />}
                    />
                    <span className="error">{err('height')}</span>
                </div>

                <div>
                    <label className="font-medium">Weight *</label>
                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => <Select options={weightOpt} {...field} />}
                    />
                    <span className="error">{err('weight')}</span>
                </div>

                <div>
                    <label className="font-medium">Age *</label>
                    <input type="number" {...register('age', { valueAsNumber: true })} className="input" />
                    <span className="error">{err('age')}</span>
                </div>

                <div>
                    <label className="font-medium">Occupation *</label>
                    <Controller
                        name="occupation"
                        control={control}
                        render={({ field }) => <Select options={occOpt} {...field} />}
                    />
                    <span className="error">{err('occupation')}</span>
                </div>

                <div>
                    <label className="font-medium">Race *</label>
                    <Controller
                        name="race"
                        control={control}
                        render={({ field }) => <Select options={raceOpt} {...field} />}
                    />
                    <span className="error">{err('race')}</span>
                </div>

                <div>
                    <label className="font-medium">Father's Name *</label>
                    <input {...register('fathersName')} className="input" />
                    <span className="error">{err('fathersName')}</span>
                </div>

                <div>
                    <label className="font-medium">Mother's Name *</label>
                    <input {...register('mothersName')} className="input" />
                    <span className="error">{err('mothersName')}</span>
                </div>

                <div>
                    <label className="font-medium">Permanent Division *</label>
                    <Controller
                        name="permanentDivision"
                        control={control}
                        render={({ field }) => <Select options={divisionOptions} {...field} />}
                    />
                    <span className="error">{err('permanentDivision')}</span>
                </div>

                <div>
                    <label className="font-medium">Present Division *</label>
                    <Controller
                        name="presentDivision"
                        control={control}
                        render={({ field }) => <Select options={divisionOptions} {...field} />}
                    />
                    <span className="error">{err('presentDivision')}</span>
                </div>

                <div>
                    <label className="font-medium">Expected Partner Age</label>
                    <input {...register('expPartnerAge')} className="input" />
                </div>

                <div>
                    <label className="font-medium">Expected Partner Height *</label>
                    <Controller
                        name="expPartnerHeight"
                        control={control}
                        render={({ field }) => <Select options={heightOpt} {...field} />}
                    />
                </div>

                <div>
                    <label className="font-medium">Expected Partner Weight *</label>
                    <Controller
                        name="expPartnerWeight"
                        control={control}
                        render={({ field }) => <Select options={weightOpt} {...field} />}
                    />
                </div>

                <div>
                    <label className="font-medium">Contact Email (readonly)</label>
                    <input disabled {...register('contactEmail')} className="input bg-gray-100" />
                </div>

                <div>
                    <label className="font-medium">Mobile Number *</label>
                    <input {...register('mobile')} className="input" />
                    <span className="error">{err('mobile')}</span>
                </div>
            </div>

            {/*  Save button */}
            <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-rose-600 text-white px-6 py-2 rounded-md shadow hover:bg-rose-700"
            >
                Save &amp; Publish Now
            </motion.button>
        </motion.form>
    );
}

/* Tailwind helpers */
const input = `
  w-full border rounded px-3 py-2 text-sm focus:outline-rose-400
`;

export default EditBioData