import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaGithub, FaExternalLinkAlt, FaListUl, FaTimes } from 'react-icons/fa';
import api from '../services/api';
import { Project } from '../types';
import LoadingSkeleton from '../components/LoadingSkeleton';

const formatUrl = (url: string) => {
  if (!url || url === '#') return '#';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsPerPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects/');
        setProjects(res.data);
      } catch (err) {
        console.warn('API error, using fallback projects list');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const localProjects: Project[] = projects.length > 0 ? projects : [
    {
      id: 1,
      name: 'Student Management System',
      description: 'A comprehensive school database system allowing administration to manage student enrollments, attendance, grades, and fee payments efficiently with custom analytics dashboards.',
      image: null,
      github_url: 'https://github.com/TADESE23',
      live_url: '#',
      technologies_names: ['React', 'Node.js', 'MySQL'],
      features: ['Student & Staff Profile Management', 'Grade & Attendance Tracking', 'Automated Report Card Generation', 'Analytical Admin Dashboard'],
      order: 1,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'Human Resource Management System',
      description: 'An enterprise-grade employee resource directory featuring attendance clocks, leave requests approval workflow, payroll management, and interactive performance reports.',
      image: null,
      github_url: 'https://github.com/TADESE23',
      live_url: '#',
      technologies_names: ['React', 'Express', 'MySQL'],
      features: ['Employee Check-in/Check-out', 'Leave Management Workflow', 'Payroll & Salary Slips Generation', 'Role-based access control'],
      order: 2,
      created_at: '2024-01-02T00:00:00Z'
    },
    {
      id: 3,
      name: 'ProLink Professional Networking Platform',
      description: 'A customized social networking app for professionals to share portfolios, post project collaborations, chat in real-time, and search for specialized remote job postings.',
      image: null,
      github_url: 'https://github.com/TADESE23',
      live_url: '#',
      technologies_names: ['React', 'Node.js', 'MySQL'],
      features: ['Real-time Instant Messaging', 'Post Sharing and Interaction', 'Portfolio Linking & Search Filters', 'Job Application Portal'],
      order: 3,
      created_at: '2024-01-03T00:00:00Z'
    },
    {
      id: 4,
      name: 'Telegram Exit Exam Bot',
      description: 'An interactive chatbot engineered to help graduating computer science students study for exit examinations by delivering daily quizzes, scoring metrics, and study materials via Telegram.',
      image: null,
      github_url: 'https://github.com/TADESE23',
      live_url: 'https://t.me/exit_exam_bot_demo',
      technologies_names: ['Node.js', 'Telegram Bot API', 'MySQL'],
      features: ['Command-based quiz navigation', 'Adaptive learning progress tracking', 'Immediate score feedbacks', 'Comprehensive library access'],
      order: 4,
      created_at: '2024-01-04T00:00:00Z'
    }
  ];

  // Compile list of technologies dynamically for filters
  const allTechs = ['All', ...Array.from(new Set(localProjects.flatMap(p => p.technologies_names)))];

  // Filtering & Search
  const filteredProjects = localProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) || 
                          project.description.toLowerCase().includes(search.toLowerCase());
    const matchesTech = selectedTech === 'All' || project.technologies_names.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  // Pagination calculation
  const indexOfLastProj = currentPage * projectsPerPage;
  const indexOfFirstProj = indexOfLastProj - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProj, indexOfLastProj);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

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
            My Portfolio Projects
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
            A curated list of applications I've built, reflecting design, architecture, and coding paradigms.
          </motion.p>
        </div>

        {/* Filters & Search bars */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-white text-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Tech Filter pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allTechs.map(tech => (
              <button
                key={tech}
                onClick={() => { setSelectedTech(tech); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                  selectedTech === tech
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slatebg-card text-slatefg-muted dark:text-slatefg-dark/80 hover:bg-slate-100 dark:hover:bg-slatebg-border border border-slate-200 dark:border-slatebg-border/60'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <LoadingSkeleton type="project" count={3} />
          ) : currentProjects.length > 0 ? (
            currentProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 12px 35px rgba(0, 0, 0, 0.08)' }}
                className="bg-white dark:bg-slatebg-card border border-slate-200/50 dark:border-slatebg-border/40 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full"
              >
                {/* Project Image banner */}
                <div className="relative h-48 bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slatebg-border dark:to-slate-800 flex items-center justify-center overflow-hidden group">
                  {project.image ? (
                    <img
                      src={project.image.startsWith('http') ? project.image : `http://127.0.0.1:8000${project.image}`}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-center group-hover:scale-105 transition-transform duration-300">
                      <span className="text-5xl block">💻</span>
                      <span className="text-xs font-bold text-slatefg-muted mt-2 block">Tadese Mesfin Project</span>
                    </div>
                  )}
                  {/* Floating index */}
                  <div className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full font-inter">
                    App {project.order || idx + 1}
                  </div>
                </div>

                {/* Card Content details */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slatefg-muted dark:text-slatefg-dark/85 font-inter leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology labels */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies_names.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] font-semibold tracking-wide bg-slate-100 dark:bg-slatebg-border text-slatefg-muted dark:text-slatefg-dark/90 px-2.5 py-1 rounded-md font-inter"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slatebg-border/60">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1.5 text-xs text-primary dark:text-secondary-light font-bold hover:underline"
                    >
                      <FaListUl /> Features
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={formatUrl(project.github_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slatebg-border dark:hover:bg-slate-700 text-slatefg-muted dark:text-white transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href={formatUrl(project.live_url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-primary hover:bg-secondary text-white transition-colors"
                        aria-label="Live Demo Link"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 glass-panel rounded-2xl text-slatefg-muted">
              No projects found matching current filter criteria.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border text-slatefg-muted dark:text-slatefg-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-9 h-9 text-xs font-semibold rounded-xl transition-all ${
                  currentPage === i + 1
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slatebg-card text-slatefg-muted dark:text-slatefg-dark border border-slate-200 dark:border-slatebg-border hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border text-slatefg-muted dark:text-slatefg-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Details Features Drawer Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border rounded-3xl shadow-2xl p-8 overflow-hidden z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              <h4 className="text-2xl font-bold text-slate-800 dark:text-white border-b pb-4 mb-6 border-slate-200 dark:border-slatebg-border">
                {selectedProject.name} — Feature Matrix
              </h4>

              <p className="text-slatefg-muted dark:text-slatefg-dark/80 text-sm sm:text-base leading-relaxed mb-6 font-inter">
                {selectedProject.description}
              </p>

              <div className="space-y-4">
                <h5 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider font-inter">
                  Core Implementation Features:
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProject.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-3 text-slate-700 dark:text-slatefg-dark/80 font-inter text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slatebg-border/60">
                <a
                  href={formatUrl(selectedProject.github_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 py-3 bg-slate-100 dark:bg-slatebg-border dark:hover:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-white font-bold rounded-2xl transition-all"
                >
                  <FaGithub /> Source Code
                </a>
                <a
                  href={formatUrl(selectedProject.live_url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-2xl transition-all"
                >
                  <FaExternalLinkAlt /> Live Deployment
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
