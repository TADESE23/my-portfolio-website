from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.apps.resume.models import Profile, SocialLink, Education, Experience, Certificate
from portfolio.apps.skills.models import Skill
from portfolio.apps.projects.models import Project, Technology
from portfolio.apps.blogs.models import Category, Blog
from datetime import date

class Command(BaseCommand):
    help = 'Seeds the database with Tadese Mesfin\'s portfolio data and default admin credentials'

    def handle(self, *args, **options):
        self.stdout.write("Starting database seeding...")

        # 1. Create Default Admin User
        admin_username = "admin"
        admin_email = "admin@example.com"
        admin_pass = "admin123"
        
        if not User.objects.filter(username=admin_username).exists():
            User.objects.create_superuser(admin_username, admin_email, admin_pass)
            self.stdout.write(self.style.SUCCESS(f"Created superuser: {admin_username} (password: {admin_pass})"))
        else:
            self.stdout.write("Superuser already exists.")

        # 2. Create Profile
        profile, created = Profile.objects.get_or_create(
            name="Tadese Mesfin",
            defaults={
                'title': "Full Stack Developer | AI Enthusiast | Data Science Aspirant",
                'about': (
                    "A Computer Science graduate eager to build next-generation software systems, "
                    "analyze high-velocity datasets, and develop robust, intelligent web applications. "
                    "Seeking global scholarships in AI and Data Science to deepen expertise in machine "
                    "learning, neural networks, and distributed computing."
                ),
                'email': "tadesemesfin23@gmail.com",
                'phone': "+251900000000",
                'location': "Addis Ababa, Ethiopia",
                'mission': "To build intelligent, high-performance software solutions that bridge the gap between human capabilities and automated machine intelligence.",
                'vision': "To become a pioneering researcher and lead engineering teams in developing ethical, scalable AI applications that solve global challenges.",
                'goals': "Secure an international Master's scholarship in AI/Data Science; build impact-driven open-source projects; refine production deployment pipelines.",
                'achievements': "Graduated with BSc in Computer Science and Management from University of Gondar (June 2026); Designed and deployed 4+ production-level web applications; Scaled networking platform userbase.",
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created Profile data."))
        else:
            self.stdout.write("Profile data already exists.")

        # 3. Create Social Links
        socials = [
            ("GitHub", "https://github.com/TADESE23", "FaGithub"),
            ("LinkedIn", "https://www.linkedin.com/in/tadese-mesfin", "FaLinkedin"),
            ("Telegram", "https://t.me/Mtade23", "FaTelegramPlane"),
            ("Email", "mailto:tadesemesfin23@gmail.com", "FaEnvelope"),
        ]
        for platform, url, icon in socials:
            SocialLink.objects.get_or_create(platform=platform, defaults={'url': url, 'icon': icon})
        self.stdout.write(self.style.SUCCESS("Seeded Social Links."))

        # 4. Create Skills
        skills_data = [
            # Frontend
            ("React", 90, "frontend", "FaReact"),
            ("Next.js", 80, "frontend", "SiNextdotjs"),
            ("JavaScript", 92, "frontend", "IoLogoJavascript"),
            ("TypeScript", 85, "frontend", "SiTypescript"),
            ("TailwindCSS", 95, "frontend", "SiTailwindcss"),
            ("Bootstrap", 85, "frontend", "FaBootstrap"),
            ("HTML5", 98, "frontend", "FaHtml5"),
            ("CSS3", 92, "frontend", "FaCss3Alt"),
            
            # Backend
            ("Django", 88, "backend", "SiDjango"),
            ("Flask", 75, "backend", "SiFlask"),
            ("FastAPI", 80, "backend", "SiFastapi"),
            ("Node.js", 85, "backend", "FaNodeJs"),
            ("Express", 82, "backend", "SiExpress"),
            
            # Databases
            ("MySQL", 85, "database", "SiMysql"),
            ("PostgreSQL", 88, "database", "DiPostgresql"),
            ("MongoDB", 78, "database", "SiMongodb"),
            
            # AI & Data Science
            ("TensorFlow", 75, "ai", "SiTensorflow"),
            ("Python", 90, "programming", "FaPython"),
            
            # Tools
            ("Git", 90, "tools", "FaGitAlt"),
            ("GitHub", 92, "tools", "FaGithub"),
            ("Docker", 80, "tools", "FaDocker"),
        ]
        for name, percentage, category, icon in skills_data:
            Skill.objects.get_or_create(name=name, defaults={'percentage': percentage, 'category': category, 'icon': icon})
        self.stdout.write(self.style.SUCCESS("Seeded Skills."))

        # 5. Create Technologies and Projects
        tech_map = {}
        all_techs = ["React", "Node.js", "MySQL", "Express", "Telegram Bot API", "Python", "Django", "Tailwind CSS", "Redux"]
        for tech_name in all_techs:
            tech_obj, _ = Technology.objects.get_or_create(name=tech_name)
            tech_map[tech_name] = tech_obj

        projects_data = [
            {
                "name": "Student Management System",
                "description": "A comprehensive school database system allowing administration to manage student enrollments, attendance, grades, and fee payments efficiently with custom analytics dashboards.",
                "github_url": "https://github.com/TADESE23",
                "live_url": "https://sms-demo.example.com",
                "features": ["Student & Staff Profile Management", "Grade & Attendance Tracking", "Automated Report Card Generation", "Analytical Admin Dashboard"],
                "techs": ["React", "Node.js", "MySQL"],
                "order": 1
            },
            {
                "name": "Human Resource Management System",
                "description": "An enterprise-grade employee resource directory featuring attendance clocks, leave requests approval workflow, payroll management, and interactive performance reports.",
                "github_url": "https://github.com/TADESE23",
                "live_url": "https://hrms-demo.example.com",
                "features": ["Employee Check-in/Check-out", "Leave Management Workflow", "Payroll & Salary Slips Generation", "Role-based access control"],
                "techs": ["React", "Express", "MySQL"],
                "order": 2
            },
            {
                "name": "ProLink Professional Networking Platform",
                "description": "A customized social networking app for professionals to share portfolios, post project collaborations, chat in real-time, and search for specialized remote job postings.",
                "github_url": "https://github.com/TADESE23",
                "live_url": "https://prolink-demo.example.com",
                "features": ["Real-time Instant Messaging", "Post Sharing and Interaction", "Portfolio Linking & Search Filters", "Job Application Portal"],
                "techs": ["React", "Node.js", "MySQL"],
                "order": 3
            },
            {
                "name": "Telegram Exit Exam Bot",
                "description": "An interactive chatbot engineered to help graduating computer science students study for exit examinations by delivering daily quizzes, scoring metrics, and study materials via Telegram.",
                "github_url": "https://github.com/TADESE23",
                "live_url": "https://t.me/exit_exam_bot_demo",
                "features": ["Command-based quiz navigation", "Adaptive learning progress tracking", "Immediate score feedbacks", "Comprehensive library access"],
                "techs": ["Node.js", "Telegram Bot API", "MySQL"],
                "order": 4
            }
        ]

        for p in projects_data:
            proj_obj, created = Project.objects.get_or_create(
                name=p["name"],
                defaults={
                    'description': p["description"],
                    'github_url': p["github_url"],
                    'live_url': p["live_url"],
                    'features': p["features"],
                    'order': p["order"]
                }
            )
            if created or proj_obj:
                proj_obj.technologies.set([tech_map[tname] for tname in p["techs"]])
        
        self.stdout.write(self.style.SUCCESS("Seeded Projects and Technologies."))

        # 6. Education and Experience
        Education.objects.get_or_create(
            institution="University of Gondar",
            degree="Bachelor of Science",
            field_of_study="Computer Science",
            defaults={
                'start_date': date(2021, 9, 1),
                'end_date': date(2026, 6, 30),
                'description': (
                    "Covered core Computer Science disciplines including Software Engineering, Data Structures "
                    "and Algorithms, Database Management Systems, Artificial Intelligence, Machine Learning, "
                    "Web Development, and Computer Networks. Built multiple production-level projects as part "
                    "of coursework and final year capstone."
                ),
                'current': False
            }
        )

        Education.objects.get_or_create(
            institution="University of Gondar",
            degree="Bachelor of Science",
            field_of_study="Management",
            defaults={
                'start_date': date(2021, 9, 1),
                'end_date': date(2026, 6, 30),
                'description': (
                    "Studied organizational and strategic management principles including Business Administration, "
                    "Organizational Behavior, Financial Management, Strategic Management, Human Resource "
                    "Management, and Entrepreneurship.\n\n"
                    "Undergraduate Research: Assessing Risk Management Practices at Ahadu Bank — "
                    "A comprehensive study examining the risk identification, evaluation, and mitigation "
                    "frameworks employed by Ahadu Bank, analyzing operational, credit, and market risk "
                    "management strategies against national banking regulatory standards."
                ),
                'current': False
            }
        )

        Experience.objects.get_or_create(
            company="Local Tech Startup",
            position="Full Stack Developer (Internship)",
            defaults={
                'location': "Addis Ababa",
                'start_date': date(2023, 7, 1),
                'end_date': date(2023, 10, 31),
                'description': "Developed and optimized frontend interfaces using React and Tailwind CSS. BuiltREST API endpoints in Node.js/Express. Wrote unit tests and automated builds via GitHub Actions.",
                'current': False
            }
        )
        self.stdout.write(self.style.SUCCESS("Seeded Education and Experience."))

        # 7. Seed Certifications
        Certificate.objects.get_or_create(
            name="Meta Front-End Developer Professional Certificate",
            issuer="Meta (via Coursera)",
            defaults={
                'date': date(2024, 2, 15),
                'description': "Comprehensive 9-course program covering JavaScript, React, UI/UX, version control with Git, and frontend testing methodologies.",
                'url': "https://coursera.org/verify/meta-frontend"
            }
        )
        Certificate.objects.get_or_create(
            name="DeepLearning.AI TensorFlow Developer",
            issuer="DeepLearning.AI (via Coursera)",
            defaults={
                'date': date(2024, 5, 20),
                'description': "Specialization covering neural network construction, computer vision, natural language processing, and time-series predictions in TensorFlow.",
                'url': "https://coursera.org/verify/tensorflow-developer"
            }
        )
        self.stdout.write(self.style.SUCCESS("Seeded Certifications."))

        # 8. Categories and Blogs
        dev_cat, _ = Category.objects.get_or_create(name="Web Development")
        ai_cat, _ = Category.objects.get_or_create(name="Artificial Intelligence")

        Blog.objects.get_or_create(
            title="Building Scalable Architectures with Django and React",
            defaults={
                'content': (
                    "When building full stack web applications, structuring your codebase and communication layer "
                    "efficiently is paramount. React handles rendering state-of-the-art UI elements, while Django REST "
                    "Framework processes business logic and data securely.\n\n"
                    "### Key Architectural Practices\n"
                    "1. **Decoupled Deployment**: Hosting React on Vercel and Django on Railway minimizes costs and scales services independently.\n"
                    "2. **State Management**: Using Redux or React Context API avoids prop drilling.\n"
                    "3. **Token Authentication**: Secure JWT rotation protects admin routes.\n\n"
                    "Integrating these practices ensures that your application is reliable, fast, and production-ready."
                ),
                'category': dev_cat,
                'is_published': True,
                'views': 42
            }
        )

        Blog.objects.get_or_create(
            title="Why I'm Pursuing an International Master's in Data Science",
            defaults={
                'content': (
                    "The world is filled with massive streams of unstructured data. Processing, analyzing, and "
                    "translating this data into actionable insights is the ultimate frontier of modern Computer Science.\n\n"
                    "My undergraduate journey in Computer Science opened my eyes to the mathematical elegance of "
                    "machine learning algorithms. Through a Master's degree, I intend to dive deeper into:\n"
                    "- Deep Neural Networks and Transformers\n"
                    "- Ethical AI and Algorithmic Bias mitigation\n"
                    "- Distributed Big Data Systems (Hadoop, Spark)\n\n"
                    "I am currently actively applying for scholarships in Europe, USA, and Canada to realize this dream."
                ),
                'category': ai_cat,
                'is_published': True,
                'views': 125
            }
        )
        self.stdout.write(self.style.SUCCESS("Seeded Categories and Blogs."))

        self.stdout.write(self.style.SUCCESS("Seeding completed successfully!"))
