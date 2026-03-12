import { Branch, PlacementData, Infrastructure } from './types';

// ─── Branches ────────────────────────────────────────────────────────────────
export const mockBranches: Branch[] = [
  {
    id: 'CSE',
    name: 'Computer Science & Engineering',
    description: 'Core computing and software engineering. Comprehensive courses in programming, databases, networking, AI, and cybersecurity.',
    coordinator_name: 'Dr. A. Sharma',
    coordinator_email: 'cse@vits.edu',
    coordinator_phone: '+91-9876543210',
  },
  {
    id: 'CSM',
    name: 'CSE - AI & ML',
    description: 'Artificial Intelligence and Machine Learning specialization. Focus on deep learning, NLP, and intelligent systems.',
    coordinator_name: 'Dr. B. Reddy',
    coordinator_email: 'aiml@vits.edu',
    coordinator_phone: '+91-9876543211',
  },
  {
    id: 'CSD',
    name: 'CSE - Data Science',
    description: 'Data Science and Big Data Analytics. Focus on data mining, visualization, and big data frameworks.',
    coordinator_name: 'Dr. D. Gupta',
    coordinator_email: 'ds@vits.edu',
    coordinator_phone: '+91-9876543212',
  },
  {
    id: 'AID',
    name: 'Artificial Intelligence & Data Science',
    description: 'Advanced AI concepts and data management. Combines AI theory with practical data science applications.',
    coordinator_name: 'Dr. K. Mani',
    coordinator_email: 'aid@vits.edu',
    coordinator_phone: '+91-9876543213',
  },
  {
    id: 'INF',
    name: 'Information Technology',
    description: 'IT systems, networks and application development. Established in 2019 with an intake of 60 students.',
    coordinator_name: 'Prof. B.V. Chowdary (HOD)',
    coordinator_email: 'vitsitonline1@vignanits.ac.in',
    coordinator_phone: '+91 9494441877',
  },
  {
    id: 'ECE',
    name: 'Electronics & Communication',
    description: 'Electronic devices and communication networks. Strong focus on VLSI, embedded systems, and wireless communications.',
    coordinator_name: 'Prof. K. Rao',
    coordinator_email: 'ece@vits.edu',
    coordinator_phone: '+91-9876543214',
  },
  {
    id: 'EEE',
    name: 'Electrical & Electronics',
    description: 'Power systems and electrical hardware. Covers power electronics, control systems, and electrical machines.',
    coordinator_name: 'Dr. M. Khan',
    coordinator_email: 'eee@vits.edu',
    coordinator_phone: '+91-9876543215',
  },
  {
    id: 'CIVIL',
    name: 'Civil Engineering',
    description: 'Infrastructure design and construction. Focuses on structural engineering, environmental, and transportation.',
    coordinator_name: 'Dr. P. Kumar',
    coordinator_email: 'civil@vits.edu',
    coordinator_phone: '+91-9876543216',
  },
  {
    id: 'MECH',
    name: 'Mechanical Engineering',
    description: 'Thermodynamics, robotics and machine design. Covers manufacturing, CAD/CAM, and industrial automation.',
    coordinator_name: 'Dr. R. Singh',
    coordinator_email: 'mech@vits.edu',
    coordinator_phone: '+91-9876543217',
  },
  {
    id: 'EIE',
    name: 'Electronics & Instrumentation',
    description: 'Industrial instrumentation and control systems. Focus on sensors, process control, and industrial automation.',
    coordinator_name: 'Dr. V. Lakshmi',
    coordinator_email: 'eie@vits.edu',
    coordinator_phone: '+91-9876543218',
  }
];

// ─── Placements ───────────────────────────────────────────────────────────────
export const mockPlacements: PlacementData[] = [
  {
    id: '1',
    year: 2023,
    highest_package: '11 LPA',
    average_package: '5 LPA',
    top_companies: ['Informatica', 'Eunimart', 'ADP', 'GlobalLogic'],
    placement_percentage: 94,
    students_eligible: 50,
    students_placed: 47,
    offers: 77,
  },
  {
    id: '2',
    year: 2024,
    highest_package: '6 LPA',
    average_package: '4 LPA',
    top_companies: ['TCS', 'Infosys', 'Cognizant'],
    placement_percentage: 76,
    students_eligible: 49,
    students_placed: 37,
    offers: 54,
  },
  {
    id: '3',
    year: 2025,
    highest_package: '10 LPA',
    average_package: '5 LPA',
    top_companies: ['Rinex', 'GlobalLogic', 'Infosys', 'Cognizant'],
    placement_percentage: 43,
    students_eligible: 46,
    students_placed: 20,
    offers: 31,
  },
  {
    id: '4',
    year: 2026,
    highest_package: '13.83 LPA',
    average_package: '6 LPA',
    top_companies: ['InsightSoftware', 'Ndmatrix', 'Infosys'],
    placement_percentage: 15,
    students_eligible: 59,
    students_placed: 9,
    offers: 11,
    note: 'Academic year in progress (2025-26)'
  },
];

