import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const BioDataDetails = () => {
    const { biodataId } = useParams();
    const navigate = useNavigate();

    // Simulate auth context
    const isLoggedIn = true; // replace with actual auth state
    const isPremium = false; // premium user logic
    const userId = "123"; // replace with actual logged-in user ID

    const [biodata, setBiodata] = useState(null);
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            // Fetch biodata details by biodataId
            const mockBiodata = {
                id: biodataId,
                name: 'Ayesha Siddiqua',
                type: 'Female',
                age: 25,
                occupation: 'Engineer',
                division: 'Dhaka',
                dob: '1999-03-12',
                height: "5'4\"",
                weight: '55kg',
                race: 'Asian',
                contactEmail: 'ayesha@example.com',
                phone: '01712345678',
                fathersName: 'Mr. Siddique',
                mothersName: 'Mrs. Siddique',
                presentDivision: 'Dhaka',
                expectedPartnerAge: '26-35',
                expectedPartnerHeight: "5'5\" - 6'0\"",
                expectedPartnerWeight: '60-80kg',
                image: `https://i.pravatar.cc/150?img=${biodataId}`,
            };
            setBiodata(mockBiodata);

            // Fetch similar biodatas
            const mockSimilar = Array.from({ length: 3 }, (_, i) => ({
                id: i + 100,
                name: 'Similar ' + (i + 1),
                type: mockBiodata.type,
                age: 24 + i,
                division: 'Dhaka',
                image: `https://i.pravatar.cc/150?img=${30 + i}`,
                occupation: 'Job',
            }));
            setSimilar(mockSimilar);
        }
    }, [biodataId, isLoggedIn, navigate]);

    const handleAddToFavourites = () => {
        toast.success('Added to favourites!');
        // Add logic to push to DB
    };

    const handleContactRequest = () => {
        navigate(`/checkout/${biodataId}`);
    };

    if (!biodata) return <div className=" h-16 border-4 border-dashed rounded-full animate-spin dark:border-rose-500 mx-auto max-w-16"></div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Main Info */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={biodata.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-2">
                        <h2 className="text-2xl font-bold text-gray-800">{biodata.name}</h2>
                        <p className="text-gray-600">Biodata ID: #{biodata.id}</p>
                        <p className="text-gray-600">{biodata.type}, {biodata.age} yrs • {biodata.occupation}</p>
                        <p className="text-gray-600">Division: {biodata.division}</p>
                        <p className="text-gray-600">DOB: {biodata.dob}</p>
                        <p className="text-gray-600">Height: {biodata.height}, Weight: {biodata.weight}</p>
                        <p className="text-gray-600">Race: {biodata.race}</p>
                        <p className="text-gray-600">Father: {biodata.fathersName}, Mother: {biodata.mothersName}</p>
                        <p className="text-gray-600">Expected Partner: {biodata.expectedPartnerAge} yrs, Height {biodata.expectedPartnerHeight}, Weight {biodata.expectedPartnerWeight}</p>
                        <p className="text-gray-600">Present Division: {biodata.presentDivision}</p>

                        {/* Conditional Contact Info */}
                        {isPremium ? (
                            <div className="mt-3 text-rose-600">
                                <p>Email: {biodata.contactEmail}</p>
                                <p>Phone: {biodata.phone}</p>
                            </div>
                        ) : (
                            <p className="mt-2 text-sm text-gray-400 italic">
                                Contact info visible for premium members only.
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleAddToFavourites}
                                className="bg-rose-500 text-white px-4 py-1 rounded hover:bg-rose-600"
                            >
                                Add to Favourites
                            </button>
                            {!isPremium && (
                                <button
                                    onClick={handleContactRequest}
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
                            key={profile.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-4 rounded border shadow text-center"
                        >
                            <img
                                src={profile.image}
                                alt="Similar"
                                className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
                            />
                            <h4 className="text-sm font-semibold text-gray-800">{profile.name}</h4>
                            <p className="text-xs text-gray-500">{profile.age} yrs • {profile.occupation}</p>
                            <p className="text-xs text-gray-500">{profile.division}</p>
                            <button
                                onClick={() => navigate(`/biodata/${profile.id}`)}
                                className="mt-2 text-rose-500 text-sm hover:underline"
                            >
                                View Profile
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BioDataDetails;