import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { CheckCircle, X } from 'lucide-react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ViewBioData = () => {
    // const [bioData, setBioData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bioData, isLoading } = useQuery({
        queryKey: ['bioData'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/get-bio-data/${user?.email}`);
            return res.data?.result;
        },
    });

    console.log(bioData);
    const handleMakePremium = async () => {
        setSending(true);
        axiosSecure.post(`/user/make-bio-data-premium-request`, { bioData })
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: "Success",
                    text: "Your bioData is Processing for the Premium",
                });
                console.log(res.data);
            })
        setSending(false);
        setRequestSent(true);
    };

    if (!bioData) return <p className="text-center mt-10">Loading…</p>;

    /** ---------------- JSX ---------------- */
    return (
        <>
            {/* ①  Main Card */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8"
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={bioData?.photoURL}
                        alt="profile"
                        className="w-40 h-40 rounded-full object-cover self-center"
                    />
                    {/* info grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        {[
                            ['BioData ID', bioData.bioData.bioDataId],
                            ['Type', bioData.bioData.bioDataType],
                            ['Name', bioData.bioData.name],
                            ['DOB', bioData.bioData.dob],
                            ['Age', bioData.bioData.age],
                            ['Height', bioData.bioData.height],
                            ['Weight', bioData.bioData.weight],
                            ['Occupation', bioData.bioData.occupation],
                            ['Race', bioData.bioData.race],
                            ['Father', bioData.bioData.fathersName],
                            ['Mother', bioData.bioData.mothersName],
                            ['Permanent Div', bioData.bioData.permanentDivision],
                            ['Present Div', bioData.bioData.presentDivision],
                            ['Exp. Partner Age', bioData.bioData.expectedPartnerAge],
                            ['Exp. Partner Height', bioData.bioData.expectedPartnerHeight],
                            ['Exp. Partner Weight', bioData.bioData.expectedPartnerWeight],
                            ['Email', bioData.bioData.contactEmail],
                            ['Mobile', bioData.bioData.mobile],
                        ].map(([label, value]) => (
                            <div key={label}>
                                <p className="font-medium text-gray-600">{label}</p>
                                <p className="text-gray-800">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Premium button */}
                {!bioData?.bioData.isPremium && (
                    <div className="text-right mt-8">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="bg-rose-600 text-white px-5 py-2 rounded hover:bg-rose-700 transition"
                        >
                            Make BioData Premium
                        </button>
                    </div>
                )}
                {bioData?.bioData.isPremium && (
                    <p className="mt-6 flex items-center gap-2 text-emerald-600 font-semibold">
                        <CheckCircle size={18} /> You are already a Premium member
                    </p>
                )}
            </motion.div>

            {/* ②  Confirm‑Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <>
                        {/* overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !sending && setModalOpen(false)}
                        />
                        {/* modal card */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">
                                    Make BioData Premium?
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Your request will be sent to the admin for approval. Continue?
                                </p>

                                {requestSent ? (
                                    <div>
                                        <p className="mt-6 text-emerald-600 text-sm font-medium">
                                            ✅ Request sent! You’ll be notified once approved.
                                        </p>
                                        <button
                                            disabled={sending}
                                            onClick={() => setModalOpen(false)}
                                            className="px-4 py-1.5 rounded border text-gray-600 hover:bg-gray-50 mt-5"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mt-6 flex justify-end gap-3">
                                        <button
                                            disabled={sending}
                                            onClick={() => setModalOpen(false)}
                                            className="px-4 py-1.5 rounded border text-gray-600 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            disabled={sending}
                                            onClick={handleMakePremium}
                                            className="px-5 py-1.5 rounded bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50"
                                        >
                                            {sending ? 'Sending…' : 'Yes, Send'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default ViewBioData;