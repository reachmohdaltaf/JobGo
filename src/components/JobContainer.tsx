import JobCard from "./JobCard";

const JobContainer = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Webvolty",
      experience: "1-3 Yrs",
      location: "Surat",
      description: "Optimize applications for maximum speed and performance",
      posted: "3+ weeks ago",
      initial: "W",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "TechNova",
      experience: "2-5 Yrs",
      location: "Bangalore",
      description: "Build and maintain scalable backend systems",
      posted: "1 week ago",
      initial: "T",
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "DevWorks",
      experience: "0-2 Yrs",
      location: "Delhi",
      description: "Work on both frontend and backend parts of the product",
      posted: "5 days ago",
      initial: "D",
    },
    {
      id: 4,
      title: "Full Stack Engineer",
      company: "DevWorks",
      experience: "0-2 Yrs",
      location: "Delhi",
      description: "Work on both frontend and backend parts of the product",
      posted: "5 days ago",
      initial: "D",
    },
    {
      id: 5,
      title: "Full Stack Engineer",
      company: "DevWorks",
      experience: "0-2 Yrs",
      location: "Delhi",
      description: "Work on both frontend and backend parts of the product",
      posted: "5 days ago",
      initial: "D",
    },
  ];

  return (
    <div className="space-y-2 w-full">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};

export default JobContainer;
