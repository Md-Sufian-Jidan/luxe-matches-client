import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const SuccessCounter = () => {
  const axiosPublic = useAxiosPublic();

  const { data } = useQuery({
    queryKey: ['successCounter'],
    queryFn: async () => {
      const res = await axiosPublic.get('/home-stats');
      return res.data;
    },
  });

  const counters = [
    { title: 'Total Biodatas', count: data?.total, color: 'text-primary' },
    { title: 'Female Biodatas', count: data?.female, color: 'text-pink-500' },
    { title: 'Male Biodatas', count: data?.male, color: 'text-blue-500' },
    { title: 'Marriages Completed', count: data?.marriage, color: 'text-emerald-600' },
  ];

  return (
    <section className="bg-bg-soft dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-heading text-primary dark:text-accent font-semibold mb-12">
          Our Success in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-bg-soft p-6 rounded-2xl shadow hover:shadow-lg dark:shadow-black/30 dark:hover:shadow-xl transition-all"
            >
              <h3 className={`text-4xl font-heading font-bold ${counter.color}`}>
                <CountUp end={counter.count} duration={3} />
              </h3>
              <p className="mt-3 text-sm font-body text-text-secondary dark:text-text-secondary">
                {counter.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
