import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "employer@example.com" },
    update: {},
    create: {
      name: "Mock Employer",
      email: "employer@example.com",
      password: "hashed-password", // Ideally hash if you're using auth
      role: "EMPLOYER",
    },
  });

  await prisma.job.createMany({
    data:[
  {
    job_title: "Frontend Developer",
    employer_name: "Pixidux",
    job_description: "Join our team to build responsive and interactive user interfaces using React, Tailwind CSS, and modern design patterns. You'll collaborate with designers and backend engineers to create seamless UI experiences.",
    job_location: "Remote",
    job_employment_type_text: "Full-time",
    job_posted_human_readable: "1 day ago",
    postedById: user.id,
  },
  {
    job_title: "Backend Engineer",
    employer_name: "Devify Corp",
    job_description: "We're looking for a skilled backend developer to design and build APIs using Node.js, Express, and MongoDB. You will also be responsible for integrating third-party services and optimizing performance.",
    job_location: "Bangalore",
    job_employment_type_text: "Full-time",
    job_posted_human_readable: "2 days ago",
    postedById: user.id,
  },
  {
    job_title: "Full Stack Developer",
    employer_name: "CodeCraft",
    job_description: "As a full stack developer, you will take ownership of end-to-end features from frontend design in React to backend logic in Node.js and database integration in MongoDB. Experience with Git and CI/CD pipelines is preferred.",
    job_location: "Delhi",
    job_employment_type_text: "Full-time",
    job_posted_human_readable: "3 days ago",
    postedById: user.id,
  },
  {
    job_title: "UI/UX Designer",
    employer_name: "DesignWave",
    job_description: "We're looking for a creative UI/UX designer to create modern, user-friendly interfaces. You should have a solid understanding of user-centered design principles and tools like Figma, Adobe XD, and prototyping tools.",
    job_location: "Mumbai",
    job_employment_type_text: "Part-time",
    job_posted_human_readable: "4 days ago",
    postedById: user.id,
  },
  {
    job_title: "DevOps Engineer",
    employer_name: "Cloudly",
    job_description: "Manage our cloud infrastructure using AWS, Docker, and Kubernetes. Set up CI/CD pipelines and monitor system health, reliability, and performance to ensure 99.99% uptime.",
    job_location: "Remote",
    job_employment_type_text: "Full-time",
    job_posted_human_readable: "5 days ago",
    postedById: user.id,
  },
  {
    job_title: "Data Analyst",
    employer_name: "Insightlytics",
    job_description: "Analyze large datasets to discover trends and patterns. Work with business teams to deliver actionable insights using SQL, Python, and visualization tools like Tableau or Power BI.",
    job_location: "Hyderabad",
    job_employment_type_text: "Contract",
    job_posted_human_readable: "6 days ago",
    postedById: user.id,
  },
  {
    job_title: "Mobile App Developer",
    employer_name: "AppForge",
    job_description: "Build cross-platform mobile applications using React Native. You will be responsible for optimizing performance, ensuring responsiveness, and deploying apps to both iOS and Android stores.",
    job_location: "Chennai",
    job_employment_type_text: "Full-time",
    job_posted_human_readable: "1 week ago",
    postedById: user.id,
  },
  {
    job_title: "Machine Learning Engineer",
    employer_name: "NeuronTech",
    job_description: "Develop and deploy machine learning models for real-world applications. Must have strong Python skills, experience with TensorFlow/PyTorch, and a deep understanding of ML/DL concepts.",
    job_location: "Remote",
    job_employment_type_text: "Full-time",
    job_posted_human_readable: "8 days ago",
    postedById: user.id,
  }
],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
