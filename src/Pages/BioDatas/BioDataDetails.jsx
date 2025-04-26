import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useCheck from '../../Hooks/useCheck'
import { Helmet } from 'react-helmet';

const BioDataDetails = () => {
    const { biodataId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [similar, setSimilar] = useState([]);
    const { isPremium } = useCheck()
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: bioData, } = useQuery({
        queryKey: ['bioData', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/bioData-details/${id}`);
            setSimilar(res.data.similar);
            return res.data.person;
        }
    });

    const favourite = useMutation({
        mutationFn: async (bio) => {
            const favouriteBioData = {
                bio,
                requestBy: {
                    email: user?.email,
                    name: user?.displayName,
                },
            };
            await axiosSecure.post(`/user/add-favourite/${bio?.email}`, favouriteBioData);
        },
        onSuccess: () => queryClient.invalidateQueries(["bioData"]),
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

    if (!bioData) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-rose-500 mx-auto max-w-16"></div>;

    return (
        <>
            <Helmet>
                <title>LuxeMatches | Biodata Details</title>
            </Helmet>
            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Main Info */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={bioData?.bioData.image}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="flex-1 space-y-2">
                            <h2 className="text-2xl font-bold text-gray-800">{bioData?.bioData.name}</h2>
                            <p className="text-gray-600">Biodata ID: #{bioData?.bioData.bioDataId}</p>
                            <p className="text-gray-600">{bioData?.bioData.bioDataType}, {bioData?.bioData.age} yrs • {bioData?.bioData.occupation}</p>
                            <p className="text-gray-600">Division: {bioData?.bioData.presentDivision}</p>
                            <p className="text-gray-600">DOB: {bioData?.bioData.dob}</p>
                            <p className="text-gray-600">Height: {bioData?.bioData.height}, Weight: {bioData?.bioData.weight}</p>
                            <p className="text-gray-600">Race: {bioData?.bioData.race}</p>
                            <p className="text-gray-600">Father: {bioData?.bioData.fathersName}, Mother: {bioData?.bioData.mothersName}</p>
                            <p className="text-gray-600">Expected Partner: {bioData?.bioData.expectedPartnerAge} yrs, Height {bioData?.bioData.expectedPartnerHeight}, Weight {bioData?.bioData.expectedPartnerWeight}</p>
                            <p className="text-gray-600">Present Division: {bioData?.bioData.presentDivision}</p>

                            {/* Conditional Contact Info */}
                            {isPremium ? (
                                <div className="mt-3 text-rose-600">
                                    <p>Email: {bioData?.bioData.contactEmail}</p>
                                    <p>Phone: {bioData?.bioData.mobile}</p>
                                </div>
                            ) : (
                                <p className="mt-2 text-sm text-gray-400 italic">
                                    Contact info visible for premium members only.
                                </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handleAddToFavourites(bioData)}
                                    className="bg-rose-500 text-white px-4 py-1 rounded hover:bg-rose-600"
                                >
                                    Add to Favourites
                                </button>
                                {!isPremium && (
                                    <button
                                        onClick={() => handleContactRequest(bioData)}
                                        className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700"
                                    >
                                        Request Contact Info
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Biodatas */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Similar Biodatas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {similar.map((profile, i) => (
                            <motion.div
                                key={profile._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-4 rounded border shadow text-center"
                            >
                                <img
                                    src={profile.bioData.image}
                                    alt="Similar"
                                    className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
                                />
                                <h4 className="text-sm font-semibold text-gray-800">{profile.name}</h4>
                                <p className="text-xs text-gray-500">{profile.bioData.age} yrs • {profile.bioData.occupation}</p>
                                <p className="text-xs text-gray-500">{profile.bioData.presentDivision}</p>
                                <Link
                                    to={`/user/view-bioData/${profile._id}`}
                                    className="mt-2 text-rose-500 text-sm hover:underline"
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
}

export default BioDataDetails;