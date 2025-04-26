import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['approveContactRequests',],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/pending-contact-requests`);
      return res.data;
    }
  });

  const approveRequest = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/admin/approve-contact-request/${id}`);
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to approve the contact.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!'
    }).then((res) => {
      if (res.isConfirmed) {
        approveRequest.mutate(id, {
          onSuccess: () => {
            queryClient.invalidateQueries(['approveContactRequests']);
            Swal.fire({
              title: "Approved!",
              text: "Contact Request Approved",
              icon: "success"
            });
            refetch();
          }
        });
      }
    });
  };
  const filterApprove = requests.filter(item => item?.approved === false);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Contact Request Approvals</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Biodata ID</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : filterApprove?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-gray-500">
                    No pending requests
                  </td>
                </tr>
              ) : (
                filterApprove?.map((r) => (
                  <motion.tr
                    key={r._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-4 py-2">{r?.requesterName}</td>
                    <td className="px-4 py-2">{r?.requesterEmail}</td>
                    <td className="px-4 py-2">#{r?.bioDataId}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleApprove(r._id)}
                        className="px-4 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700"
                      >
                        Approve Contact
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

export default ApprovedContactRequest;