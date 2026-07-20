import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft, FaCalendarAlt, FaEye, FaFolderOpen } from 'react-icons/fa';
import api from '../services/api';
import { Blog } from '../types';
import PageLoader from '../components/PageLoader';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blogs/${slug}/`);
        setPost(res.data);
      } catch (err) {
        console.warn('API error fetching article details, checking fallback database');
        // Check local mock entries
        const fallbacks: Blog[] = [
          {
            id: 1,
            title: 'Building Scalable Architectures with Django and React',
            slug: 'building-scalable-architectures-with-django-and-react',
            content: `When building full stack web applications, structuring your codebase and communication layer efficiently is paramount. React handles rendering state-of-the-art UI elements, while Django REST Framework processes business logic and data securely.\n\n### Key Architectural Practices\n1. **Decoupled Deployment**: Hosting React on Vercel and Django on Railway minimizes costs and scales services independently.\n2. **State Management**: Using Redux or React Context API avoids prop drilling.\n3. **Token Authentication**: Secure JWT rotation protects admin routes.\n\nIntegrating these practices ensures that your application is reliable, fast, and production-ready.`,
            image: null,
            category_name: 'Web Development',
            category_details: { id: 1, name: 'Web Development', slug: 'web-development' },
            created_at: '2024-06-15T12:00:00Z',
            updated_at: '2024-06-15T12:00:00Z',
            views: 43,
            is_published: true
          },
          {
            id: 2,
            title: "Why I'm Pursuing an International Master's in Data Science",
            slug: 'why-im-pursuing-an-international-masters-in-data-science',
            content: `The world is filled with massive streams of unstructured data. Processing, analyzing, and translating this data into actionable insights is the ultimate frontier of modern Computer Science.\n\nMy undergraduate journey in Computer Science opened my eyes to the mathematical elegance of machine learning algorithms. Through a Master's degree, I intend to dive deeper into:\n- Deep Neural Networks and Transformers\n- Ethical AI and Algorithmic Bias mitigation\n- Distributed Big Data Systems (Hadoop, Spark)\n\nI am currently actively applying for scholarships in Europe, USA, and Canada to realize this dream.`,
            image: null,
            category_name: 'Artificial Intelligence',
            category_details: { id: 2, name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
            created_at: '2024-07-02T10:30:00Z',
            updated_at: '2024-07-02T10:30:00Z',
            views: 126,
            is_published: true
          }
        ];
        const matched = fallbacks.find(b => b.slug === slug);
        if (matched) {
          setPost(matched);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slatebg-dark p-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Article not found</h3>
        <p className="text-slatefg-muted dark:text-slatefg-dark/80 mt-2">The post you are looking for does not exist.</p>
        <Link to="/blog" className="mt-6 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold">
          Return to Blog List
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-28 bg-slate-50 dark:bg-slatebg-dark transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-slatefg-muted hover:text-primary dark:text-slatefg-dark/80 dark:hover:text-primary transition-colors font-semibold"
          >
            <FaArrowLeft /> Back to Articles
          </Link>
        </div>

        {/* Article Container */}
        <article className="bg-white dark:bg-slatebg-card border border-slate-200/50 dark:border-slatebg-border/40 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Header Metadata */}
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 items-center text-xs sm:text-sm text-slatefg-muted dark:text-slatefg-dark/60 font-inter border-b border-slate-100 dark:border-slatebg-border/60 pb-6">
              <span className="flex items-center gap-2">
                <FaCalendarAlt />
                {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <FaEye /> {post.views} views
              </span>
              {post.category_name && (
                <span className="flex items-center gap-2 bg-slate-100 dark:bg-slatebg-border px-3 py-1 rounded-full font-semibold">
                  <FaFolderOpen /> {post.category_name}
                </span>
              )}
            </div>
          </div>

          {/* Banner image if available */}
          {post.image && (
            <div className="w-full max-h-[350px] overflow-hidden rounded-2xl mb-8 shadow-sm">
              <img
                src={post.image.startsWith('http') ? post.image : `http://127.0.0.1:8000${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Markdown Content Parser */}
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed dark:prose-p:text-slatefg-dark/95 prose-a:text-primary dark:prose-a:text-secondary-light prose-li:font-inter prose-code:bg-slate-100 dark:prose-code:bg-slatebg-border prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

        </article>

      </div>
    </section>
  );
};

export default BlogPost;
