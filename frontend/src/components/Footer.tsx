import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTelegramPlane, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/TADESE23', icon: <FaGithub className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tadese-mesfin-mesfin-045412398', icon: <FaLinkedin className="w-5 h-5" /> },
    { name: 'Telegram', url: 'https://t.me/Mtade23', icon: <FaTelegramPlane className="w-5 h-5" /> },
    { name: 'Email', url: 'mailto:tadesemesfin23@gmail.com', icon: <FaEnvelope className="w-5 h-5" /> },
  ];

  return (
    <footer className="bg-white dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slatebg-border/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand/About */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Tadese Mesfin.
            </Link>
            <p className="text-sm text-slatefg-muted dark:text-slatefg-dark/75 max-w-sm">
              Computer Science graduate building scalable, full-stack systems. Specialized in Django, React, AI, and seeking international scholarships.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-primary dark:bg-slatebg-card dark:hover:bg-primary text-slatefg-muted dark:text-slatefg-dark hover:text-white dark:hover:text-white transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-slatefg-muted dark:text-slatefg-dark uppercase font-inter">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slatefg-muted hover:text-primary dark:text-slatefg-dark/80 dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slatefg-muted hover:text-primary dark:text-slatefg-dark/80 dark:hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm text-slatefg-muted hover:text-primary dark:text-slatefg-dark/80 dark:hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slatefg-muted hover:text-primary dark:text-slatefg-dark/80 dark:hover:text-primary transition-colors">
                  Blog Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-slatefg-muted dark:text-slatefg-dark uppercase font-inter">
              Newsletter
            </h3>
            <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/75">
              Subscribe to get notified on new articles, research updates, or coding tutorials.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-slatefg-muted dark:text-slatefg-dark"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-secondary rounded-xl shadow transition-all duration-300"
              >
                {subscribed ? 'Subscribed! 🎉' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slatebg-border/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/60">
            &copy; {new Date().getFullYear()} Tadese Mesfin. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/admin" className="text-xs text-slatefg-muted hover:text-primary dark:text-slatefg-dark/60 dark:hover:text-primary">
              Admin Login
            </Link>
            <span className="text-slatefg-muted dark:text-slatefg-dark/40 text-xs">|</span>
            <span className="text-xs text-slatefg-muted dark:text-slatefg-dark/60">Designed for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
