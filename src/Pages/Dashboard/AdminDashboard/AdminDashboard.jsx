import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = null } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    },
  });

  if (!stats) return <p className="text-center text-text-secondary mt-10 font-body">Loading…</p>;

  const kpi = [
    { label: 'Total Biodatas', value: stats.total, color: 'bg-primary' },
    { label: 'Male Biodatas', value: stats.male, color: 'bg-blue-500' },
    { label: 'Female Biodatas', value: stats.female, color: 'bg-pink-500' },
    { label: 'Premium Biodatas', value: stats.premium, color: 'bg-accent' },
    { label: 'Revenue (USD)', value: `$${stats.revenue}`, color: 'bg-emerald-500' },
  ];

  const pieData = [
    { name: 'Male', value: stats.male, color: '#3b82f6' },
    { name: 'Female', value: stats.female, color: '#ec4899' },
    { name: 'Premium', value: stats.premium, color: '#f43f5e' },
  ];

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Admin Dashboard</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-10 font-body"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpi.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
            >
              <div className={`w-4 h-4 rounded-full ${card.color}`} />
              <div>
                <p className="text-sm text-text-secondary">{card.label}</p>
                <p className="text-xl font-semibold text-text-main">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pie Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h3 className="text-xl font-heading text-primary mb-4">Biodata Distribution</h3>
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
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontFamily: 'Inter, sans-serif', borderRadius: '0.75rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AdminDashboard;