import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const MyFavourites = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: favourites = [], isLoading } = useQuery({
    queryKey: ['favourites'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/favourites/${user?.email}`);
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/user/delete-favourites/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['favourites']);
      Swal.fire('Removed!', 'Biodata removed from favourites.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Could not remove favourite.', 'error');
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This biodata will be removed from your favourites.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#4B1D3F', // primary color
      cancelButtonColor: '#D4AF37',  // accent color
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Favourites</title>
      </Helmet>

      <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 py-6 font-body">
        <h1 className="text-3xl font-heading text-primary dark:text-primary mb-6">
          My Favourites
        </h1>

        <div className="overflow-x-auto bg-bg-soft dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-xl">
          <table className="min-w-full text-text-main dark:text-text-secondary text-sm md:text-base">
            <thead className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20">
              <tr>
                {['Name', 'Biodata ID', 'Permanent Address', 'Occupation', 'Action'].map((th) => (
                  <th
                    key={th}
                    className="px-6 py-3 text-left font-heading text-text-secondary dark:text-accent tracking-wide"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-text-secondary dark:text-text-secondary italic"
                    >
                      Loading…
                    </td>
                  </tr>
                ) : favourites.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-text-secondary dark:text-text-secondary italic"
                    >
                      No favourites added yet.
                    </td>
                  </tr>
                ) : (
                  favourites.map((f) => (
                    <motion.tr
                      key={f._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-bg-soft dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">{f?.bio.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        #{f.bio?.bioData.bioDataId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{f.bio.bioData?.permanentDivision}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{f.bio.bioData?.occupation}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(f._id)}
                          className="text-xs md:text-sm bg-btn dark:bg-btn hover:bg-primary dark:hover:bg-primary transition-colors text-white font-medium px-4 py-1.5 rounded-2xl shadow-sm dark:shadow-md"
                          aria-label={`Delete favourite biodata ${f?.bio.name}`}
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

export default MyFavourites;