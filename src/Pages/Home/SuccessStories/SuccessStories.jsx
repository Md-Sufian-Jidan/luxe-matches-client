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

  const { data: stories = [], refetch } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await axiosPublic.get('/success-stories');
      const sortedStories = res?.data.sort(
        (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
      );
      return sortedStories;
    }
  });

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Real Love Stories ❤️
        </h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
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
                className="bg-rose-50 p-6 rounded-lg shadow-md text-center h-full flex flex-col items-center"
              >
                <img
                  src={story.image}
                  alt="Couple"
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <p className="text-gray-600 text-sm mb-2">
                  Married on: {new Date(story.marriageDate).toLocaleDateString()}
                </p>

                <div className="flex justify-center mb-2 text-rose-500">
                  {[...Array(story.stars)].map((_, idx) => (
                    <AiFillStar key={idx} />
                  ))}
                </div>

                <p className="text-gray-700 text-sm italic">“{story.review}”</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
