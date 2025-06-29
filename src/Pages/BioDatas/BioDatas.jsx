import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BioDatas = () => {
  const divisions = ['Dhaka', 'Chattogram', 'Rangpur', 'Barisal', 'Khulna', 'Maymansign', 'Sylhet'];
  const [genderFilter, setGenderFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState([]);
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [tempMinAge, setTempMinAge] = useState(ageRange[0]);
  const [tempMaxAge, setTempMaxAge] = useState(ageRange[1]);
  const axiosSecure = useAxiosSecure();

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const numberOfPages = Math.ceil(total / limit);
  const pages = [...Array(numberOfPages).keys()];
  console.log(divisionFilter);

  const { data: bioDatas = [], isLoading } = useQuery({
    queryKey: ['bioDatas', page, limit, genderFilter, divisionFilter, ageRange],
    queryFn: async () => {
      const res = await axiosSecure.get('/users-bio-data', {
        params: {
          page,
          limit,
          gender: genderFilter,
          divisionFilter,
          minAge: ageRange[0],
          maxAge: ageRange[1],
        },
      });
      setTotal(res.data.count);
      return res.data.users;
    },
  });

  return (
    <>
      <Helmet>
        <title>LuxeMatches | Biodatas</title>
      </Helmet>

      <div className="bg-bg-soft dark:bg-gray-900 px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 font-body">
        {/* Filters Sidebar */}
        <div className="bg-white dark:bg-bg-soft rounded-2xl shadow-md dark:shadow-lg p-6 h-fit md:sticky md:top-24 transition-colors duration-300">
          <h3 className="text-xl font-heading text-primary dark:text-accent mb-6">Filters</h3>

          <div className="mb-6">
            <label className="block text-sm font-medium text-text-main dark:text-text-secondary mb-2">Biodata Type</label>
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm text-text-secondary dark:text-text-secondary bg-white dark:bg-gray-800 transition-colors duration-300"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-text-main dark:text-text-secondary mb-2">Home Division</label>
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-sm">
              {['All', ...divisions].map((division) => (
                <div key={division} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={division}
                    checked={
                      division === 'All'
                        ? divisionFilter.length === 0
                        : divisionFilter.includes(division)
                    }
                    onChange={() => {
                      if (division === 'All') {
                        setDivisionFilter([]);
                      } else {
                        setDivisionFilter((prev) =>
                          prev.includes(division)
                            ? prev.filter((d) => d !== division)
                            : [...prev, division]
                        );
                      }
                    }}
                    className="accent-accent dark:accent-primary"
                  />
                  <label htmlFor={division} className="text-text-secondary dark:text-text-main">
                    {division}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main dark:text-text-secondary mb-2">Age Range</label>
            <div className="flex gap-2 text-sm">
              <input
                type="number"
                value={tempMinAge}
                min="18"
                max="99"
                onChange={(e) => setTempMinAge(e.target.value)}
                onBlur={() => setAgeRange([+tempMinAge || 18, ageRange[1]])}
                className="w-1/2 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-text-secondary dark:text-text-secondary transition-colors duration-300"
              />
              <span className="self-center text-text-main dark:text-text-secondary">to</span>
              <input
                type="number"
                value={tempMaxAge}
                min="18"
                max="99"
                onChange={(e) => setTempMaxAge(e.target.value)}
                onBlur={() => setAgeRange([ageRange[0], +tempMaxAge || 99])}
                className="w-1/2 border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-text-secondary dark:text-text-secondary transition-colors duration-300"
              />
            </div>
          </div>
        </div>

        {/* Biodata Cards Grid */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="h-16 w-16 mx-auto text-center col-span-3 border-4 border-dashed rounded-full animate-spin border-accent dark:border-accent/70"></div>
            ) : bioDatas.length === 0 ? (
              <p className="text-center col-span-3 text-text-secondary dark:text-text-main">No biodatas found.</p>
            ) : (
              bioDatas.map((profile, i) => (
                <motion.div
                  key={profile._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative group rounded-2xl overflow-hidden shadow hover:shadow-lg dark:shadow-gray-800 transition-shadow duration-300"
                >
                  <span className="absolute inset-px rounded-[inherit] bg-gradient-to-br from-accent/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 bg-white dark:bg-bg-soft rounded-[inherit] p-6 flex flex-col items-center text-center transition-colors duration-300">
                    <img
                      src={profile.photoURL}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/10 mb-4"
                    />
                    <h4 className="text-lg font-heading text-text-main dark:text-text-secondary">
                      Biodata #{profile.bioData.bioDataId}
                    </h4>
                    <p className="text-xs uppercase tracking-wide text-accent dark:text-accent font-semibold mt-1">
                      {profile.bioData.bioDataType}
                    </p>
                    <div className="mt-3 text-sm text-text-secondary dark:text-text-main space-y-1 font-body">
                      <p>{profile.bioData.presentDivision}</p>
                      <p>
                        {profile.bioData.age} yrs &bull; {profile.bioData.occupation}
                      </p>
                    </div>
                    <Link
                      to={`/user/view-bioData/${profile._id}`}
                      className="mt-4 bg-accent dark:bg-accent text-white px-4 py-2 text-sm rounded-full hover:bg-primary dark:hover:bg-primary transition-colors duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-10 font-body text-sm text-text-secondary dark:text-text-main">
            <p className="mb-2 sm:mb-0">
              Showing {(page - 1) * limit + 1}‑{Math.min(page * limit, total)} of {total}
            </p>
            <ul className="inline-flex items-center border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-bg-soft shadow-sm dark:shadow-md transition-colors duration-300">
              <li>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-3 py-1.5 disabled:text-gray-400 dark:disabled:text-gray-600"
                >
                  ‹
                </button>
              </li>
              {pages.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => setPage(p + 1)}
                    className={clsx(
                      'px-3 py-1.5 rounded',
                      p + 1 === page
                        ? 'bg-accent/10 text-primary font-semibold dark:bg-accent/20 dark:text-accent'
                        : 'hover:bg-bg-soft dark:hover:bg-gray-700'
                    )}
                  >
                    {p + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  disabled={page === numberOfPages}
                  onClick={() => setPage(page + 1)}
                  className="px-3 py-1.5 disabled:text-gray-400 dark:disabled:text-gray-600"
                >
                  ›
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioDatas;
