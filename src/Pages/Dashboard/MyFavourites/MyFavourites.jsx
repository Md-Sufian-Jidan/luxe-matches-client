import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

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
  console.log(favourites);

  // DELETE: remove from favourites
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/user/delete-favourites/${id}`);
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
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">My Favourites</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Biodata ID</th>
              <th className="px-4 py-2 text-left">Permanent Address</th>
              <th className="px-4 py-2 text-left">Occupation</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : favourites.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No favourites added yet.
                  </td>
                </tr>
              ) : (
                favourites.map((f) => (
                  <motion.tr
                    key={f._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td className="px-4 py-2">{f?.bio.name}</td>
                    <td className="px-4 py-2">#{f.bio?.bioData.bioDataId}</td>
                    <td className="px-4 py-2">{f.bio.bioData?.permanentDivision}</td>
                    <td className="px-4 py-2">{f.bio.bioData?.occupation}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(f._id)}
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

export default MyFavourites;