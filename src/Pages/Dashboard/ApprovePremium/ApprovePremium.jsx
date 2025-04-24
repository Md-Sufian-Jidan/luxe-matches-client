import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ApprovePremium = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requests'],
        enabled: !!user?.email,
        queryFn: async () => {
            setLoading(true);
            const res = await axiosSecure.get('/premium-requests');
            const premiums = res.data;
            const r = premiums.filter((premium) => premium.isPremium === 'false');
            setLoading(false);
            return r;
        }
    });
    const approve = async (r) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make premium!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                toast.warn('Process take some time.so,Please wait!')
                const res = await axiosSecure.patch(`/admin/premium-requests/${r?._id}`);
                if (res.data.modifiedCount > 0)
                    Swal.fire({
                        title: "Premium!",
                        text: "Your BioData has been Premium.",
                        icon: "success"
                    });
                refetch();
            }
        });
    };

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold text-gray-800">Premium Approval Requests</h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Name', 'Email', 'Biodata ID', 'Action'].map((h) => (
                                <th key={h} className="px-4 py-2 text-left font-medium text-gray-600">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <AnimatePresence>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="py-6 text-center text-gray-500">
                                        Loading…
                                    </td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-6 text-center text-gray-500">
                                        No pending requests
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
                                        <td className="px-4 py-2">{r.email}</td>
                                        <td className="px-4 py-2">#{r.bioData?.bioDataId}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => approve(r)}
                                                className="px-4 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700"
                                            >
                                                Make Premium
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

export default ApprovePremium;