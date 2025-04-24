import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Pagination from '../../Components/Pagination/Pagination';

const divisions = ['Dhaka', 'Chattogram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet',];

const BioDatas = () => {
    const [genderFilter, setGenderFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [ageRange, setAgeRange] = useState([18, 40]);
    const [tempMinAge, setTempMinAge] = useState(ageRange[0]);
    const [tempMaxAge, setTempMaxAge] = useState(ageRange[1]);
    const { user, loading } = useAuth();
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: bioDatas = [], } = useQuery({
        queryKey: ['bioDatas', page, limit, genderFilter, divisionFilter, ageRange],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users-bio-data?page=${page}&limit=${limit}&gender=${genderFilter}&division=${divisionFilter}&minAge=${ageRange[0]}&maxAge=${ageRange[1]}`);
            setTotal(res.data.count);
            return res.data.users;
        },
    });

    if (loading) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-rose-500 mx-auto max-w-16"></div>

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="bg-white border p-4 rounded shadow h-fit md:sticky md:top-24">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Biodata Type</label>
                    <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="w-full border px-3 py-1 rounded text-sm"
                    >
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Division</label>
                    <select
                        value={divisionFilter}
                        onChange={(e) => setDivisionFilter(e.target.value)}
                        className="w-full border px-3 py-1 rounded text-sm"
                    >
                        <option value="">All</option>
                        {divisions.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">Age Range</label>
                    <div className="flex items-center gap-2 text-sm">
                        <input
                            type="number"
                            value={tempMinAge}
                            min="18"
                            max="99"
                            onChange={(e) => setTempMinAge(e.target.value)}
                            onBlur={() => setAgeRange([+tempMinAge || 18, ageRange[1]])}
                            className="w-1/2 border px-2 py-1 rounded"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            value={tempMaxAge}
                            min="18"
                            max="99"
                            onChange={(e) => setTempMaxAge(e.target.value)}
                            onBlur={() => setAgeRange([ageRange[0], +tempMaxAge || 99])}
                            className="w-1/2 border px-2 py-1 rounded"
                        />
                    </div>
                </div>
            </div>
            {/* Main Biodata Cards */}
            <div className='md:col-span-3'>
                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        bioDatas.length === 0 ?
                            <p className="text-center text-gray-500 col-span-3">No data available.</p> :
                            bioDatas.map((profile, i) => (
                                <motion.div
                                    key={profile._id}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                                >
                                    {/* gradient outline */}
                                    <span className="absolute inset-px rounded-[11px] bg-gradient-to-br from-rose-400/40 to-blue-400/40 opacity-0 group-hover:opacity-100 transition" />

                                    <div className="relative z-10 bg-white rounded-[11px] p-6 flex flex-col items-center text-center">
                                        <img
                                            src={profile.photoURL}
                                            alt="profile"
                                            className="w-24 h-24 rounded-full object-cover ring-2 ring-rose-400/30 mb-4"
                                        />

                                        <h4 className="text-lg font-semibold text-gray-800">
                                            Biodata #{profile.bioData.bioDataId}
                                        </h4>
                                        <p className="text-xs uppercase tracking-wide text-rose-500 font-medium">
                                            {profile.bioData.bioDataType}
                                        </p>

                                        <div className="mt-2 text-sm text-gray-600 space-y-0.5">
                                            <p>{profile.bioData.presentDivision}</p>
                                            <p>
                                                {profile.bioData.age} yrs • {profile.bioData.occupation}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleView(profile._id)}
                                            className="mt-5 inline-flex items-center gap-1 bg-rose-600 text-white px-4 py-1.5 rounded-full text-sm
   hover:bg-rose-700 transition focus:outline-none focus:ring-2 focus:ring-rose-400"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                    }

                </div>
                {/* ---------- PAGINATION ---------- */}
                <Pagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={setPage}
                />
            </div>

        </div>
    );
}

export default BioDatas;