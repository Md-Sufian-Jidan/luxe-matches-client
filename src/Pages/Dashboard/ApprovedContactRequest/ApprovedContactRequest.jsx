import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const ApprovedContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['approveContactRequests'],
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
      title: 'Approve Contact?',
      text: 'This will approve the contact request.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4B1D3F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    }).then((res) => {
      if (res.isConfirmed) {
        approveRequest.mutate(id, {
          onSuccess: () => {
            queryClient.invalidateQueries(['approveContactRequests']);
            Swal.fire('Approved!', 'Contact request approved.', 'success');
            refetch();
          }
        });
      }
    });
  };

  const filterApprove = requests.filter(item => item?.approved === false);

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Approved Contact</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 font-body"
      >
        <h1 className="text-3xl font-heading text-primary dark:text-primary">
          Contact Request Approvals
        </h1>

        <div className="overflow-x-auto bg-white dark:bg-bg-soft rounded-2xl shadow dark:shadow-md p-4">
          <table className="min-w-full text-sm text-text-main dark:text-text-main">
            <thead className="bg-bg-soft dark:bg-gray-800 text-left font-heading text-text-secondary dark:text-accent">
              <tr>
                {['Name', 'Email', 'Biodata ID', 'Action'].map((header) => (
                  <th key={header} className="px-6 py-3">{header}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-text-secondary dark:text-text-secondary">
                      Loading…
                    </td>
                  </tr>
                ) : filterApprove?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-text-secondary dark:text-text-secondary">
                      No pending requests
                    </td>
                  </tr>
                ) : (
                  filterApprove.map((r) => (
                    <motion.tr
                      key={r._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-bg-soft dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-3">{r?.requesterName}</td>
                      <td className="px-6 py-3">{r?.requesterEmail}</td>
                      <td className="px-6 py-3 text-primary dark:text-primary font-medium">
                        #{r?.bioDataId}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleApprove(r._id)}
                          className="px-4 py-1.5 text-xs font-medium bg-accent dark:bg-accent text-white rounded-xl hover:brightness-90 transition-all"
                        >
                          Approve Contact
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
};

export default ApprovedContactRequest;