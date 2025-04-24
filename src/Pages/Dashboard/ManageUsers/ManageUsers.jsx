import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
// import debounce from 'lodash.debounce';

const ManageUsers = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const axiosSecure = useAxiosSecure();

    /** ① fetch users (server‑side search + pagination) */
    const fetchUsers = useCallback(
        async (q = '', p = 1) => {
            setLoading(true);
            const { data } = await axiosSecure.get('/api/admin/users', {
                params: { q, page: p, limit: perPage },
            });
            setUsers(data);
            setLoading(false);
        },
        []
    );

    /** debounce search input */
    // const debouncedFetch = useCallback(debounce(fetchUsers, 400), [fetchUsers]);

    /** mount + page change */
    useEffect(() => { fetchUsers(query, page); }, [fetchUsers, query, page]);

    /** search handler */
    const onSearch = (e) => {
        const val = e.target.value;
        setQuery(val);
        // debouncedFetch(val, 1);
        setPage(1);
    };

    /** optimistic role toggles */
    const toggleRole = async (id, field) => {
        setUsers((prev) =>
            prev.map((u) =>
                u._id === id ? { ...u, [field]: !u[field] } : u
            )
        );
        await axiosSecure.patch(`/api/admin/users/${id}`, { [field]: true });
    };

    return (
        <div className="space-y-6">
            {/* Search bar */}
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search by username…"
                    value={query}
                    onChange={onSearch}
                    className="w-64 border rounded px-3 py-1.5 text-sm"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm whitespace-nowrap">
                    <thead className="bg-gray-100">
                        <tr>
                            {['Username', 'Email', 'Admin', 'Premium', 'Actions'].map((h) => (
                                <th key={h} className="px-4 py-2 text-left font-semibold text-gray-600">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-gray-500">
                                        Loading…
                                    </td>
                                </tr>
                            ) : users?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users?.map((u) => (
                                    <motion.tr
                                        key={u._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td className="px-4 py-2">{u.username}</td>
                                        <td className="px-4 py-2">{u.email}</td>
                                        <td className="px-4 py-2">
                                            {u.isAdmin ? '✔️' : '—'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {u.isPremium ? '⭐' : '—'}
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            {!u.isAdmin && (
                                                <button
                                                    onClick={() => toggleRole(u._id, 'isAdmin')}
                                                    className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                            {!u.isPremium && (
                                                <button
                                                    onClick={() => toggleRole(u._id, 'isPremium')}
                                                    className="px-3 py-1 bg-rose-600 text-white rounded text-xs hover:bg-rose-700"
                                                >
                                                    Make Premium
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
            <div className="flex justify-center gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Prev
                </button>
                <span className="px-3 py-1">{page}</span>
                <button
                    disabled={users.length < perPage}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ManageUsers;