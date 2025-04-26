import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BioDatas = () => {
    const divisions = ['Dhaka', 'Chattogram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet'];
    const [genderFilter, setGenderFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [ageRange, setAgeRange] = useState([18, 40]);
    const [tempMinAge, setTempMinAge] = useState(ageRange[0]);
    const [tempMaxAge, setTempMaxAge] = useState(ageRange[1]);
    const axiosSecure = useAxiosSecure();

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 10;
    const numberOfPages = Math.ceil(total / limit);

    const pages = [...Array(numberOfPages).keys()];

    const { data: bioDatas = [], isLoading } = useQuery({
        queryKey: ['bioDatas', page, limit, genderFilter, divisionFilter, ageRange],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-bio-data`, {
                params: {
                    page,
                    limit,
                    gender: genderFilter,
                    division: divisionFilter,
                    minAge: ageRange[0],
                    maxAge: ageRange[1]
                }
            });
            setTotal(res.data.count);
            return res.data.users;
        },
    });

    if (isLoading) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-rose-500 mx-auto max-w-16"></div>

    return (
        <>
            <Helmet>
                <title>LuxeMatches | Biodatas</title>
            </Helmet>
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
                                isLoading ? <p className="text-center text-gray-500 col-span-3">Loading...</p> :
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

                                                <Link
                                                    to={`/user/view-bioData/${profile?._id}`}
                                                    className="mt-5 inline-flex items-center gap-1 bg-rose-600 text-white px-4 py-1.5 rounded-full text-sm
   hover:bg-rose-700 transition focus:outline-none focus:ring-2 focus:ring-rose-400"
                                                >
                                                    View Profile
                                                </Link>
                                            </div>
                                        </motion.div>
                                    ))
                        }

                    </div>
                    {/* ---------- PAGINATION ---------- */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6">
                        {/* caption */}
                        <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                            Showing&nbsp;
                            {(page - 1) * limit + 1}‑{Math.min(page * limit, total)}&nbsp;
                            of&nbsp;{total}
                        </p>

                        {/* pager */}
                        <ul className="inline-flex items-center border rounded bg-white shadow-sm text-sm">
                            {/* prev */}
                            <li>
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-2 py-1 disabled:text-gray-400"
                                >
                                    ‹
                                </button>
                            </li>

                            {/* page numbers */}
                            {pages.map((p) => (
                                <li key={p}>
                                    <button
                                        onClick={() => setPage(p + 1)}
                                        className={clsx(
                                            'px-2 py-1 rounded',
                                            p + 1 === page
                                                ? 'bg-blue-50 text-blue-600'
                                                : 'hover:bg-gray-100'
                                        )}
                                    >
                                        {p + 1}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    disabled={page === numberOfPages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-2 py-1 disabled:text-gray-400"
                                >
                                    ›
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default BioDatas;