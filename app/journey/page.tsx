import { Timeline } from "@/components/timeline";

export const metadata = {
  title: "My Journey | Professional Experience and Education",
  description: "Explore my professional journey, education, and notable projects throughout my career.",
};

const journeyData = [
  {
    title: "Senior Software Engineer",
    date: "2021 - Present",
    content: (
      <div>
        <p>
          Leading development of cloud-native applications using React, Node.js, and AWS. 
          Mentoring junior developers and implementing CI/CD pipelines.
        </p>
        <ul className="mt-4 list-disc pl-5">
          <li>Architected and developed scalable microservices</li>
          <li>Implemented automated testing and deployment workflows</li>
          <li>Reduced application load time by 40% through performance optimizations</li>
          <li>Led a team of 5 developers to deliver projects on time and within budget</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Software Developer",
    date: "2018 - 2021",
    content: (
      <div>
        <p>
          Developed and maintained web applications for enterprise clients. Implemented 
          responsive designs and optimized application performance.
        </p>
        <ul className="mt-4 list-disc pl-5">
          <li>Built interactive UIs with React and TypeScript</li>
          <li>Integrated RESTful APIs and GraphQL services</li>
          <li>Collaborated with design team to implement pixel-perfect interfaces</li>
          <li>Participated in code reviews and technical planning sessions</li>
        </ul>
      </div>
    ),
  },
  {
    title: "M.S. Computer Science",
    date: "2016 - 2018",
    content: (
      <div>
        <p>
          Specialized in artificial intelligence and machine learning. Thesis on neural 
          network optimization techniques.
        </p>
        <ul className="mt-4 list-disc pl-5">
          <li>Conducted research on deep learning algorithms</li>
          <li>Published two papers in international conferences</li>
          <li>Developed a novel approach to neural network training</li>
          <li>Graduated with honors and received department recognition</li>
        </ul>
      </div>
    ),
  },
  {
    title: "B.S. Computer Science",
    date: "2012 - 2016",
    content: (
      <div>
        <p>
          Graduated with honors. Coursework included data structures, algorithms, 
          and software engineering principles.
        </p>
        <ul className="mt-4 list-disc pl-5">
          <li>Participated in programming competitions</li>
          <li>Completed capstone project on distributed systems</li>
          <li>Served as teaching assistant for introductory programming courses</li>
          <li>Active member of computer science student association</li>
        </ul>
      </div>
    ),
  },
];

export default function JourneyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Timeline data={journeyData} />
      </main>
    </div>
  );
}