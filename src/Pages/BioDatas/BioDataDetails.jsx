import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCheck from '../../Hooks/useCheck';
import { Helmet } from 'react-helmet';

const BioDataDetails = () => {
    const { biodataId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [similar, setSimilar] = useState([]);
    const { isPremium } = useCheck();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: bioData } = useQuery({
        queryKey: ['bioData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/bioData-details/${id}`);
            setSimilar(res.data.similar);
            return res.data.person;
        }
    });

    const favourite = useMutation({
        mutationFn: async (bio) => {
            const payload = {
                bio,
                requestBy: {
                    email: user?.email,
                    name: user?.displayName,
                }
            };
            await axiosSecure.post(`/user/add-favourite/${bio?.email}`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["bioData"]);
        }
    });

    const handleAddToFavourites = (bio) => {
        favourite.mutate(bio, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Added!',
                    text: `${bio?.name} has been added to Favourite`,
                    icon: 'success',
                });
            },
        });
    };

    const handleContactRequest = () => {
        navigate(`/checkout/${bioData?._id}`);
    };

    if (!bioData) {
        return (
            <div className="h-16 w-16 mx-auto border-4 border-dashed rounded-full animate-spin border-accent dark:border-accent-dark"></div>
        );
    }

    return (
        <>
            <Helmet>
                <title>LuxeMatches | Biodata Details</title>
            </Helmet>

            <div className="bg-white dark:bg-gray-900 px-4 py-12 font-body">
                {/* Biodata Card */}
                <div className="bg-white dark:bg-bg-soft rounded-2xl shadow-md dark:shadow-lg p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={bioData?.bioData.image}
                            alt={bioData?.bioData.name}
                            className="w-32 h-32 rounded-full object-cover ring-4 ring-accent/10 dark:ring-accent-dark/20"
                        />
                        <div className="flex-1 space-y-2">
                            <h2 className="text-2xl font-heading text-primary dark:text-primary">
                                {bioData?.bioData.name}
                            </h2>
                            <p className="text-sm text-text-secondary dark:text-text-secondary">
                                Biodata ID: #{bioData?.bioData.bioDataId}
                            </p>
                            <p className="text-sm text-text-main dark:text-text-main">
                                {bioData?.bioData.bioDataType}, {bioData?.bioData.age} yrs • {bioData?.bioData.occupation}
                            </p>
                            <p className="text-sm text-text-main dark:text-text-main">Division: {bioData?.bioData.presentDivision}</p>
                            <p className="text-sm text-text-main dark:text-text-main">DOB: {bioData?.bioData.dob}</p>
                            <p className="text-sm text-text-main dark:text-text-main">
                                Height: {bioData?.bioData.height}, Weight: {bioData?.bioData.weight}
                            </p>
                            <p className="text-sm text-text-main dark:text-text-main">Race: {bioData?.bioData.race}</p>
                            <p className="text-sm text-text-main dark:text-text-main">
                                Father: {bioData?.bioData.fathersName}, Mother: {bioData?.bioData.mothersName}
                            </p>
                            <p className="text-sm text-text-main dark:text-text-main">
                                Expected Partner: {bioData?.bioData.expectedPartnerAge} yrs, Height {bioData?.bioData.expectedPartnerHeight}, Weight {bioData?.bioData.expectedPartnerWeight}
                            </p>

                            {isPremium ? (
                                <div className="text-sm text-accent dark:text-accent font-medium mt-2">
                                    <p>Email: {bioData?.bioData.contactEmail}</p>
                                    <p>Phone: {bioData?.bioData.mobile}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-2">
                                    Contact info is visible for premium members only.
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3 mt-4">
                                <button
                                    onClick={() => handleAddToFavourites(bioData)}
                                    className="bg-accent dark:bg-accent text-white px-4 py-2 rounded-full hover:bg-primary dark:hover:bg-primary transition"
                                >
                                    Add to Favourites
                                </button>
                                {!isPremium && (
                                    <button
                                        onClick={handleContactRequest}
                                        className="bg-accent dark:bg-accent text-white px-4 py-2 rounded-full hover:bg-primary dark:hover:bg-primary transition"
                                    >
                                        Request Contact Info
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Profiles */}
                <div className="mt-12">
                    <h3 className="text-xl font-heading text-text-main dark:text-text-main mb-4">Similar Biodatas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {similar.map((profile, i) => (
                            <motion.div
                                key={profile._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-bg-soft rounded-2xl p-5 shadow-md dark:shadow-lg text-center hover:shadow-lg dark:hover:shadow-xl transition"
                            >
                                <img
                                    src={profile.bioData.image}
                                    alt={profile.name}
                                    className="w-20 h-20 mx-auto rounded-full object-cover mb-3 ring-2 ring-accent/20 dark:ring-accent/40"
                                />
                                <h4 className="text-sm font-heading text-text-main dark:text-text-main">{profile.name}</h4>
                                <p className="text-xs text-text-secondary dark:text-text-secondary">
                                    {profile.bioData.age} yrs • {profile.bioData.occupation}
                                </p>
                                <p className="text-xs text-text-secondary dark:text-text-secondary">{profile.bioData.presentDivision}</p>
                                <Link
                                    to={`/user/view-bioData/${profile._id}`}
                                    className="mt-2 inline-block text-accent dark:text-accent text-sm hover:underline"
                                >
                                    View Profile
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BioDataDetails;
