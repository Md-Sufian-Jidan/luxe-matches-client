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
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#4B1D3F', // primary color
      cancelButtonColor: '#D4AF37',  // accent color
    }).then((res) => {
      if (res.isConfirmed) deleteRequest.mutate(id);
    });
  };

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Contact Request</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 font-body space-y-8">
        <h1 className="text-3xl font-heading text-primary dark:text-primary">
          My Contact Requests
        </h1>

        <div className="overflow-x-auto bg-bg-soft dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl">
          <table className="min-w-full text-text-main dark:text-text-secondary text-sm md:text-base">
            <thead className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 font-heading text-text-secondary dark:text-accent">
              <tr>
                {[
                  'Name',
                  'Biodata ID',
                  'Status',
                  'Mobile No',
                  'Email',
                  'Action',
                ].map((heading) => (
                  <th key={heading} className="px-6 py-3 text-left tracking-wide">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-text-secondary dark:text-text-secondary italic"
                    >
                      Loading…
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-text-secondary dark:text-text-secondary italic"
                    >
                      No contact requests yet.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <motion.tr
                      key={req._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-bg-soft dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {req.requestedName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        #{req.bioDataId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {req.approved ? (
                          <span>
                            Approved
                          </span>
                        ) : (
                          <span className="text-yellow-500 dark:text-yellow-400">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {req.approved ? req.requestedMobile : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">
                        {req.approved ? req.requestedEmail : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="text-xs md:text-sm bg-btn dark:bg-btn hover:bg-primary dark:hover:bg-primary text-white font-semibold px-4 py-1.5 rounded-2xl shadow-sm dark:shadow-md transition-colors"
                          aria-label={`Delete contact request for ${req.requestedName}`}
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
};

export default MyContactRequest;