// ─── Infrastructure ───────────────────────────────────────────────────────────
export const mockInfra: Infrastructure[] = [
  {
    id: '1',
    category: 'Laboratories',
    details: 'State-of-the-art computer labs with latest hardware and 1Gbps internet connectivity.'
  },
  {
    id: '2',
    category: 'Library',
    details: 'Over 50,000 books and access to digital libraries like IEEE and ACM.'
  }
];

// ─── IT Department Knowledge Base ────────────────────────────────────────────

export const departmentInfo = {
  name: 'Department of Information Technology',
  college: 'Vignan Institute of Technology and Science (VITS)',
  established: 2019,
  intake: 60,
  address: 'Deshmukhi, Pochampally, Yadadri Bhuvanagiri District, Telangana - 508284',
  phone: '+91 9494441877',
  email: 'vitsitonline1@vignanits.ac.in',
  officeRoom: 'Room No 413, Fourth Floor',
  officeHours: '8:30 AM - 5:00 PM (Monday to Saturday)',
  website: 'Department website built by students (NextGen Club + NG-DSDC Cell)',
};

export const facultyList = [
  {
    name: 'Prof. B.V. Chowdary',
    position: 'Head of Department & Associate Professor',
    qualification: 'M.Tech, Ph.D. (Pursuing)',
    experience: '17 years',
    specialization: 'Data Mining, Machine Learning',
    email: 'bvchowdary2003@gmail.com',
    publications: '13 Scopus Journals & Conferences, 2 Patents',
    awards: 'Yuva Acharya Award 2021, NPTEL Discipline Star JUL-DEC 2025',
    portfolio: 'https://bvchowdary.vercel.app'
  },
  {
    name: 'Dr. M. Prabhakar',
    position: 'Associate Professor & R&D Coordinator',
    qualification: 'M.Tech, Ph.D.',
    experience: '17 years',
    specialization: 'Data Mining, Machine Learning',
    email: 'marryprabhakar@gmail.com',
    publications: '28 Scopus Journals & Conferences, 2 Patents, 1 Book',
    awards: 'Faculty Eligibility Test (FET JNTUH) 2011',
    portfolio: 'https://prabhakar-one.vercel.app'
  },
  {
    name: 'Dr. B. Naveen Kumar',
    position: 'Associate Professor & IP Project Coordinator',
    qualification: 'M.Tech, Ph.D.',
    experience: '18 years',
    specialization: 'Big Data, Machine Learning',
    email: 'naveen.basava@gmail.com',
    publications: '9 Scopus Journals, 4 Books, 5 Patents, 1 SCI/SCIE',
    portfolio: 'https://naveenkumarbasava.vercel.app/'
  },
  {
    name: 'K. Shiva Rama Krishna',
    position: 'Associate Professor & Skill Enhancement Coordinator',
    qualification: 'M.Tech',
    experience: '18 years',
    specialization: 'Computer Networks, Cloud Computing',
    email: 'shivaram1p@gmail.com',
    publications: '7 Journals & Conferences, 2 Patents',
  },
  {
    name: 'Mr. Sk. Khaleelullah',
    position: 'Assistant Professor & Placement Coordinator',
    qualification: 'M.Tech, Ph.D. (Pursuing)',
    experience: '12 years',
    specialization: 'Machine Learning, Deep Learning',
    email: 'khaleel1245@gmail.com',
    publications: '16 Scopus Journals & Conferences, 1 Book Chapter',
    portfolio: 'https://khaleelullah.vercel.app'
  },
  {
    name: 'Mrs. T. Aruna',
    position: 'Assistant Professor & Certifications Coordinator',
    qualification: 'M.Tech, Ph.D. (Pursuing)',
    experience: '15 years',
    specialization: 'Machine Learning, Data Science',
    email: 'arunasrinivas35@gmail.com',
    publications: '6 Conferences, 1 Patent, 2 Journals'
  },
  {
    name: 'Mr. J. Srikanth',
    position: 'Assistant Professor & Student Coordinator',
    qualification: 'M.Tech',
    experience: '9 years',
    specialization: 'Cloud Computing, Cyber Security',
    email: 'jaini.sri@gmail.com',
    publications: '2 Conferences, 1 Scopus Journal & Conference'
  },
  {
    name: 'Mr. A. Sankar Reddy',
    position: 'Assistant Professor & Club Activities Coordinator',
    qualification: 'M.Tech, Ph.D. (Pursuing)',
    experience: '11 years',
    specialization: 'Artificial Intelligence, Deep Learning',
    email: 'akepatisankar@gmail.com',
    publications: '13 Scopus/UGC Journals & Conferences, 1 Patent',
    portfolio: 'https://akepatisankarreddy.vercel.app'
  },
  {
    name: 'Mr. M.S.B Kasyapa',
    position: 'Assistant Professor & IIC Coordinator',
    qualification: 'M.Tech, Ph.D. (Pursuing)',
    experience: '8 years',
    specialization: 'Blockchain Technology, Data Science',
    email: 'msbkasyapa@gmail.com',
    publications: '2 SCI, 2 Scopus Conferences, 1 Book Chapter',
    portfolio: 'https://msbkasyapa.wixsite.com/msbkasyapa2'
  },
  {
    name: 'Mrs. Ch. Sai Vijaya',
    position: 'Assistant Professor & NPTEL Coordinator',
    qualification: 'M.Tech',
    experience: '6 years',
    specialization: 'Machine Learning',
    email: 'aimlbsesai@gmail.com',
    publications: '2 Scopus Journals & Conferences',
    portfolio: 'https://sai-vijaya.vercel.app'
  },
  {
    name: 'Mr. G. Chanakya',
    position: 'Assistant Professor & Academic Coordinator',
    qualification: 'M.Tech',
    experience: '6 years',
    specialization: 'Machine Learning, Artificial Intelligence',
    email: 'chanakyaa@vignanits.ac.in',
    publications: '7 Scopus Conferences, 1 Patent, 1 Book Chapter',
    portfolio: 'https://chanakya-eta.vercel.app'
  },
];

