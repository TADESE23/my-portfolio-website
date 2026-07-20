import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaUserShield, FaLock, FaUser } from 'react-icons/fa';

const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect straight away
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setError('');

    const success = await login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid username or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slatebg-dark py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border/60 rounded-3xl p-8 shadow-xl space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-2">
            <FaUserShield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Portal</h2>
          <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/65 font-inter">
            Log in to manage your portfolio records, skills, and check contact inputs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/70 font-inter">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter admin username"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-inter"
              />
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/70 font-inter">
              Secure Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-inter"
              />
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/25 text-rose-500 rounded-xl text-xs font-semibold font-inter">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-secondary text-white font-bold rounded-2xl shadow-md transition-all duration-300 font-inter text-sm"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
