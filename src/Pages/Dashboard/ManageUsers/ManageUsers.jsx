import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ManageUsers = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const axiosSecure = useAxiosSecure();

  const fetchUsers = useCallback(async (q = '', p = 1) => {
    setLoading(true);
    const { data } = await axiosSecure.get('/admin/manage-users', {
      params: { q, page: p, limit: perPage },
    });
    setUsers(data);
    setLoading(false);
  }, [axiosSecure]);

  useEffect(() => {
    fetchUsers(query, page);
  }, [fetchUsers, query, page]);

  const onSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const toggleRole = async (id, field) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4B1D3F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUsers(prev => prev.map(u => u._id === id ? { ...u, [field]: true } : u));
        await axiosSecure.patch(`/admin/make-admin/make-premium/${id}`, { [field]: true });
        Swal.fire("Updated!", "User role updated successfully.", "success");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Manage Users</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8 font-body"
      >
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-heading text-primary">Manage Users</h2>
          <input
            type="text"
            placeholder="Search by username…"
            value={query}
            onChange={onSearch}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full text-sm text-left text-text-main whitespace-nowrap">
            <thead className="bg-bg-soft font-heading text-text-secondary">
              <tr>
                {['Username', 'Email', 'Admin', 'Premium', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">Loading…</td>
                  </tr>
                ) : users?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">No users found.</td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <motion.tr
                      key={u._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t"
                    >
                      <td className="px-6 py-4">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">{u.isAdmin ? '✔️' : '—'}</td>
                      <td className="px-6 py-4">{u.isPremium ? '⭐' : '—'}</td>
                      <td className="px-6 py-4 space-x-2">
                        {!u.isAdmin && (
                          <button
                            onClick={() => toggleRole(u._id, 'isAdmin')}
                            className="px-3 py-1.5 text-xs rounded-xl bg-btn text-white hover:bg-primary transition-all"
                          >
                            Make Admin
                          </button>
                        )}
                        {!u.isPremium && (
                          <button
                            onClick={() => toggleRole(u._id, 'isPremium')}
                            className="px-3 py-1.5 text-xs rounded-xl bg-accent text-white hover:brightness-90 transition-all"
                          >
                            Make Premium
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-4 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1.5 border rounded-xl text-text-main disabled:opacity-40 hover:bg-bg-soft"
          >
            Prev
          </button>
          <span className="text-text-secondary">{page}</span>
          <button
            disabled={users.length < perPage}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1.5 border rounded-xl text-text-main disabled:opacity-40 hover:bg-bg-soft"
          >
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ManageUsers;