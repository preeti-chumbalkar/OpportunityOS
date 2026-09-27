export interface RequiredSkill {
  name: string;
  minLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: 'Internship' | 'Hackathon' | 'Scholarship' | 'Competition' | 'Certification' | 'Job';
  description: string;
  requiredSkills: RequiredSkill[];
  eligibility: string;
  location: string;
  mode: 'Remote' | 'On-site' | 'Hybrid';
  deadline: string;
  applicationUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  isDemo?: boolean;
}

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Data Analyst Internship',
    organization: 'FinTech Innovations (Demo)',
    category: 'Internship',
    description: 'Join our data team to analyze financial trends and build interactive dashboards. You will work closely with data scientists to clean datasets and extract actionable insights.',
    requiredSkills: [
      { name: 'SQL', minLevel: 'Intermediate' },
      { name: 'Python', minLevel: 'Intermediate' },
      { name: 'Data Analysis', minLevel: 'Advanced' },
      { name: 'Power BI', minLevel: 'Intermediate' }
    ],
    eligibility: '3rd or 4th Year B.Tech / B.Sc',
    location: 'Bangalore, India',
    mode: 'Hybrid',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    applicationUrl: '#',
    difficulty: 'Intermediate',
    tags: ['Data', 'Finance', 'SQL', 'Analytics'],
    isDemo: true
  },
  {
    id: 'opp-2',
    title: 'Global AI Hackathon 2024',
    organization: 'TechBuilders (Demo)',
    category: 'Hackathon',
    description: 'Build the next generation of AI tools over a 48-hour sprint. Great prizes, mentorship, and networking opportunities available.',
    requiredSkills: [
      { name: 'Python', minLevel: 'Intermediate' },
      { name: 'Machine Learning', minLevel: 'Beginner' },
      { name: 'Git', minLevel: 'Beginner' }
    ],
    eligibility: 'Open to all university students',
    location: 'Global',
    mode: 'Remote',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
    applicationUrl: '#',
    difficulty: 'Intermediate',
    tags: ['AI', 'Hackathon', 'Innovation'],
    isDemo: true
  },
  {
    id: 'opp-3',
    title: 'Frontend Developer Intern',
    organization: 'Creative Web Agency (Demo)',
    category: 'Internship',
    description: 'Help us build stunning user interfaces for our clients using modern web technologies. You will convert design mockups into responsive web pages.',
    requiredSkills: [
      { name: 'HTML/CSS', minLevel: 'Advanced' },
      { name: 'JavaScript', minLevel: 'Intermediate' },
      { name: 'React', minLevel: 'Intermediate' }
    ],
    eligibility: '2nd to 4th Year CS/IT',
    location: 'Mumbai, India',
    mode: 'Remote',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    applicationUrl: '#',
    difficulty: 'Beginner',
    tags: ['Web Dev', 'Frontend', 'React'],
    isDemo: true
  },
  {
    id: 'opp-4',
    title: 'Cloud Computing Certification Grant',
    organization: 'Cloud Foundation (Demo)',
    category: 'Scholarship',
    description: 'Full sponsorship for the official AWS/Azure certification exam. Awarded to students demonstrating strong potential in cloud architecture.',
    requiredSkills: [
      { name: 'Networking', minLevel: 'Beginner' },
      { name: 'Linux', minLevel: 'Beginner' }
    ],
    eligibility: 'All students with minimum 7.5 CGPA',
    location: 'Online',
    mode: 'Remote',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Intermediate',
    tags: ['Cloud', 'Certification', 'Sponsorship'],
    isDemo: true
  },
  {
    id: 'opp-5',
    title: 'Backend Engineering Role',
    organization: 'ScaleUp Startup (Demo)',
    category: 'Job',
    description: 'Fast-paced startup looking for a strong backend engineer to build scalable APIs and manage database architecture.',
    requiredSkills: [
      { name: 'Node.js', minLevel: 'Advanced' },
      { name: 'SQL', minLevel: 'Advanced' },
      { name: 'Docker', minLevel: 'Intermediate' }
    ],
    eligibility: 'Final year students or recent graduates',
    location: 'Delhi, India',
    mode: 'On-site',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Advanced',
    tags: ['Backend', 'API', 'Database'],
    isDemo: true
  },
  {
    id: 'opp-6',
    title: 'Data Science Competition',
    organization: 'Kaggle Community (Demo)',
    category: 'Competition',
    description: 'Predict customer churn using our anonymized dataset. The top 5 models will be featured in our monthly newsletter.',
    requiredSkills: [
      { name: 'Python', minLevel: 'Advanced' },
      { name: 'Machine Learning', minLevel: 'Intermediate' },
      { name: 'Statistics', minLevel: 'Intermediate' }
    ],
    eligibility: 'Open to everyone',
    location: 'Online',
    mode: 'Remote',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Advanced',
    tags: ['Data Science', 'ML', 'Competition'],
    isDemo: true
  },
  {
    id: 'opp-7',
    title: 'UX/UI Design Intern',
    organization: 'DesignStudio (Demo)',
    category: 'Internship',
    description: 'Work with our senior designers to create intuitive user experiences. You will conduct user research and create wireframes in Figma.',
    requiredSkills: [
      { name: 'Figma', minLevel: 'Intermediate' },
      { name: 'User Research', minLevel: 'Beginner' },
      { name: 'HTML/CSS', minLevel: 'Beginner' }
    ],
    eligibility: 'Any design or tech background',
    location: 'Pune, India',
    mode: 'Hybrid',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Intermediate',
    tags: ['Design', 'UX', 'Figma'],
    isDemo: true
  },
  {
    id: 'opp-8',
    title: 'Cybersecurity Bootcamp Scholarship',
    organization: 'SecureNet (Demo)',
    category: 'Scholarship',
    description: '100% funded spot in our intensive 12-week cybersecurity bootcamp. Learn ethical hacking, network defense, and cryptography.',
    requiredSkills: [
      { name: 'Linux', minLevel: 'Intermediate' },
      { name: 'Networking', minLevel: 'Intermediate' }
    ],
    eligibility: 'Undergraduates interested in security',
    location: 'Online',
    mode: 'Remote',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Beginner',
    tags: ['Security', 'Bootcamp', 'Scholarship'],
    isDemo: true
  },
  {
    id: 'opp-9',
    title: 'AI Product Manager Intern',
    organization: 'NextGen AI (Demo)',
    category: 'Internship',
    description: 'Help define the roadmap for our AI products. You will bridge the gap between engineering and user needs.',
    requiredSkills: [
      { name: 'Project Management', minLevel: 'Beginner' },
      { name: 'Data Analysis', minLevel: 'Beginner' },
      { name: 'Communication', minLevel: 'Advanced' }
    ],
    eligibility: '3rd/4th Year Students',
    location: 'Bangalore, India',
    mode: 'On-site',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Intermediate',
    tags: ['Product', 'AI', 'Management'],
    isDemo: true
  },
  {
    id: 'opp-10',
    title: 'Open Source Contribution Month',
    organization: 'DevCommunity (Demo)',
    category: 'Competition',
    description: 'Contribute to open source projects over a month. Mentors will guide you through your first PRs. Swag for top contributors.',
    requiredSkills: [
      { name: 'Git', minLevel: 'Intermediate' },
      { name: 'JavaScript', minLevel: 'Beginner' },
      { name: 'Python', minLevel: 'Beginner' }
    ],
    eligibility: 'Students with basic coding knowledge',
    location: 'Online',
    mode: 'Remote',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Beginner',
    tags: ['Open Source', 'Community', 'Git'],
    isDemo: true
  },
  {
    id: 'opp-11',
    title: 'Mobile App Developer Intern',
    organization: 'AppWorks (Demo)',
    category: 'Internship',
    description: 'Develop cross-platform mobile applications using Flutter or React Native. Help us launch our new flagship product.',
    requiredSkills: [
      { name: 'React', minLevel: 'Intermediate' },
      { name: 'JavaScript', minLevel: 'Advanced' },
      { name: 'Mobile Dev', minLevel: 'Beginner' }
    ],
    eligibility: 'CS/IT students',
    location: 'Hyderabad, India',
    mode: 'Remote',
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Intermediate',
    tags: ['Mobile', 'React Native', 'App Dev'],
    isDemo: true
  },
  {
    id: 'opp-12',
    title: 'Certified Kubernetes Administrator (CKA) Exam',
    organization: 'CNCF (Demo)',
    category: 'Certification',
    description: 'Prove your expertise in configuring and managing Kubernetes clusters. A highly sought-after industry credential.',
    requiredSkills: [
      { name: 'Linux', minLevel: 'Advanced' },
      { name: 'Docker', minLevel: 'Advanced' },
      { name: 'Kubernetes', minLevel: 'Intermediate' }
    ],
    eligibility: 'Anyone',
    location: 'Online',
    mode: 'Remote',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Advanced',
    tags: ['DevOps', 'Kubernetes', 'Certification'],
    isDemo: true
  },
  {
    id: 'opp-13',
    title: 'Quantitative Research Intern',
    organization: 'Alpha Trading (Demo)',
    category: 'Internship',
    description: 'Apply mathematical models to financial markets. Work with massive datasets to find trading signals.',
    requiredSkills: [
      { name: 'Python', minLevel: 'Advanced' },
      { name: 'Statistics', minLevel: 'Advanced' },
      { name: 'SQL', minLevel: 'Intermediate' }
    ],
    eligibility: 'Math/Stats/CS majors, exceptional academic record',
    location: 'Mumbai, India',
    mode: 'On-site',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Advanced',
    tags: ['Quant', 'Finance', 'Math'],
    isDemo: true
  },
  {
    id: 'opp-14',
    title: 'Women in Tech Scholarship 2025',
    organization: 'Tech Diversity Org (Demo)',
    category: 'Scholarship',
    description: 'Financial support and mentorship for outstanding female students pursuing degrees in technology.',
    requiredSkills: [
      { name: 'Programming', minLevel: 'Beginner' }
    ],
    eligibility: 'Female students in STEM',
    location: 'Online',
    mode: 'Remote',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Beginner',
    tags: ['Diversity', 'Scholarship', 'STEM'],
    isDemo: true
  },
  {
    id: 'opp-15',
    title: 'Software Engineer - AI Infrastructure',
    organization: 'DeepSystems (Demo)',
    category: 'Job',
    description: 'Build the foundational infrastructure that powers our large language models. Highly challenging systems engineering role.',
    requiredSkills: [
      { name: 'Python', minLevel: 'Advanced' },
      { name: 'C++', minLevel: 'Intermediate' },
      { name: 'Machine Learning', minLevel: 'Beginner' },
      { name: 'System Design', minLevel: 'Intermediate' }
    ],
    eligibility: 'Graduating students',
    location: 'Bangalore, India',
    mode: 'On-site',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    applicationUrl: '#',
    difficulty: 'Advanced',
    tags: ['AI', 'Infrastructure', 'Systems'],
    isDemo: true
  }
];
