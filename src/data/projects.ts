export interface Project {
  slug: string;
  title: string;
  description: string;
  overview: string;
  technologies: string[];
  features: string[];
  github: string;
  live: string;
}

export const projects: Project[] = [
  {
    slug: "career-dock",
    title: "Career Dock",
    description: "Job Application Tracking Web App.",
    overview:
      "Career Dock is a comprehensive job application tracking platform built to streamline the job search process. It allows users to manage their job applications, track tasks, and leverage AI-powered suggestions for resumes, LinkedIn profiles, and cover letters. The app features premium subscription support through Lemon Squeezy and secure authentication via Clerk.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Clerk",
      "Lemon Squeezy",
      "Gemini AI",
      "Vercel",
    ],
    features: [
      "Built an end-to-end Next.js + TypeScript web app with Express.js and MongoDB, supporting job tracking, task management, and premium features with Clerk + Lemon Squeezy.",
      "Integrated real-time interactive charts and dashboards, using AI (Gemini) to suggest optimized resumes, LinkedIn profiles, and cover letters.",
      "Architected secure auth flows and subscription logic, following RESTful standards and deploying to Vercel with seamless CI/CD pipeline integration.",
    ],
    github: "",
    live: "",
  },
  {
    slug: "baby-care-store",
    title: "Baby Care Store",
    description: "An ecommerce web application for baby care accessories.",
    overview:
      "Baby Care Store is a full-featured ecommerce platform designed for baby care products and accessories. It provides a smooth shopping experience with product browsing, cart management, and checkout functionality. The platform includes separate dashboards for customers to track orders and for administrators to manage products, users, and order statuses.",
    technologies: [
      "Next.js",
      "React",
      "Redux",
      "TypeScript",
      "Tailwind",
      "ShadCN",
      "Prisma",
      "PostgreSQL",
    ],
    features: [
      "Implemented ecommerce features including view products, add to cart, and checkout. Dashboard for users to manage previous order and current order status.",
      "Implemented Dashboard for admin to manage products and users. Add new products. Manage all order status.",
    ],
    github: "https://github.com/ctafsiras/baby-care-store",
    live: "https://baby-care-store-three.vercel.app",
  },
  {
    slug: "bake-n-treat",
    title: "Bake N Treat",
    description: "A bakery ecommerce website for delicious treats.",
    overview:
      "Bake N Treat is a visually appealing bakery ecommerce platform that enables customers to browse and purchase baked goods online. The application features a complete shopping experience with Stripe payment integration, user authentication through NextAuth.js, and a responsive design that showcases bakery products beautifully across all devices.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "MongoDB",
      "NextAuth.js",
    ],
    features: [
      "Implemented a full-featured ecommerce platform with product listings, shopping cart, and secure checkout using Stripe.",
      "Created a user authentication system with NextAuth.js for customer accounts and order history.",
      "Designed a responsive and visually appealing interface showcasing bakery products.",
    ],
    github: "https://github.com/ctafsiras/bake-n-treat",
    live: "https://bake-n-treat.vercel.app",
  },
  {
    slug: "legal-fist-exam",
    title: "Legal Fist Exam",
    description: "A MCQ based exam taking web application for law students.",
    overview:
      "Legal Fist Exam is a specialized MCQ examination platform built for law students preparing for legal exams. The application supports timed exams with instant result display and comprehensive report cards for exam history. Deployed on DigitalOcean with Ubuntu, the platform has served over 440 students who have taken exams more than 3,000 times.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "GitHub",
      "Digital Ocean",
      "Ubuntu",
    ],
    features: [
      "Implemented an MCQ exam feature with a timer, instant result display, and a report card for exam history. Where almost 440 students gave exams over 3000 times.",
      "Deployed the application on Digital Ocean with an Ubuntu server, integrated with GitHub for continuous integration and deployment.",
    ],
    github: "",
    live: "https://exam.legalfist.com",
  },
  {
    slug: "mind-the-blog",
    title: "Mind The Blog",
    description:
      "A smart reminder for the latest article of all of your favorite blog sites.",
    overview:
      "Mind The Blog is a productivity tool that keeps users updated with the latest articles from their favorite blog sites. Users can subscribe to blogs and receive automated email notifications via Mailgun whenever new content is published. The application features secure authentication through Next Auth and a responsive design optimized for both mobile and desktop.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "ShadCN",
      "Prisma",
      "Next Auth",
      "MongoDB",
    ],
    features: [
      "Implemented Mailgun to send automated emails to users whenever their favorite blog publishes a new article.",
      "Responsive design optimized for both mobile and desktop devices.",
    ],
    github: "https://github.com/ctafsiras/mind-the-blog.git",
    live: "https://mindtheblog.vercel.app",
  },
];
