import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const ApprovePremium = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ['requests'],
    enabled: !!user?.email,
    queryFn: async () => {
      setLoading(true);
      const res = await axiosSecure.get('/admin/premium-requests');
      const pending = res.data.filter((r) => r.isPremium === 'false');
      setLoading(false);
      return pending;
    },
  });

  const approve = async (r) => {
    Swal.fire({
      title: "Approve Premium?",
      text: "This user will become a premium member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4B1D3F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve"
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.warn("Processing request…");
        const res = await axiosSecure.patch(`/admin/premium-requests/${r?._id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "User is now premium.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Approve Premium</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 font-body"
      >
        <h1 className="text-3xl font-heading text-primary">Premium Approval Requests</h1>

        <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
          <table className="min-w-full text-sm text-text-main">
            <thead className="bg-bg-soft text-left text-text-secondary font-heading">
              <tr>
                {['Name', 'Email', 'Biodata ID', 'Action'].map((h) => (
                  <th key={h} className="px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-text-secondary">
                      Loading…
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-center text-text-secondary">
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
                      className="border-t hover:bg-bg-soft transition-colors"
                    >
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.email}</td>
                      <td className="px-6 py-3 font-medium text-primary">
                        #{r.bioData?.bioDataId}
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => approve(r)}
                          className="px-4 py-1.5 text-xs font-medium bg-accent text-white rounded-xl hover:brightness-90 transition-all"
                        >
                          Approve Premium
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

export default ApprovePremium;