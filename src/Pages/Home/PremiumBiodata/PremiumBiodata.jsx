import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from 'axios';

const fetchPremiumBiodatas = async () => {
    const { data } = await axios.get('/users-premium-biodata');
    return data;
};

const PremiumBiodata = () => {
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOrder, setSortOrder] = useState('asc');

    const { data: profiles = [], isLoading, isError } = useQuery({
        queryKey: ['premiumBiodata'],
        queryFn: fetchPremiumBiodatas,
    });

    const sortedProfiles = [...profiles].sort((a, b) =>
        sortOrder === 'asc' ? a.age - b.age : b.age - a.age
    );

    const visibleProfiles = sortedProfiles.slice(0, visibleCount);

    const handleViewProfile = (id) => {
        // Navigate directly to the profile
        navigate(`/user/view-bioData/${id}`);
    };

    if (isLoading) {
        return <div className="text-center py-20 font-body text-gray-600">Loading premium members...</div>;
    }

    if (isError) {
        return <div className="text-center py-20 font-body text-red-500">Failed to load biodatas. Please try again.</div>;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <h2 className="text-3xl font-heading font-semibold text-rose-600 tracking-tight">
                    Premium Members
                </h2>
                <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm font-body text-gray-700">Sort by:</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-body shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-400"
                    >
                        <option value="asc">Age: Ascending</option>
                        <option value="desc">Age: Descending</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {visibleProfiles.map((profile, index) => (
                    <motion.div
                        key={profile._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white border border-rose-100 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 text-center"
                    >
                        <img
                            src={profile.image}
                            alt={`Profile image of biodata ${profile.id}`}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border border-rose-200"
                        />
                        <h3 className="text-lg font-heading font-semibold text-gray-800">Biodata #{profile.id}</h3>
                        <p className="text-sm text-gray-600 font-body">{profile.type}</p>
                        <p className="text-sm text-gray-600 font-body">{profile.division}</p>
                        <p className="text-sm text-gray-600 font-body">
                            {profile.age} yrs • {profile.occupation}
                        </p>
                        <button
                            onClick={() => handleViewProfile(profile._id)}
                            className="mt-4 bg-rose-600 text-white px-5 py-1.5 text-sm rounded-full hover:bg-rose-700 transition font-body font-medium"
                        >
                            View Profile
                        </button>
                    </motion.div>
                ))}
            </div>

            {visibleCount < sortedProfiles.length && (
                <div className="mt-10 text-center">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="bg-rose-100 text-rose-700 font-body px-6 py-2 rounded-full hover:bg-rose-200 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
};

export default PremiumBiodata;