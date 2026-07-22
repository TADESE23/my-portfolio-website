import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFolder, FaGraduationCap, FaTools, FaCertificate, FaBook, 
  FaEnvelope, FaUser, FaPlus, FaEdit, FaTrash, FaCheckCircle, 
  FaRegEnvelopeOpen, FaUpload, FaEye 
} from 'react-icons/fa';
import api from '../services/api';
import { Project, Skill, Certificate, Blog, Message, Profile, Category, Education, Experience, SocialLink } from '../types';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stats' | 'profile' | 'projects' | 'skills' | 'certificates' | 'blogs' | 'messages' | 'education' | 'experience' | 'socials'>('stats');
  
  // Data lists
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [technologies, setTechnologies] = useState<{id: number, name: string}[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isEditing, setIsEditing] = useState<number | null>(null); // ID of item being edited
  const [editingType, setEditingType] = useState<'create' | 'update'>('create');
  
  // Feedback prompts
  const [alert, setAlert] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  // Form model fields
  const [projectForm, setProjectForm] = useState({ name: '', description: '', github_url: '', live_url: '', technologies: '', features: '', order: 0 });
  const [skillForm, setSkillForm] = useState({ name: '', percentage: 80, category: 'frontend', icon: '' });
  const [certForm, setCertForm] = useState({ name: '', issuer: '', date: '', description: '', url: '' });
  const [blogForm, setBlogForm] = useState({ title: '', content: '', category: '', is_published: true });
  const [profileForm, setProfileForm] = useState({ name: '', title: '', about: '', email: '', phone: '', location: '', mission: '', vision: '', goals: '', achievements: '' });
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', current: false, description: '' });
  const [expForm, setExpForm] = useState({ company: '', position: '', location: '', start_date: '', end_date: '', current: false, description: '' });
  const [socialForm, setSocialForm] = useState({ platform: '', url: '', icon: '' });

  // File uploads
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [certImageFile, setCertImageFile] = useState<File | null>(null);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);

  const triggerAlert = (type: 'success' | 'error', msg: string) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 5000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profRes, projRes, skillRes, certRes, blogRes, catRes, techRes, msgRes, eduRes, expRes, socRes] = await Promise.all([
        api.get('/resume/profile/'),
        api.get('/projects/'),
        api.get('/skills/'),
        api.get('/resume/certificates/'),
        api.get('/blogs/'),
        api.get('/blogs/categories/'),
        api.get('/projects/technologies/'),
        api.get('/contact/messages/'),
        api.get('/resume/education/'),
        api.get('/resume/experience/'),
        api.get('/resume/sociallinks/'),
      ]);

      if (profRes.data && profRes.data.length > 0) {
        setProfile(profRes.data[0]);
        setProfileForm(profRes.data[0]);
      }
      setProjects(projRes.data);
      setSkills(skillRes.data);
      setCerts(certRes.data);
      setBlogs(blogRes.data);
      setCategories(catRes.data);
      setTechnologies(techRes.data);
      setMessages(msgRes.data);
      setEducations(eduRes.data);
      setExperiences(expRes.data);
      setSocials(socRes.data);
    } catch (err) {
      console.error('Error fetching dashboard datasets:', err);
      triggerAlert('error', 'Failed to retrieve records from the database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // --- Profile CRUD Operations ---
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    const formData = new FormData();
    Object.entries(profileForm).forEach(([key, value]) => {
      if (key !== 'profile_image' && key !== 'cv' && value !== null) {
        formData.append(key, value as string);
      }
    });

    if (cvFile) formData.append('cv', cvFile);
    if (profileImageFile) formData.append('profile_image', profileImageFile);

    try {
      const res = await api.patch(`/resume/profile/${profile.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(res.data);
      triggerAlert('success', 'Profile information updated successfully!');
      setCvFile(null);
      setProfileImageFile(null);
    } catch (err) {
      triggerAlert('error', 'Failed to update profile.');
    }
  };

  // --- Projects CRUD Operations ---
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', projectForm.name);
    formData.append('description', projectForm.description);
    formData.append('github_url', projectForm.github_url);
    formData.append('live_url', projectForm.live_url);
    formData.append('order', String(projectForm.order));
    
    // Parse technologies string into list of technology primary keys
    // For simplicity, we can let user link them or create on backend, but here let's link or let backend manage.
    // If backend expects tech IDs: we can just send comma-separated and let backend handle, or send names.
    // Let's check our project serializer: it accepts direct IDs list.
    // For simplicity, let's create dynamic tech if needed or map matching techs. Let's send IDs of matching techs.
    // In local db we mapped React, Node.js, MySQL, etc. Let's append tech names
    // Actually, in our serializer: `technologies` is a list of primary keys.
    // Let's resolve the technology string to technology primary keys.
    // Resolve technology names to primary keys using project technologies list
    const techNames = projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean);
    const techIds: number[] = [];
    for (const name of techNames) {
      // Find matching tech in the technologies state
      let match = technologies.find(t => t.name.toLowerCase() === name.toLowerCase());
      if (!match) {
        try {
          const res = await api.post('/projects/technologies/', { name });
          match = res.data;
          // Refresh technologies list
          setTechnologies(prev => [...prev, res.data]);
        } catch (ex) {
          // ignore or fallback
        }
      }
      if (match) techIds.push(match.id);
    }
    
    techIds.forEach(id => formData.append('technologies', String(id)));

    // Parse features list
    const featuresList = projectForm.features.split('\n').map(f => f.trim()).filter(Boolean);
    formData.append('features', JSON.stringify(featuresList));

    if (projectImageFile) formData.append('image', projectImageFile);

    try {
      if (editingType === 'create') {
        const res = await api.post('/projects/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setProjects(prev => [...prev, res.data]);
        triggerAlert('success', 'Project created successfully!');
      } else {
        const res = await api.patch(`/projects/${isEditing}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setProjects(prev => prev.map(p => p.id === isEditing ? res.data : p));
        triggerAlert('success', 'Project updated successfully!');
      }
      setIsEditing(null);
      setProjectForm({ name: '', description: '', github_url: '', live_url: '', technologies: '', features: '', order: 0 });
      setProjectImageFile(null);
    } catch (err) {
      triggerAlert('error', 'Failed to save project.');
    }
  };

  const startEditProject = (p: Project) => {
    setIsEditing(p.id);
    setEditingType('update');
    setProjectForm({
      name: p.name,
      description: p.description,
      github_url: p.github_url,
      live_url: p.live_url,
      technologies: p.technologies_names ? p.technologies_names.join(', ') : '',
      features: p.features ? p.features.join('\n') : '',
      order: p.order || 0
    });
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}/`);
      setProjects(prev => prev.filter(p => p.id !== id));
      triggerAlert('success', 'Project deleted successfully.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete project.');
    }
  };

  // --- Skills CRUD ---
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingType === 'create') {
        const res = await api.post('/skills/', skillForm);
        setSkills(prev => [...prev, res.data]);
        triggerAlert('success', 'Skill added successfully!');
      } else {
        const res = await api.patch(`/skills/${isEditing}/`, skillForm);
        setSkills(prev => prev.map(s => s.id === isEditing ? res.data : s));
        triggerAlert('success', 'Skill updated successfully!');
      }
      setIsEditing(null);
      setSkillForm({ name: '', percentage: 80, category: 'frontend', icon: '' });
    } catch (err) {
      triggerAlert('error', 'Failed to save skill.');
    }
  };

  const deleteSkill = async (id: number) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}/`);
      setSkills(prev => prev.filter(s => s.id !== id));
      triggerAlert('success', 'Skill deleted.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete skill.');
    }
  };

  // --- Certificates CRUD ---
  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(certForm).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (certImageFile) formData.append('image', certImageFile);

    try {
      if (editingType === 'create') {
        const res = await api.post('/resume/certificates/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setCerts(prev => [...prev, res.data]);
        triggerAlert('success', 'Certificate created!');
      } else {
        const res = await api.patch(`/resume/certificates/${isEditing}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setCerts(prev => prev.map(c => c.id === isEditing ? res.data : c));
        triggerAlert('success', 'Certificate updated!');
      }
      setIsEditing(null);
      setCertForm({ name: '', issuer: '', date: '', description: '', url: '' });
      setCertImageFile(null);
    } catch (err) {
      triggerAlert('error', 'Failed to save certificate.');
    }
  };

  const deleteCert = async (id: number) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await api.delete(`/resume/certificates/${id}/`);
      setCerts(prev => prev.filter(c => c.id !== id));
      triggerAlert('success', 'Certificate deleted.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete certificate.');
    }
  };

  // --- Blogs CRUD ---
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogForm.title);
    formData.append('content', blogForm.content);
    formData.append('is_published', String(blogForm.is_published));
    
    // category lookup or create
    let catMatch = categories.find(c => c.name.toLowerCase() === blogForm.category.toLowerCase());
    if (!catMatch && blogForm.category) {
      try {
        const res = await api.post('/blogs/categories/', { name: blogForm.category });
        catMatch = res.data;
        setCategories(prev => [...prev, res.data]);
      } catch (ex) { /* ignored */ }
    }
    if (catMatch) formData.append('category', String(catMatch.id));
    if (blogImageFile) formData.append('image', blogImageFile);

    try {
      if (editingType === 'create') {
        const res = await api.post('/blogs/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setBlogs(prev => [...prev, res.data]);
        triggerAlert('success', 'Blog article created!');
      } else {
        // Blog API uses slug as lookup_field, resolve slug from current blog list
        const originalBlog = blogs.find(b => b.id === isEditing);
        const patchSlug = originalBlog ? originalBlog.slug : String(isEditing);
        const res = await api.patch(`/blogs/${patchSlug}/`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setBlogs(prev => prev.map(b => b.id === isEditing ? res.data : b));
        triggerAlert('success', 'Blog article updated!');
      }
      setIsEditing(null);
      setBlogForm({ title: '', content: '', category: '', is_published: true });
      setBlogImageFile(null);
    } catch (err) {
      triggerAlert('error', 'Failed to save blog.');
    }
  };

  const deleteBlog = async (slugStr: string, id: number) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.delete(`/blogs/${slugStr}/`);
      setBlogs(prev => prev.filter(b => b.id !== id));
      triggerAlert('success', 'Blog post removed.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete blog.');
    }
  };

  // --- Education CRUD Operations ---
  const handleEduSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...eduForm,
      end_date: eduForm.current ? null : (eduForm.end_date || null)
    };
    try {
      if (editingType === 'create') {
        const res = await api.post('/resume/education/', payload);
        setEducations(prev => [...prev, res.data]);
        triggerAlert('success', 'Education record added!');
      } else {
        const res = await api.patch(`/resume/education/${isEditing}/`, payload);
        setEducations(prev => prev.map(edu => edu.id === isEditing ? res.data : edu));
        triggerAlert('success', 'Education record updated!');
      }
      setIsEditing(null);
      setEduForm({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', current: false, description: '' });
    } catch (err) {
      triggerAlert('error', 'Failed to save education record.');
    }
  };

  const deleteEdu = async (id: number) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      await api.delete(`/resume/education/${id}/`);
      setEducations(prev => prev.filter(e => e.id !== id));
      triggerAlert('success', 'Education record removed.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete education record.');
    }
  };

  // --- Experience CRUD Operations ---
  const handleExpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...expForm,
      end_date: expForm.current ? null : (expForm.end_date || null)
    };
    try {
      if (editingType === 'create') {
        const res = await api.post('/resume/experience/', payload);
        setExperiences(prev => [...prev, res.data]);
        triggerAlert('success', 'Experience record added!');
      } else {
        const res = await api.patch(`/resume/experience/${isEditing}/`, payload);
        setExperiences(prev => prev.map(exp => exp.id === isEditing ? res.data : exp));
        triggerAlert('success', 'Experience record updated!');
      }
      setIsEditing(null);
      setExpForm({ company: '', position: '', location: '', start_date: '', end_date: '', current: false, description: '' });
    } catch (err) {
      triggerAlert('error', 'Failed to save experience record.');
    }
  };

  const deleteExp = async (id: number) => {
    if (!window.confirm('Delete this experience record?')) return;
    try {
      await api.delete(`/resume/experience/${id}/`);
      setExperiences(prev => prev.filter(e => e.id !== id));
      triggerAlert('success', 'Experience record removed.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete experience record.');
    }
  };

  // --- Social Links CRUD Operations ---
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let submitData = { ...socialForm };
      if (submitData.url && !/^https?:\/\//i.test(submitData.url)) {
        submitData.url = 'https://' + submitData.url;
      }

      if (editingType === 'create') {
        const res = await api.post('/resume/sociallinks/', submitData);
        setSocials(prev => [...prev, res.data]);
        triggerAlert('success', 'Social link created!');
      } else {
        const res = await api.patch(`/resume/sociallinks/${isEditing}/`, submitData);
        setSocials(prev => prev.map(soc => soc.id === isEditing ? res.data : soc));
        triggerAlert('success', 'Social link updated!');
      }
      setIsEditing(null);
      setSocialForm({ platform: '', url: '', icon: '' });
    } catch (err: any) {
      const errorMsg = err.response?.data 
        ? (typeof err.response.data === 'object' ? JSON.stringify(err.response.data) : err.response.data)
        : 'Failed to save social link.';
      triggerAlert('error', `Error: ${errorMsg}`);
    }
  };

  const deleteSocial = async (id: number) => {
    if (!window.confirm('Delete this social link?')) return;
    try {
      await api.delete(`/resume/sociallinks/${id}/`);
      setSocials(prev => prev.filter(s => s.id !== id));
      triggerAlert('success', 'Social link removed.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete social link.');
    }
  };

  // --- Messages Operations ---
  const markMessageAsRead = async (id: number) => {
    try {
      const res = await api.patch(`/contact/messages/${id}/`, { is_read: true });
      setMessages(prev => prev.map(m => m.id === id ? res.data : m));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm('Delete this message from DB?')) return;
    try {
      await api.delete(`/contact/messages/${id}/`);
      setMessages(prev => prev.filter(m => m.id !== id));
      triggerAlert('success', 'Message cleared.');
    } catch (err) {
      triggerAlert('error', 'Failed to delete message.');
    }
  };

  // Unread messages count
  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <section className="min-h-screen py-28 bg-slate-50 dark:bg-slatebg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-slate-200 dark:border-slatebg-border/60">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Control Panel
            </h2>
            <p className="text-sm text-slatefg-muted dark:text-slatefg-dark/80 mt-1 font-inter">
              Welcome back, Administrator.
            </p>
          </div>
          <button
            onClick={loadAllData}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border text-slatefg-muted dark:text-white shadow-sm"
          >
            Sync Database
          </button>
        </div>

        {/* Global Feedback Alert */}
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-2xl mb-8 text-sm font-semibold font-inter ${
                alert.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-500'
                  : 'bg-rose-500/10 border border-rose-500/25 text-rose-500'
              }`}
            >
              {alert.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            {[
              { id: 'stats', label: 'Overview Metrics', icon: <FaCheckCircle /> },
              { id: 'profile', label: 'Profile Settings', icon: <FaUser /> },
              { id: 'projects', label: 'Projects Matrix', icon: <FaFolder /> },
              { id: 'skills', label: 'Skills Registry', icon: <FaTools /> },
              { id: 'education', label: 'Education Matrix', icon: <FaGraduationCap /> },
              { id: 'experience', label: 'Experience Logs', icon: <FaFolder /> },
              { id: 'certificates', label: 'Certificates', icon: <FaCertificate /> },
              { id: 'socials', label: 'Social Settings', icon: <FaUser /> },
              { id: 'blogs', label: 'Blogs & Articles', icon: <FaBook /> },
              { id: 'messages', label: `Messages (${unreadCount})`, icon: <FaEnvelope /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setIsEditing(null); }}
                className={`flex items-center gap-3 w-full py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slatebg-card text-slatefg-muted dark:text-slatefg-dark/80 hover:bg-slate-100 dark:hover:bg-slatebg-border border border-slate-200/50 dark:border-slatebg-border/30'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Right Interface Panel */}
          <div className="lg:col-span-9 glass-panel p-8 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slatebg-border/30">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded w-full" />
              </div>
            ) : (
              <>
                {/* --- Metric Statistics Overview Panel --- */}
                {activeTab === 'stats' && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Overview Statistics</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {[
                        { label: 'Projects', val: projects.length, icon: <FaFolder className="text-blue-500" /> },
                        { label: 'Skills Set', val: skills.length, icon: <FaTools className="text-teal-500" /> },
                        { label: 'Certificates', val: certs.length, icon: <FaCertificate className="text-purple-500" /> },
                        { label: 'Articles', val: blogs.length, icon: <FaBook className="text-emerald-500" /> }
                      ].map((s, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slatebg-border/30 p-5 rounded-2xl border border-slate-100 dark:border-slatebg-border/40 text-center">
                          <div className="inline-block p-3 rounded-xl bg-white dark:bg-slatebg-card shadow-sm mb-3">
                            {s.icon}
                          </div>
                          <h4 className="text-2xl font-black text-slate-800 dark:text-white">{s.val}</h4>
                          <p className="text-xs text-slatefg-muted mt-1 font-inter">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Unread message lists quick glance */}
                    <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slatebg-border">
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm">Recent Correspondence Notifications</h4>
                      {messages.filter(m => !m.is_read).slice(0, 3).map(m => (
                        <div key={m.id} className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex justify-between items-center">
                          <div>
                            <p className="text-xs font-semibold text-slate-800 dark:text-white font-inter">{m.name} ({m.email})</p>
                            <p className="text-xs text-slatefg-muted font-inter mt-1 leading-snug">{m.subject}</p>
                          </div>
                          <button
                            onClick={() => { setActiveTab('messages'); }}
                            className="text-xs text-primary dark:text-secondary-light font-bold hover:underline"
                          >
                            Read Mail
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- Profile Editing Info Form Panel --- */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Profile Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">Name</label>
                        <input type="text" value={profileForm.name} onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white text-sm font-inter" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">Title tagline</label>
                        <input type="text" value={profileForm.title} onChange={(e) => setProfileForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white text-sm font-inter" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">Email</label>
                        <input type="email" value={profileForm.email} onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white text-sm font-inter" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">Location</label>
                        <input type="text" value={profileForm.location} onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white text-sm font-inter" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter">About Summary (Bio)</label>
                      <textarea rows={4} value={profileForm.about} onChange={(e) => setProfileForm(p => ({ ...p, about: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slatebg-border bg-slate-50 dark:bg-slatebg-card text-slate-800 dark:text-white text-sm font-inter leading-relaxed" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slatebg-border">
                      {/* File uploads */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter flex items-center gap-1.5"><FaUpload /> Profile Avatar Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setProfileImageFile(e.target.files ? e.target.files[0] : null)} className="w-full text-xs text-slatefg-muted" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 font-inter flex items-center gap-1.5"><FaUpload /> Active Resume PDF</label>
                        <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)} className="w-full text-xs text-slatefg-muted" />
                      </div>
                    </div>

                    <button type="submit" className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all text-sm">
                      Update Profile
                    </button>
                  </form>
                )}

                {/* --- Projects Matrix Registry Tab --- */}
                {activeTab === 'projects' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Projects Listing</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add New
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleProjectSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                          {editingType === 'create' ? 'Register New Project' : 'Edit Project Details'}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Project name" value={projectForm.name} onChange={(e) => setProjectForm(p => ({ ...p, name: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Technologies (comma separated, e.g. React, Node.js)" value={projectForm.technologies} onChange={(e) => setProjectForm(p => ({ ...p, technologies: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="url" placeholder="GitHub Repository link" value={projectForm.github_url} onChange={(e) => setProjectForm(p => ({ ...p, github_url: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="url" placeholder="Live Demo deployment URL" value={projectForm.live_url} onChange={(e) => setProjectForm(p => ({ ...p, live_url: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                        </div>
                        
                        <textarea placeholder="Description" rows={3} value={projectForm.description} onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white leading-relaxed" />
                        <textarea placeholder="Features (one feature per line)" rows={3} value={projectForm.features} onChange={(e) => setProjectForm(p => ({ ...p, features: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white leading-relaxed" />

                        <div className="flex flex-wrap gap-6 items-center">
                          <input type="file" accept="image/*" onChange={(e) => setProjectImageFile(e.target.files ? e.target.files[0] : null)} className="text-xs" />
                          <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 flex items-center gap-1.5">
                            Order:
                            <input type="number" value={projectForm.order} onChange={(e) => setProjectForm(p => ({ ...p, order: Number(e.target.value) }))} className="w-16 px-2 py-1 rounded bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border" />
                          </label>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {projects.map(p => (
                          <div key={p.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{p.name}</p>
                              <p className="text-xs text-slatefg-muted mt-1 leading-snug line-clamp-1">{p.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => startEditProject(p)} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteProject(p.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Skills Tab panel --- */}
                {activeTab === 'skills' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Skills Matrix</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add New
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleSkillSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Add/Edit Skill</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Skill name (e.g. React)" value={skillForm.name} onChange={(e) => setSkillForm(s => ({ ...s, name: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Icon name (e.g. FaReact, SiDjango)" value={skillForm.icon} onChange={(e) => setSkillForm(s => ({ ...s, icon: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          
                          <select value={skillForm.category} onChange={(e) => setSkillForm(s => ({ ...s, category: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white">
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="ai">AI / ML</option>
                            <option value="programming">Programming Languages</option>
                            <option value="tools">Tools / DevOps</option>
                          </select>

                          <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark/80 flex items-center gap-2">
                            Percentage Level (0-100):
                            <input type="number" min="0" max="100" value={skillForm.percentage} onChange={(e) => setSkillForm(s => ({ ...s, percentage: Number(e.target.value) }))} className="w-16 px-2 py-1 rounded bg-white dark:bg-slatebg-card border border-slate-200 dark:border-slatebg-border" />
                          </label>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {skills.map(s => (
                          <div key={s.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{s.name}</p>
                              <p className="text-xs text-slatefg-muted mt-1 uppercase tracking-wider font-inter">{s.category} &bull; {s.percentage}%</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setIsEditing(s.id); setEditingType('update'); setSkillForm(s); }} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteSkill(s.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Certificates Tab Panel --- */}
                {activeTab === 'certificates' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Certificates</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add New
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleCertSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Register Certificate</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Certificate Name" value={certForm.name} onChange={(e) => setCertForm(c => ({ ...c, name: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Issuer (e.g. Meta)" value={certForm.issuer} onChange={(e) => setCertForm(c => ({ ...c, issuer: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="date" value={certForm.date} onChange={(e) => setCertForm(c => ({ ...c, date: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="url" placeholder="Verification URL Link" value={certForm.url} onChange={(e) => setCertForm(c => ({ ...c, url: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                        </div>
                        
                        <textarea placeholder="Description" rows={3} value={certForm.description} onChange={(e) => setCertForm(c => ({ ...c, description: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                        
                        <input type="file" accept="image/*" onChange={(e) => setCertImageFile(e.target.files ? e.target.files[0] : null)} className="text-xs" />

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {certs.map(c => (
                          <div key={c.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{c.name}</p>
                              <p className="text-xs text-slatefg-muted mt-1 font-inter">{c.issuer} &bull; {c.date}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setIsEditing(c.id); setEditingType('update'); setCertForm(c); }} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteCert(c.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Blogs Tab Panel --- */}
                {activeTab === 'blogs' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Blog Management</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add New
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleBlogSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">Publish Blog Article</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Article Title" value={blogForm.title} onChange={(e) => setBlogForm(b => ({ ...b, title: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Category (e.g. Web Development)" value={blogForm.category} onChange={(e) => setBlogForm(b => ({ ...b, category: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                        </div>
                        
                        <textarea placeholder="Markdown Article Body" rows={8} value={blogForm.content} onChange={(e) => setBlogForm(b => ({ ...b, content: e.target.value }))} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white font-mono leading-relaxed" />
                        
                        <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
                          <input type="file" accept="image/*" onChange={(e) => setBlogImageFile(e.target.files ? e.target.files[0] : null)} className="text-xs" />
                          <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark flex items-center gap-2">
                            <input type="checkbox" checked={blogForm.is_published} onChange={(e) => setBlogForm(b => ({ ...b, is_published: e.target.checked }))} />
                            Publish immediately
                          </label>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {blogs.map(b => (
                          <div key={b.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{b.title}</p>
                              <p className="text-xs text-slatefg-muted mt-1 font-inter">{b.category_name} &bull; {b.views} views &bull; {b.is_published ? 'Published' : 'Draft'}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setIsEditing(b.id); setEditingType('update'); setBlogForm({ title: b.title, content: b.content, category: b.category_name || '', is_published: b.is_published }); }} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteBlog(b.slug, b.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Education Tab Panel --- */}
                {activeTab === 'education' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Education Matrix</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); setEduForm({ institution: '', degree: '', field_of_study: '', start_date: '', end_date: '', current: false, description: '' }); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add Record
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleEduSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{editingType === 'create' ? 'Add Education' : 'Edit Education'}</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Institution (e.g. University of Gondar)" value={eduForm.institution} onChange={(e) => setEduForm(prev => ({ ...prev, institution: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Degree (e.g. Bachelor of Science)" value={eduForm.degree} onChange={(e) => setEduForm(prev => ({ ...prev, degree: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Field of Study (e.g. Computer Science)" value={eduForm.field_of_study} onChange={(e) => setEduForm(prev => ({ ...prev, field_of_study: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="date" value={eduForm.start_date} onChange={(e) => setEduForm(prev => ({ ...prev, start_date: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          
                          {!eduForm.current && (
                            <input type="date" value={eduForm.end_date} onChange={(e) => setEduForm(prev => ({ ...prev, end_date: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          )}
                        </div>

                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark flex items-center gap-2">
                          <input type="checkbox" checked={eduForm.current} onChange={(e) => setEduForm(prev => ({ ...prev, current: e.target.checked }))} />
                          Currently studying here
                        </label>

                        <textarea placeholder="Description" rows={4} value={eduForm.description} onChange={(e) => setEduForm(prev => ({ ...prev, description: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {educations.map(edu => (
                          <div key={edu.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{edu.degree} in {edu.field_of_study}</p>
                              <p className="text-xs text-slatefg-muted mt-1 font-inter">{edu.institution} &bull; {edu.start_date} to {edu.current ? 'Present' : edu.end_date}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setIsEditing(edu.id); setEditingType('update'); setEduForm({ institution: edu.institution, degree: edu.degree, field_of_study: edu.field_of_study, start_date: edu.start_date, end_date: edu.end_date || '', current: edu.current, description: edu.description }); }} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteEdu(edu.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Experience Tab Panel --- */}
                {activeTab === 'experience' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Experience Logs</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); setExpForm({ company: '', position: '', location: '', start_date: '', end_date: '', current: false, description: '' }); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add Log
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleExpSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{editingType === 'create' ? 'Add Experience' : 'Edit Experience'}</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Company Name" value={expForm.company} onChange={(e) => setExpForm(prev => ({ ...prev, company: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Position / Role" value={expForm.position} onChange={(e) => setExpForm(prev => ({ ...prev, position: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="Location (e.g. Addis Ababa)" value={expForm.location} onChange={(e) => setExpForm(prev => ({ ...prev, location: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="date" value={expForm.start_date} onChange={(e) => setExpForm(prev => ({ ...prev, start_date: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          
                          {!expForm.current && (
                            <input type="date" value={expForm.end_date} onChange={(e) => setExpForm(prev => ({ ...prev, end_date: e.target.value }))} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          )}
                        </div>

                        <label className="text-xs font-semibold text-slatefg-muted dark:text-slatefg-dark flex items-center gap-2">
                          <input type="checkbox" checked={expForm.current} onChange={(e) => setExpForm(prev => ({ ...prev, current: e.target.checked }))} />
                          Currently working in this role
                        </label>

                        <textarea placeholder="Job Description / Duties" rows={4} value={expForm.description} onChange={(e) => setExpForm(prev => ({ ...prev, description: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {experiences.map(exp => (
                          <div key={exp.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{exp.position}</p>
                              <p className="text-xs text-slatefg-muted mt-1 font-inter">{exp.company} &bull; {exp.location} &bull; {exp.start_date} to {exp.current ? 'Present' : exp.end_date}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setIsEditing(exp.id); setEditingType('update'); setExpForm({ company: exp.company, position: exp.position, location: exp.location, start_date: exp.start_date, end_date: exp.end_date || '', current: exp.current, description: exp.description }); }} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteExp(exp.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Socials Tab Panel --- */}
                {activeTab === 'socials' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Social Settings</h3>
                      {isEditing === null && (
                        <button
                          onClick={() => { setIsEditing(0); setEditingType('create'); setSocialForm({ platform: '', url: '', icon: '' }); }}
                          className="flex items-center gap-1 text-xs bg-primary text-white font-bold py-2 px-4 rounded-xl shadow-sm"
                        >
                          <FaPlus /> Add Social
                        </button>
                      )}
                    </div>

                    {isEditing !== null ? (
                      <form onSubmit={handleSocialSubmit} className="space-y-4 p-6 bg-slate-50 dark:bg-slatebg-border/30 rounded-2xl border border-slate-100 dark:border-slatebg-border/40">
                        <h4 className="font-bold text-sm text-slate-800 dark:text-white">{editingType === 'create' ? 'Add Social Link' : 'Edit Social Link'}</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" placeholder="Platform Name (e.g. GitHub)" value={socialForm.platform} onChange={(e) => setSocialForm(prev => ({ ...prev, platform: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="url" placeholder="URL Address" value={socialForm.url} onChange={(e) => setSocialForm(prev => ({ ...prev, url: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                          <input type="text" placeholder="React Icon Class (e.g. FaGithub, FaTelegramPlane)" value={socialForm.icon} onChange={(e) => setSocialForm(prev => ({ ...prev, icon: e.target.value }))} required className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slatebg-border bg-white dark:bg-slatebg-card text-sm text-slate-800 dark:text-white" />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button type="submit" className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs">Save</button>
                          <button type="button" onClick={() => setIsEditing(null)} className="px-4 py-2 bg-slate-300 text-slate-700 rounded-xl font-bold text-xs">Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        {socials.map(soc => (
                          <div key={soc.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slatebg-border/25 rounded-2xl border border-slate-100 dark:border-slatebg-border/30">
                            <div>
                              <p className="font-bold text-sm text-slate-800 dark:text-white">{soc.platform}</p>
                              <a href={soc.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-inter mt-1 block">{soc.url}</a>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setIsEditing(soc.id); setEditingType('update'); setSocialForm({ platform: soc.platform, url: soc.url, icon: soc.icon }); }} className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg text-xs"><FaEdit /></button>
                              <button onClick={() => deleteSocial(soc.id)} className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg text-xs"><FaTrash /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* --- Messages Panel --- */}
                {activeTab === 'messages' && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Client Communications</h3>
                    
                    <div className="space-y-4">
                      {messages.length > 0 ? (
                        messages.map(m => (
                          <div 
                            key={m.id} 
                            onClick={() => { if (!m.is_read) markMessageAsRead(m.id); }}
                            className={`p-6 rounded-2xl border transition-all duration-300 shadow-sm ${
                              m.is_read 
                                ? 'bg-white dark:bg-slatebg-card border-slate-200/50 dark:border-slatebg-border/30 opacity-75' 
                                : 'bg-primary/5 border-primary/20 dark:border-secondary/20'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 dark:border-slatebg-border pb-3 mb-3">
                              <div>
                                <h4 className="font-bold text-sm text-slate-800 dark:text-white">{m.name}</h4>
                                <p className="text-xs text-slatefg-muted dark:text-slatefg-dark/60 font-inter">{m.email}</p>
                              </div>
                              <span className="text-[10px] font-semibold text-slatefg-muted dark:text-slatefg-dark/50 font-inter">
                                {new Date(m.created_at).toLocaleString()}
                              </span>
                            </div>
                            
                            <p className="text-xs font-bold text-primary dark:text-secondary-light font-inter uppercase tracking-wide">
                              Subject: {m.subject}
                            </p>
                            
                            <p className="text-sm text-slatefg-muted dark:text-slatefg-dark/85 mt-2 leading-relaxed whitespace-pre-line font-inter bg-slate-50 dark:bg-slatebg-border/30 p-3 rounded-xl">
                              {m.message}
                            </p>

                            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slatebg-border/50">
                              <button
                                onClick={() => deleteMessage(m.id)}
                                className="flex items-center gap-1 py-1.5 px-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white text-xs font-bold rounded-xl transition-all"
                              >
                                <FaTrash /> Clear Message
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 glass-panel rounded-2xl text-slatefg-muted">
                          Your inbox is completely clear.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;
