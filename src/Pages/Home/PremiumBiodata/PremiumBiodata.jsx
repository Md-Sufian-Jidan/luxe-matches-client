import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const mockData = [
    {
        id: 1,
        type: 'Female',
        img: 'https://i.pravatar.cc/300?img=5',
        division: 'Dhaka',
        age: 25,
        occupation: 'Job',
    },
    {
        id: 2,
        type: 'Male',
        img: 'https://i.pravatar.cc/300?img=12',
        division: 'Sylhet',
        age: 30,
        occupation: 'Engineer',
    },
    // ...Add 4 more
];

const PremiumBiodata = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    const sortedData = [...mockData].sort((a, b) =>
        sortOrder === 'asc' ? a.age - b.age : b.age - a.age
    );

    const handleViewProfile = (id) => {
        const isLoggedIn = true; // TODO: Replace with real auth logic
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate(`/biodata/${id}`);
        }
    };

    return (
        <div>
            {/* Sorting Dropdown */}
            <div className="flex justify-end max-w-6xl mx-auto px-4 mt-6">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                >
                    <option value="asc">Sort by Age: Ascending</option>
                    <option value="desc">Sort by Age: Descending</option>
                </select>
            </div>

            {/* Premium Member Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-10">
                {sortedData.map((profile, i) => (
                    <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={profile.img}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Biodata #{profile.id} • {profile.type}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{profile.division}</p>
                        <p className="text-sm text-gray-600">{profile.age} yrs • {profile.occupation}</p>
                        <button
                            onClick={() => handleViewProfile(profile.id)}
                            className="mt-4 bg-rose-600 text-white px-4 py-1 rounded-full hover:bg-rose-700 transition"
                        >
                            View Profile
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PremiumBiodata;