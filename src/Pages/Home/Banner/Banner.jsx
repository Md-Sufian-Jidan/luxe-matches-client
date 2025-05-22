import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    title: 'Discover your dream match',
    subtitle: 'Elegant. Trusted. Personal.',
    bg: 'https://i.ibb.co/cdkzGrc/A-romantic-sunset-scene-at-a-beach-with-a-couple-walking-hand-in-hand-soft-golden-light-warm-tones-e.jpg',
  },
  {
    title: 'Find love that lasts forever',
    subtitle: 'LuxeMatches — Because your story deserves luxury.',
    bg: 'https://i.ibb.co/gnfHDrG/An-elegant-wedding-setup-in-an-outdoor-garden-white-flowers-gold-accents-candlelight-glow-dreamy-bok.jpg',
  },
  {
    title: 'Create memories that matter',
    subtitle: 'Thousands of successful matches and counting.',
    bg: 'https://i.ibb.co/0RPchnPr/slide-3.jpg',
  },
];

const Banner = () => {
  return (
    <div className="w-full h-[450px] md:h-[550px] lg:h-[650px] relative">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 dark:from-black/60 dark:to-black/40" />

              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
                <motion.h2
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-tight drop-shadow-xl dark:text-white"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="mt-5 text-lg md:text-2xl font-body drop-shadow-sm max-w-2xl text-white/90 dark:text-white/80"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
