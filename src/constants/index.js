import {
  mobile,
  backend,
  creator,
  web,
  github,
} from "@/assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "tech",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Machine Learning Engineer",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
  },
  {
    title: "Data Scientist",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg", 
  },
  {
    title: "AI Solutions Developer",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", 
  },
  {
    title: "Data Visualization Expert",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg", 
  },
];

const technologies = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "Scikit-learn",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "NumPy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  {
    name: "Jupyter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "AWS Sagemaker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
  },
  {
    name: "Tableau",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg"
  }
];

const experiences = [
  {
    title: "Machine Learning Engineer",
    company_name: "InnovateAI Corp",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    iconBg: "#383E56",
    date: "June 2021 - Present",
    points: [
      "Developing and deploying machine learning models for predictive analytics and natural language processing.",
      "Collaborating with data scientists and software engineers to integrate AI solutions into production systems.",
      "Optimizing model performance and scalability using MLOps best practices.",
      "Conducting research on cutting-edge AI techniques and presenting findings to stakeholders.",
    ],
  },
  {
    title: "Data Scientist",
    company_name: "Data Insights Ltd.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg",
    iconBg: "#E6DEDD",
    date: "Jan 2020 - May 2021",
    points: [
      "Performing exploratory data analysis and feature engineering on large datasets.",
      "Building statistical models to identify trends, patterns, and anomalies in data.",
      "Creating interactive dashboards and visualizations to communicate insights to non-technical audiences.",
      "Working closely with business units to understand their data needs and deliver actionable recommendations.",
    ],
  },
  {
    title: "AI Research Intern",
    company_name: "FutureTech Labs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    iconBg: "#383E56",
    date: "May 2019 - Aug 2019",
    points: [
      "Assisted senior researchers in developing novel deep learning architectures for computer vision tasks.",
      "Implemented and benchmarked various machine learning algorithms.",
      "Contributed to the preparation of research papers and technical reports.",
      "Gained hands-on experience with large-scale data processing and model training.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "John's expertise in machine learning was pivotal in developing our new recommendation engine. The results exceeded our expectations!",
    name: "Alice Chen",
    designation: "Product Lead",
    company: "InnovateAI Corp",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    testimonial:
      "The clarity and depth of data insights John provided helped us make critical business decisions. Truly a top-tier data scientist.",
    name: "Robert Miller",
    designation: "Head of Analytics",
    company: "Data Insights Ltd.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    testimonial:
      "Working with John on our AI project was a fantastic experience. Their ability to translate complex concepts into practical solutions is remarkable.",
    name: "Priya Sharma",
    designation: "CTO",
    company: "FutureTech Solutions",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
];

const projects = [
  {
    name: "Predictive Maintenance AI",
    description:
      "An AI-powered system that predicts equipment failures in industrial settings, reducing downtime and maintenance costs by analyzing sensor data and historical performance.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "tensorflow",
        color: "green-text-gradient",
      },
      {
        name: "scikit-learn",
        color: "pink-text-gradient",
      },
    ],
    image: "https://i.ibb.co/3C5HvxC/2.png",
    source_code_link: "https://github.com/",
  },
  {
    name: "Customer Churn Predictor",
    description:
      "A machine learning model that identifies customers at high risk of churn, enabling proactive retention strategies and improving customer lifetime value.",
    tags: [
      {
        name: "datascience",
        color: "blue-text-gradient",
      },
      {
        name: "pandas",
        color: "green-text-gradient",
      },
      {
        name: "sql",
        color: "pink-text-gradient",
      },
    ],
    image: "https://i.ibb.co/3C5HvxC/2.png",
    source_code_link: "https://github.com/",
  },
  {
    name: "AI Image Recognition App",
    description:
      "A mobile application leveraging deep learning for real-time object detection and image classification, with applications in retail and accessibility.",
    tags: [
      {
        name: "pytorch",
        color: "blue-text-gradient",
      },
      {
        name: "computervision",
        color: "green-text-gradient",
      },
      {
        name: "mobileai",
        color: "pink-text-gradient",
      },
    ],
    image: "https://i.ibb.co/3C5HvxC/2.png",
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
