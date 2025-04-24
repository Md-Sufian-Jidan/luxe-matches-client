import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
// import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const data = {
    total: 400,
    male: 220,
    female: 180,
    premium: 75,
    revenue: 1250   // USD
};

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            console.log(res);
            return res.data;
        },
    });

    if (!stats) return <p className="text-center mt-10">Loading…</p>;

    const kpi = [
        { label: 'Total Biodatas', value: stats.total, color: 'bg-indigo-500' },
        { label: 'Male Biodatas', value: stats.male, color: 'bg-blue-500' },
        { label: 'Female Biodatas', value: stats.female, color: 'bg-pink-500' },
        { label: 'Premium Biodatas', value: stats.premium, color: 'bg-rose-500' },
        { label: 'Revenue (USD)', value: `$${stats.revenue}`, color: 'bg-emerald-500' },
    ];

    const pieData = [
        { name: 'Male', value: stats.male, color: '#3b82f6' },
        { name: 'Female', value: stats.female, color: '#ec4899' },
        { name: 'Premium', value: stats.premium, color: '#f43f5e' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpi.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-xl shadow p-6 flex items-center gap-4"
                    >
                        <div className={`w-3 h-3 rounded-full ${card.color}`} />
                        <div>
                            <p className="text-sm text-gray-500">{card.label}</p>
                            <p className="text-xl font-bold text-gray-800">{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pie chart */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Biodata Distribution</h3>
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="50%"
                                outerRadius="80%"
                                paddingAngle={4}
                                label
                            >
                                {pieData.map((d) => (
                                    <Cell key={d.name} fill={d.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
}

export default AdminDashboard;