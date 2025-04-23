import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const premiumProfiles = [
    {
        id: 1,
        type: 'Female',
        image: 'https://i.pravatar.cc/150?img=5',
        division: 'Dhaka',
        age: 23,
        occupation: 'Student',
    },
    {
        id: 2,
        type: 'Male',
        image: 'https://i.pravatar.cc/150?img=12',
        division: 'Chattogram',
        age: 30,
        occupation: 'Engineer',
    },
    {
        id: 3,
        type: 'Female',
        image: 'https://i.pravatar.cc/150?img=48',
        division: 'Sylhet',
        age: 28,
        occupation: 'Housewife',
    },
    {
        id: 4,
        type: 'Female',
        image: 'https://i.pravatar.cc/150?img=19',
        division: 'Khulna',
        age: 34,
        occupation: 'Doctor',
    },
    {
        id: 5,
        type: 'Female',
        image: 'https://i.pravatar.cc/150?img=22',
        division: 'Barisal',
        age: 26,
        occupation: 'Job',
    },
    {
        id: 6,
        type: 'Male',
        image: 'https://i.pravatar.cc/150?img=15',
        division: 'Rangpur',
        age: 29,
        occupation: 'Student',
    },
];

const PremiumBiodata = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const navigate = useNavigate();

    const handleViewProfile = (id) => {
        const isLoggedIn = false; // Replace with actual auth check
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate(`/biodata/${id}`);
        }
    };

    const sortedProfiles = [...premiumProfiles].sort((a, b) =>
        sortOrder === 'asc' ? a.age - b.age : b.age - a.age
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-rose-600">Premium Members</h2>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border rounded px-3 py-1 text-sm"
                >
                    <option value="asc">Age: Ascending</option>
                    <option value="desc">Age: Descending</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProfiles.map((profile, index) => (
                    <motion.div
                        key={profile.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                    >
                        <img
                            src={profile.image}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-3"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                            Biodata #{profile.id}
                        </h3>
                        <p className="text-sm text-gray-600">{profile.type}</p>
                        <p className="text-sm text-gray-600">{profile.division}</p>
                        <p className="text-sm text-gray-600">
                            {profile.age} yrs • {profile.occupation}
                        </p>
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
}

export default PremiumBiodata;