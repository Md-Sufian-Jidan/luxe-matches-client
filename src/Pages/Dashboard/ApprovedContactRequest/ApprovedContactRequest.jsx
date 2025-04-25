import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ApprovedContactRequest =()=> {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const { data } = await axios.get('/api/admin/contact-requests');
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (id) => {
    await axios.patch(`/api/admin/contact-requests/${id}`);
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

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
                    <td className="px-4 py-2">#{r.biodataId}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => approve(r._id)}
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