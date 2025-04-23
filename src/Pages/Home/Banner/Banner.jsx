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
        bg: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'Find love that lasts forever',
        subtitle: 'LuxeMatches — Because your story deserves luxury.',
        bg: 'https://images.unsplash.com/photo-1589832904700-8b4b5d6c8f9f?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'Create memories that matter',
        subtitle: 'Thousands of successful matches and counting.',
        bg: 'https://images.unsplash.com/photo-1614728894743-d77d3c8df3d4?auto=format&fit=crop&w=1400&q=80',
    },
];

const Banner = () => {
    return (
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
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
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                            {/* Text Content */}
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
                                <motion.h2
                                    initial={{ y: -40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.7 }}
                                    className="text-3xl md:text-5xl font-bold drop-shadow-lg"
                                >
                                    {slide.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.7 }}
                                    className="mt-4 text-lg md:text-xl drop-shadow"
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
}

export default Banner;