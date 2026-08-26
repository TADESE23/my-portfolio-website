import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaEye, FaBookOpen } from 'react-icons/fa';
import api, { getImageUrl } from '../services/api';
import { Blog, Category } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';

const DEFAULT_BLOGS: Blog[] = [
  {
    id: 1,
    title: 'Building Scalable Architectures with Django and React',
    slug: 'building-scalable-architectures-with-django-and-react',
    content: 'When building full stack web applications, structuring your codebase and communication layer efficiently is paramount. React handles rendering state-of-the-art UI elements, while Django REST Framework processes business logic and data securely.',
    image: null,
    category_name: 'Web Development',
    category_details: { id: 1, name: 'Web Development', slug: 'web-development' },
    created_at: '2024-06-15T12:00:00Z',
    updated_at: '2024-06-15T12:00:00Z',
    views: 42,
    is_published: true
  },
  {
    id: 2,
    title: "Why I'm Pursuing an International Master's in Data Science",
    slug: 'why-im-pursuing-an-international-masters-in-data-science',
    content: 'The world is filled with massive streams of unstructured data. Processing, analyzing, and translating this data into actionable insights is the ultimate frontier of modern Computer Science.',
    image: null,
    category_name: 'Artificial Intelligence',
    category_details: { id: 2, name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
    created_at: '2024-07-02T10:30:00Z',
    updated_at: '2024-07-02T10:30:00Z',
    views: 125,
    is_published: true
  }
];

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>(DEFAULT_BLOGS);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const results = await Promise.allSettled([
          api.get('/blogs/'),
          api.get('/blogs/categories/')
        ]);
        const blogRes = results[0].status === 'fulfilled' ? results[0].value : null;
        const catRes = results[1].status === 'fulfilled' ? results[1].value : null;

        if (blogRes?.data && blogRes.data.length > 0) {
          setBlogs(blogRes.data);
        }
        if (catRes?.data && catRes.data.length > 0) {
          setCategories(catRes.data);
        }
      } catch (err) {
        console.warn('API error, using cached articles list');
      }
    };
    fetchBlogData();
  }, []);

  const localBlogs: Blog[] = blogs;

  const localCats = categories.length > 0 ? categories : [
    { id: 1, name: 'Web Development', slug: 'web-development' },
    { id: 2, name: 'Artificial Intelligence', slug: 'artificial-intelligence' }
  ];

  // Filtering & search
  const filteredBlogs = localBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) || 
                          blog.content.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || blog.category_name === selectedCat || blog.category_details?.name === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <section className="min-h-screen py-28 bg-slate-50 dark:bg-slatebg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            My Tech Blog
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mt-4 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slatefg-muted dark:text-slatefg-dark/80 mt-4 text-base font-inter"
          >
            Insights, tutorials, and personal thoughts on programming, AI development, and academia.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-white text-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedCat('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                selectedCat === 'All'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-slatebg-card text-slatefg-muted dark:text-slatefg-dark/80 hover:bg-slate-100 dark:hover:bg-slatebg-border border border-slate-200 dark:border-slatebg-border/60'
              }`}
            >
              All Topics
            </button>
            {localCats.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                  selectedCat === cat.name
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slatebg-card text-slatefg-muted dark:text-slatefg-dark/80 hover:bg-slate-100 dark:hover:bg-slatebg-border border border-slate-200 dark:border-slatebg-border/60'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <LoadingSkeleton type="card" count={2} />
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slatebg-card border border-slate-200/50 dark:border-slatebg-border/40 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300"
              >
                {/* Banner image or background gradient placeholder */}
                <div className="h-48 relative bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 dark:from-slatebg-border dark:to-slate-800 flex items-center justify-center">
                  {blog.image ? (
                    <img
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaBookOpen className="w-12 h-12 text-primary/60 dark:text-secondary-light/60" />
                  )}
                  {/* Category label badge */}
                  {blog.category_name && (
                    <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-primary text-white px-2.5 py-1 rounded-full font-inter">
                      {blog.category_name}
                    </span>
                  )}
                </div>

                {/* Content section */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <Link to={`/blog/${blog.slug}`}>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white hover:text-primary dark:hover:text-secondary-light transition-colors leading-tight">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-slatefg-muted dark:text-slatefg-dark/85 font-inter leading-relaxed line-clamp-3">
                      {blog.content}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slatefg-muted dark:text-slatefg-dark/60 font-inter pt-4 border-t border-slate-100 dark:border-slatebg-border/60">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt />
                      {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaEye /> {blog.views} views
                    </span>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-12 glass-panel rounded-2xl text-slatefg-muted">
              No blog posts found. Please publish some posts inside the admin dashboard!
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default BlogPage;
