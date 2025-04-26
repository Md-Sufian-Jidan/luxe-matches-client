import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet';

const MyContactRequest = () => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['myContactRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/my-contact-requests/${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    });

    const deleteRequest = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/user/contact-requests/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myContactRequests']);
            Swal.fire('Deleted!', 'Your contact request was removed.', 'success');
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will remove your contact request.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        }).then((res) => {
            if (res.isConfirmed) deleteRequest.mutate(id);
        });
    };

    return (
        <>
            <Helmet>
                <title>LuxeMatches | Contact Request</title>
            </Helmet>
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
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
                                            Loading…
                                        </td>
                                    </tr>
                                ) : requests?.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-8 text-gray-500">
                                            No contact requests yet.
                                        </td>
                                    </tr>
                                ) : (
                                    requests?.map((req) => (
                                        <motion.tr
                                            key={req._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <td className="px-4 py-2">{req.requestedName}</td>
                                            <td className="px-4 py-2">#{req.bioDataId}</td>
                                            <td className="px-4 py-2 font-medium">
                                                {req.approved ? (
                                                    <span className="text-emerald-600">Approved</span>
                                                ) : (
                                                    <span className="text-yellow-500">Pending</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                {req.approved ? req.requestedMobile : '—'}
                                            </td>
                                            <td className="px-4 py-2">
                                                {req.approved ? req.requestedEmail : '—'}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => handleDelete(req._id)}
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
        </>
    );
}

export default MyContactRequest;