import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';

const successStories = [
    {
        id: 1,
        image: 'https://i.pravatar.cc/150?img=30',
        date: '2024-12-10',
        stars: 5,
        text: 'Thanks to LuxeMatches, I found my soulmate! Our journey started with a message, and now we’re married.',
    },
    {
        id: 2,
        image: 'https://i.pravatar.cc/150?img=35',
        date: '2024-10-15',
        stars: 4,
        text: 'I never believed in online matchmaking until I found her here. Beautiful interface, smooth process, great support.',
    },
    {
        id: 3,
        image: 'https://i.pravatar.cc/150?img=32',
        date: '2024-08-05',
        stars: 5,
        text: 'We are eternally grateful to LuxeMatches for bringing us together. It’s been a dream come true.',
    },
];

// Sort by latest date
const sortedStories = successStories.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
);

const SuccessStories = () => {
    return (
        <section className="bg-white py-14">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Real Love Stories ❤️
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {sortedStories.map((story, i) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="bg-rose-50 p-6 rounded-lg shadow-md text-center"
                        >
                            <img
                                src={story.image}
                                alt="Couple"
                                className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                            />
                            <p className="text-gray-600 text-sm mb-2">
                                Married on: {new Date(story.date).toLocaleDateString()}
                            </p>
                            <div className="flex justify-center mb-2 text-rose-500">
                                {[...Array(story.stars)].map((_, idx) => (
                                    <AiFillStar key={idx} />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm italic">“{story.text}”</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SuccessStories;