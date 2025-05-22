import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const SuccessStories = () => {
  const axiosPublic = useAxiosPublic();

  const { data: stories = [] } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/success-stories');
      return res?.data.sort(
        (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
      );
    },
  });

  return (
    <section className="bg-bg-soft dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-heading text-primary dark:text-accent text-center mb-12"
        >
          Real Love Stories ❤️
        </motion.h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {stories.map((story, i) => (
            <SwiperSlide key={story._id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-bg-soft rounded-2xl shadow-md dark:shadow-none hover:shadow-lg dark:hover:shadow-lg transition-all duration-300 p-6 text-center flex flex-col items-center h-full"
              >
                <img
                  src={story.image}
                  alt={`Couple - ${story._id}`}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-accent"
                />
                <p className="text-sm font-body text-text-secondary dark:text-text-secondary mb-2">
                  Married on:{' '}
                  <span className="text-text-main dark:text-text-main font-medium">
                    {new Date(story.marriageDate).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex justify-center text-accent mb-2">
                  {[...Array(story.stars)].map((_, idx) => (
                    <AiFillStar key={idx} className="text-xl" />
                  ))}
                </div>
                <p className="text-sm italic text-text-secondary dark:text-text-secondary font-body">
                  “{story.review}”
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
