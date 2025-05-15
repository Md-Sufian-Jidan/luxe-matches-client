import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAuth from '../../../Hooks/useAuth';

const PremiumBiodata = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortOrder, setSortOrder] = useState('asc');

    const { data: profiles = [], isLoading, isError } = useQuery({
        queryKey: ['premiumBiodata'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/users-premium-biodata');
            return data;
        },
    });

    const sortedProfiles = [...profiles].sort((a, b) =>
        sortOrder === 'asc' ? a.bioData.age - b.bioData.age : b.bioData.age - a.bioData.age
    );

    const visibleProfiles = sortedProfiles.slice(0, visibleCount);

    const handleViewProfile = (id) => {
        user ? navigate(`/user/view-bioData/${id}`) : navigate('/login');
    };

    if (isLoading)
        return (
            <div className="text-center py-20 font-body text-lg text-text-secondary">
                Loading...
            </div>
        );
    if (isError)
        return (
            <div className="text-center py-20 font-body text-red-500">
                Error loading biodatas.
            </div>
        );

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                <h2 className="text-4xl font-heading text-primary font-semibold tracking-tight">
                    Premium Members
                </h2>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-full px-8 py-2 text-sm font-body text-text-main focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="asc">Age: Ascending</option>
                    <option value="desc">Age: Descending</option>
                </select>
            </div>

            {/* Biodata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {visibleProfiles.map((profile, index) => (
                    <motion.div
                        key={profile._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.03 }}
                        className="bg-white border border-rose-100 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 text-center"
                    >
                        <img
                            src={profile?.photoURL}
                            alt={`Biodata ${profile?.photoURL}`}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-accent"
                        />
                        <h3 className="text-xl font-heading text-text-main font-semibold mb-1">
                            Biodata #{profile?.bioData?.bioDataId}
                        </h3>
                        <p className="text-sm text-text-secondary font-body">{profile?.type}</p>
                        <p className="text-sm text-text-secondary font-body">{profile?.division}</p>
                        <p className="text-sm text-text-secondary font-body">
                            {profile?.bioData?.age} yrs &bull; {profile?.bioData?.occupation}
                        </p>
                        <button
                            onClick={() => handleViewProfile(profile?._id)}
                            className="mt-5 inline-block bg-accent text-white px-6 py-2 rounded-full text-sm font-body hover:bg-opacity-90 transition"
                        >
                            View Profile
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Load More */}
            {visibleCount < sortedProfiles.length && (
                <div className="mt-12 text-center">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="bg-accent text-primary font-body px-8 py-2.5 rounded-full hover:bg-rose-200 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
};

export default PremiumBiodata;