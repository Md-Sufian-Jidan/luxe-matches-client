import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

export default function MyContactRequest() {
    const [refresh, setRefresh] = useState(0);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['myContactRequests', refresh],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/my-contact-requests/${user?.email}`);
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        await axios.delete(`/api/user/contact-requests/${id}`);
        setRefresh((prev) => prev + 1); // refetch
    };

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold text-gray-800">My Contact Requests</h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Biodata ID</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Mobile No</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-gray-500">
                                        Loading…
                                    </td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-6 text-center text-gray-500">
                                        No contact requests yet.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((r) => (
                                    <motion.tr
                                        key={r._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td className="px-4 py-2">{r.name}</td>
                                        <td className="px-4 py-2">#{r.biodataId}</td>
                                        <td className="px-4 py-2 font-medium">
                                            {r.approved ? (
                                                <span className="text-emerald-600">Approved</span>
                                            ) : (
                                                <span className="text-yellow-500">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {r.approved ? r.mobile : '—'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {r.approved ? r.email : '—'}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(r._id)}
                                                className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
