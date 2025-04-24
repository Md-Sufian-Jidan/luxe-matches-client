import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const AdminSuccessStories = () => {
    const [selected, setSelected] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { data: stories = [], refetch } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/success-stories');
            const sortedStories = res?.data.sort(
                (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
            );
            return sortedStories;
        }
    })

    return (
        <>
            <Helmet>
                <title>LuxeMatches | SuccessStories</title>
            </Helmet>
            {/* -------- Table -------- */}
            <div className="space-y-6">
                <h1 className="text-xl font-bold text-gray-800">Success Stories</h1>

                <div className="overflow-x-auto bg-white rounded-xl shadow">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left">Male ID</th>
                                <th className="px-4 py-2 text-left">Female ID</th>
                                <th className="px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-6 text-center text-gray-500">
                                        No stories yet
                                    </td>
                                </tr>
                            ) : (
                                stories.map((s) => (
                                    <tr key={s._id} className="border-t">
                                        <td className="px-4 py-2">#{s.maleId}</td>
                                        <td className="px-4 py-2">#{s.femaleId}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => setSelected(s)}
                                                className="px-4 py-1 bg-rose-600 text-white rounded text-xs hover:bg-rose-700"
                                            >
                                                View Story
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* -------- Modal -------- */}
            <AnimatePresence>
                {selected && (
                    <>
                        {/* overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                        />
                        {/* card */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden">
                                {/* header */}
                                <div className="flex justify-between items-center px-6 py-4 border-b">
                                    <h2 className="text-lg font-bold">Success Story</h2>
                                    <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* body */}
                                <div className="p-6 space-y-4">
                                    <img
                                        src={selected.image}
                                        alt="Couple"
                                        className="w-full h-56 object-cover rounded-md"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Married on&nbsp;
                                        {new Date(selected.marriageDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        “{selected.review}”
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default AdminSuccessStories;