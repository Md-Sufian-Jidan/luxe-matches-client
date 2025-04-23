import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';

const divisions = [
    'Dhaka',
    'Chattogram',
    'Rangpur',
    'Barisal',
    'Khulna',
    'Maymansign',
    'Sylhet',
];

const mockBiodatas = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    type: i % 2 === 0 ? 'Male' : 'Female',
    image: `https://i.pravatar.cc/150?img=${i + 10}`,
    division: divisions[i % divisions.length],
    age: 20 + (i % 15),
    occupation: ['Student', 'Job', 'Housewife'][i % 3],
}));

const BioDatas = () => {
    const [genderFilter, setGenderFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');
    const [ageRange, setAgeRange] = useState([18, 40]);
    const navigate = useNavigate();

    const { user } = useAuth();

    const filtered = mockBiodatas.filter((b) => {
        return (
            (!genderFilter || b.type === genderFilter) &&
            (!divisionFilter || b.division === divisionFilter) &&
            b.age >= ageRange[0] &&
            b.age <= ageRange[1]
        );
    });

    const handleView = (id) => {
        if (!user) navigate('/login');
        else navigate(`/biodata/${id}`);
    };

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
                            value={ageRange[0]}
                            min="18"
                            max="99"
                            onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
                            className="w-1/2 border px-2 py-1 rounded"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            value={ageRange[1]}
                            min="18"
                            max="99"
                            onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
                            className="w-1/2 border px-2 py-1 rounded"
                        />
                    </div>
                </div>
            </div>

            {/* Main Biodata Cards */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(0, 20).map((profile, i) => (
                    <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-4 rounded-lg border shadow hover:shadow-md transition text-center"
                    >
                        <img
                            src={profile.image}
                            alt="profile"
                            className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">Biodata #{profile.id}</h4>
                        <p className="text-sm text-gray-600">{profile.type}</p>
                        <p className="text-sm text-gray-600">{profile.division}</p>
                        <p className="text-sm text-gray-600">{profile.age} yrs • {profile.occupation}</p>
                        <button
                            onClick={() => handleView(profile.id)}
                            className="mt-3 bg-rose-600 text-white px-4 py-1 rounded-full text-sm hover:bg-rose-700"
                        >
                            View Profile
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default BioDatas;