export const clubs = [
  {
    name: 'InfyCoder',
    focus: 'Competitive coding, algorithms, and problem solving',
    members: 136,
    established: 2022,
    schedule: 'Every Saturday, 2:00 PM - 3:30 PM',
    activities: ['Coding Challenges', 'Hackathons', 'Guest Lectures'],
  },
  {
    name: 'SpeakEasy Club',
    focus: 'Communication and verbal skills',
    members: 120,
    established: 2022,
    schedule: 'Every Tuesday, 3:30 PM - 5:30 PM',
    activities: ['JAM Sessions', 'Presentations', 'Social Awareness'],
  },
  {
    name: 'NextGen',
    focus: 'Startups, innovation, and emerging technologies',
    members: 110,
    established: 2024,
    schedule: 'Every Wednesday, 2:00 PM - 3:30 PM',
    activities: ['IEP Sessions', 'E-Summits', 'Industry 4.0 Talks'],
  },
  {
    name: 'Arts Club',
    focus: 'Artistic and creative expression',
    members: 136,
    established: 2022,
    schedule: 'Every Thursday, 3:30 PM - 5:00 PM',
    activities: ['Poster making', 'Drawing competitions', 'Quizzes'],
  },
  {
    name: 'Sports Club',
    focus: 'Sports, fitness, and athletic events',
    members: 136,
    established: 2022,
    schedule: 'Every Friday, 4:00 PM - 5:30 PM',
    activities: ['Football matches', 'Cricket tournaments', 'Athletics training'],
  },
];

export const mouPartners = [
  { organization: 'PANTECH E-LEARNING', year: 2025 },
  { organization: 'I & T Labs', year: 2023 },
  { organization: 'VILINDHA TECHNOLOGIES PVT. LTD', year: 2022 },
  { organization: 'AUGMENTED BYTE (OPC) PVT. LTD', year: 2022 },
  { organization: "RK's INSPIRE TECHNOLOGIES", year: 2021 },
  { organization: 'SUN TECHNOLOGIES', year: 2020 },
  { organization: 'CB CRUNCH TECHNOLOGIES PVT. LTD', year: 2020 },
  { organization: 'VOID MAIN TECHNOLOGIES', year: 2020 },
  { organization: 'BRAIN O VISION SOLUTION PVT. LTD', year: 2020 },
];

export const departmentHighlights = {
  placementRate: '94% (2022-23 batch)',
  researchContributions: '65+',
  industryPartners: '9+',
  activeStudentClubs: 5,
  totalFacultyPublications: '100+',
  topRecruiters: ['Informatica', 'GlobalLogic', 'TCS', 'Infosys', 'Cognizant', 'InsightSoftware', 'Rinex', 'ADP', 'Ndmatrix'],
  highestPackage: '13.83 LPA (2025-26)',
  averagePackage: '5–6 LPA',
  placementYears: '2022-23 to 2025-26 (ongoing)',
};
