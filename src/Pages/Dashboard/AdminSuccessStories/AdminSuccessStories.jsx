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
      return res?.data.sort(
        (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
      );
    }
  });

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Success Stories</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 font-body"
      >
        <h1 className="text-3xl font-heading text-primary">Success Stories</h1>

        <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
          <table className="min-w-full text-sm text-text-main">
            <thead className="bg-bg-soft font-heading text-text-secondary">
              <tr>
                <th className="px-6 py-3 text-left">Male ID</th>
                <th className="px-6 py-3 text-left">Female ID</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {stories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-6 text-center text-text-secondary">
                    No stories yet
                  </td>
                </tr>
              ) : (
                stories.map((s) => (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-t hover:bg-bg-soft transition-colors"
                  >
                    <td className="px-6 py-3">#{s.maleId}</td>
                    <td className="px-6 py-3">#{s.femaleId}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => setSelected(s)}
                        className="px-4 py-1.5 text-xs font-medium bg-accent text-white rounded-xl hover:brightness-90 transition"
                      >
                        View Story
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ---------- Modal ---------- */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden font-body">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-bg-soft">
                  <h2 className="text-xl font-heading text-primary">Success Story</h2>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-text-secondary hover:text-primary transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                  <img
                    src={selected.image}
                    alt="Couple"
                    className="w-full h-56 object-cover rounded-xl"
                  />
                  <p className="text-sm text-text-secondary">
                    Married on {new Date(selected.marriageDate).toLocaleDateString()}
                  </p>
                  <p className="text-text-main text-base leading-relaxed italic">
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
};

export default AdminSuccessStories;