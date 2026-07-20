# 🚀 Tadese Mesfin — Full Stack Portfolio

A **complete, production-ready portfolio website** built with React 19 + Django 5, featuring a premium UI with glassmorphism, particle animations, dark/light mode, and a fully functional admin dashboard.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Django 5, Django REST Framework, SimpleJWT |
| **Database** | SQLite (local dev) / PostgreSQL (production) |
| **Deployment** | Vercel / Netlify (frontend), Render / Railway (backend) |

---

## ✅ Features

### Frontend
- 🎨 **Premium UI** — Glassmorphism, gradient backgrounds, smooth animations
- 🌙 **Dark / Light Mode** — System preference detection + manual toggle
- ⌨️ **Typing Animation** — Multi-word typewriter effect on hero section
- 🐭 **Custom Cursor** — Luxury mouse trail effect (desktop only)
- 🌐 **Particle Background** — Interactive canvas mesh animation
- 📊 **Animated Counters** — Real-time statistics on the home page
- 🔎 **Project Search & Filter** — Live filtering by technology stack
- 📄 **Pagination** — Elegant multi-page project listing
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- ♿ **Accessible** — ARIA labels, keyboard navigation, semantic HTML
- 🚀 **SEO Ready** — Meta tags, Open Graph, structured data

### Backend
- 🔐 **JWT Authentication** — Secure admin login with token refresh
- 🗄️ **REST APIs** — Full CRUD for projects, skills, blogs, certifications, messages
- 📧 **Email Notifications** — Contact form triggers SMTP email alerts
- 🖼️ **Media Uploads** — Profile images, project screenshots, CV files
- 🛡️ **Django Admin** — Built-in admin for database management

### Admin Dashboard
- 📈 **Statistics Overview** — Projects, skills, articles, messages counts
- 👤 **Profile Management** — Update name, bio, CV, profile photo
- 🗂️ **Project CRUD** — Add, edit, delete projects with images and tech tags
- 💡 **Skills CRUD** — Manage skill levels and categories
- 📜 **Certificates CRUD** — Publish certifications with verification links
- 📝 **Blog CRUD** — Write Markdown articles with category tagging
- 📬 **Messages Inbox** — Read, mark-as-read, delete contact submissions

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 18+
- pip / npm

---

### 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Seed the database with Tadese's portfolio data + create admin
python manage.py seed_data

# Start development server
python manage.py runserver
```

> **Admin credentials (after seed_data):**
> - Username: `admin`
> - Password: `admin123`

The backend API will be available at: `http://127.0.0.1:8000`

---

### 2. Frontend Setup

```bash
cd frontend

# Install all dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

---

## 🐳 Docker Compose (Full Stack)

Start everything with one command:

```bash
docker-compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- PostgreSQL DB: `localhost:5432`

---

## 🌍 Deployment

### Frontend → Vercel

1. Push `frontend/` folder to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Set environment variable:
   - `VITE_API_BASE_URL` = your Railway/Render backend URL

### Frontend → Netlify

1. Push `frontend/` to GitHub
2. Import at [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set `VITE_API_BASE_URL` environment variable

---

### Backend → Railway

1. Create a new project at [railway.app](https://railway.app)
2. Add PostgreSQL database service
3. Deploy the `backend/` directory
4. Set environment variables:
   - `SECRET_KEY`
   - `DATABASE_URL` (auto-provided by Railway)
   - `CORS_ALLOWED_ORIGINS` = your Vercel/Netlify URL
   - `DEBUG=False`

### Backend → Render

1. Create Web Service at [render.com](https://render.com)
2. Root Directory: `backend`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `gunicorn portfolio.wsgi:application`
5. Add environment variables (same as Railway)

---

## 📁 Project Structure

```
new profile/
├── backend/
│   ├── portfolio/
│   │   ├── apps/
│   │   │   ├── authentication/   # JWT user endpoint
│   │   │   ├── projects/         # Projects + Technologies
│   │   │   ├── blogs/            # Blog posts + Categories
│   │   │   ├── skills/           # Skills matrix
│   │   │   ├── resume/           # Profile, Education, Experience, Certs
│   │   │   └── contact/          # Contact form + Messages
│   │   ├── settings.py
│   │   └── urls.py
│   ├── requirements.txt
│   ├── manage.py
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── animations/       # Framer Motion presets
│   │   ├── components/       # Navbar, Footer, Cursor, Skeletons...
│   │   ├── contexts/         # ThemeContext, AuthContext
│   │   ├── layouts/          # MainLayout wrapper
│   │   ├── pages/            # All 9 public pages + Admin Dashboard
│   │   ├── services/         # api.ts (Axios), github.ts
│   │   └── types/            # TypeScript interfaces
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── Dockerfile
│
└── docker-compose.yml
```

---

## 🔑 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/resume/profile/` | Portfolio owner profile |
| `GET /api/projects/` | All projects list |
| `GET /api/skills/` | Skills matrix |
| `GET /api/resume/education/` | Education timeline |
| `GET /api/resume/experience/` | Work experience timeline |
| `GET /api/resume/certificates/` | Certifications list |
| `GET /api/blogs/` | All blog posts |
| `GET /api/blogs/{slug}/` | Single blog post |
| `POST /api/contact/messages/` | Submit contact form |
| `POST /api/token/` | Get JWT access + refresh tokens |
| `POST /api/token/refresh/` | Refresh access token |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#2563EB` |
| Secondary | `#7C3AED` |
| Accent | `#06B6D4` |
| Dark Background | `#0F172A` |
| Light Background | `#F8FAFC` |
| Font | Poppins / Inter (Google Fonts) |

---

## 📄 License

MIT — Free to use and adapt for personal portfolio purposes.

---

> Built with ❤️ by **Tadese Mesfin** — Computer Science Graduate | Full Stack Developer | AI Enthusiast
