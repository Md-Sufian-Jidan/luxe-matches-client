import React from 'react';

const articles = [
  {
    title: "5 Tips for a Successful First Date",
    summary:
      "Make a great impression with these essential first date tips to boost confidence and connection.",
    author: "Jane Doe",
    date: "May 15, 2025",
  },
  {
    title: "How to Keep the Spark Alive in Long-Term Relationships",
    summary:
      "Discover simple yet effective ways to maintain romance and intimacy over time.",
    author: "John Smith",
    date: "April 28, 2025",
  },
  {
    title: "Navigating Online Dating Safely",
    summary:
      "Stay safe and confident while meeting new people through online platforms.",
    author: "Emily Johnson",
    date: "March 10, 2025",
  },
];

const BlogAdviceSection = () => {
  return (
    <section className="w-full px-6 py-12 bg-bg-soft dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-heading font-bold text-primary dark:text-accent mb-3">
          Dating Tips & Relationship Advice
        </h2>
        <p className="mb-10 text-text-secondary dark:text-text-secondary font-body text-lg max-w-3xl">
          Expert insights and helpful articles to guide you through your dating journey and beyond.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map(({ title, summary, author, date }, idx) => (
            <article
              key={idx}
              className="bg-white dark:bg-bg-soft rounded-2xl p-6 shadow-md dark:shadow dark:shadow-black/20 hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <h3 className="font-heading font-semibold text-primary dark:text-accent text-xl mb-2">
                {title}
              </h3>
              <p className="text-text-main dark:text-text-main mb-4 font-body">
                {summary}
              </p>
              <div className="flex justify-between text-text-secondary dark:text-text-secondary text-sm font-body italic">
                <span>By {author}</span>
                <time>{date}</time>
              </div>
              <button
                className="mt-6 inline-block bg-btn dark:bg-btn hover:bg-primary dark:hover:bg-primary text-white font-semibold py-2 px-5 rounded-xl transition-colors duration-300"
                aria-label={`Read more about ${title}`}
              >
                Read More
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogAdviceSection;
