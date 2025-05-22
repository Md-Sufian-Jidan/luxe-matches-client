import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ViewBioData = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bioData } = useQuery({
    queryKey: ['bioData'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/get-bio-data/${user?.email}`);
      return res.data?.result;
    },
  });

  const handleMakePremium = async () => {
    setSending(true);
    try {
      await axiosSecure.post(`/user/make-bio-data-premium-request`, { bioData });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your bioData is processing for Premium',
      });
      setRequestSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (!bioData)
    return (
      <p className="text-center text-text-secondary font-body mt-10">Loading…</p>
    );

  return (
    <>
      <Helmet>
        <title>LuxeMatches | View Biodata</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white dark:bg-bg-soft p-8 rounded-2xl shadow-lg dark:shadow-xl font-body"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={bioData?.photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover self-center shadow-sm dark:shadow-md"
          />
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-text-main dark:text-text-main">
            {[
              ['BioData ID', bioData.bioData.bioDataId],
              ['Type', bioData.bioData.bioDataType],
              ['Name', bioData.bioData.name],
              ['DOB', bioData.bioData.dob],
              ['Age', bioData.bioData.age],
              ['Height', bioData.bioData.height],
              ['Weight', bioData.bioData.weight],
              ['Occupation', bioData.bioData.occupation],
              ['Race', bioData.bioData.race],
              ['Father', bioData.bioData.fathersName],
              ['Mother', bioData.bioData.mothersName],
              ['Permanent Div', bioData.bioData.permanentDivision],
              ['Present Div', bioData.bioData.presentDivision],
              ['Expected Partner Age', bioData.bioData.expectedPartnerAge],
              ['Expected Partner Height', bioData.bioData.expectedPartnerHeight],
              ['Expected Partner Weight', bioData.bioData.expectedPartnerWeight],
              ['Email', bioData.bioData.contactEmail],
              ['Mobile', bioData.bioData.mobile],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-text-secondary dark:text-text-secondary font-medium">{label}</p>
                <p className="mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {!bioData?.bioData.isPremium && (
          <div className="text-right mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="bg-btn dark:bg-btn text-white px-6 py-2.5 rounded-2xl shadow-md dark:shadow-lg hover:shadow-lg transition-all duration-200"
            >
              Make BioData Premium
            </motion.button>
          </div>
        )}

        {bioData?.bioData.isPremium && (
          <p className="mt-8 flex items-center gap-2 text-text-main dark:text-accent font-semibold text-sm">
            <CheckCircle size={18} /> You are already a Premium member
          </p>
        )}
      </motion.div>

      {/* Premium Confirmation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !sending && setModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl dark:shadow-xl p-6">
                <h2 className="text-xl font-heading text-text-main dark:text-text-secondary mb-3">
                  Upgrade to Premium?
                </h2>
                <p className="text-sm text-text-secondary dark:text-text-secondary mb-4">
                  Your request will be sent to the admin for approval. Would you like to proceed?
                </p>

                {requestSent ? (
                  <div>
                    <p className="text-accent  dark:text-accent text-sm font-medium mb-5">
                      ✅ Request sent! You’ll be notified once approved.
                    </p>
                    <button
                      disabled={sending}
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-sm text-text-secondary dark:text-text-secondary hover:bg-bg-soft dark:hover:bg-gray-800 transition"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      disabled={sending}
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-sm text-text-secondary dark:text-text-secondary hover:bg-bg-soft dark:hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={sending}
                      onClick={handleMakePremium}
                      className="px-5 py-2 rounded bg-btn dark:bg-btn text-white hover:bg-primary dark:hover:bg-primary transition disabled:opacity-60"
                    >
                      {sending ? 'Sending…' : 'Yes, Send'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ViewBioData;