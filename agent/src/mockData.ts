import { Branch, PlacementData, Infrastructure } from './types';

export const mockBranches: Branch[] = [
  {
    id: 'CSE',
    name: 'Computer Science & Engineering',
    description: 'Core computing and software engineering.',
    coordinator_name: 'Dr. A. Sharma',
    coordinator_email: 'cse@vits.edu',
    coordinator_phone: '+91-9876543210',
    cutoff_rank: 165681
  },
  {
    id: 'CSM',
    name: 'CSE - AI & ML',
    description: 'Artificial Intelligence and Machine Learning specialization.',
    coordinator_name: 'Dr. B. Reddy',
    coordinator_email: 'aiml@vits.edu',
    coordinator_phone: '+91-9876543211',
    cutoff_rank: 178691
  },
  {
    id: 'CSD',
    name: 'CSE - Data Science',
    description: 'Data Science and Big Data Analytics.',
    coordinator_name: 'Dr. D. Gupta',
    coordinator_email: 'ds@vits.edu',
    coordinator_phone: '+91-9876543212',
    cutoff_rank: 168594
  },
  {
    id: 'AID',
    name: 'Artificial Intelligence & Data Science',
    description: 'Advanced AI concepts and data management.',
    coordinator_name: 'Dr. K. Mani',
    coordinator_email: 'aid@vits.edu',
    coordinator_phone: '+91-9876543213',
    cutoff_rank: 167620
  },
  {
    id: 'INF',
    name: 'Information Technology',
    description: 'IT systems, networks and application development.',
    coordinator_name: 'Dr. S. Prasad',
    coordinator_email: 'it@vits.edu',
    coordinator_phone: '+91-9000000004',
    cutoff_rank: 170866
  },
  {
    id: 'ECE',
    name: 'Electronics & Communication',
    description: 'Electronic devices and communication networks.',
    coordinator_name: 'Prof. K. Rao',
    coordinator_email: 'ece@vits.edu',
    coordinator_phone: '+91-9876543214',
    cutoff_rank: 176166
  },
  {
    id: 'EEE',
    name: 'Electrical & Electronics',
    description: 'Power systems and electrical hardware.',
    coordinator_name: 'Dr. M. Khan',
    coordinator_email: 'eee@vits.edu',
    coordinator_phone: '+91-9876543215',
    cutoff_rank: 169797
  },
  {
    id: 'CIVIL',
    name: 'Civil Engineering',
    description: 'Infrastructure design and construction.',
    coordinator_name: 'Dr. P. Kumar',
    coordinator_email: 'civil@vits.edu',
    coordinator_phone: '+91-9876543216',
    cutoff_rank: 176631
  },
  {
    id: 'MECH',
    name: 'Mechanical Engineering',
    description: 'Thermodynamics, robotics and machine design.',
    coordinator_name: 'Dr. R. Singh',
    coordinator_email: 'mech@vits.edu',
    coordinator_phone: '+91-9876543217',
    cutoff_rank: 173781
  },
  {
    id: 'EIE',
    name: 'Electronics & Instrumentation',
    description: 'Industrial instrumentation and control systems.',
    coordinator_name: 'Dr. V. Lakshmi',
    coordinator_email: 'eie@vits.edu',
    coordinator_phone: '+91-9876543218',
    cutoff_rank: 178484
  }
];

export const mockPlacements: PlacementData[] = [
  {
    id: '1',
    year: 2024,
    highest_package: '44 LPA',
    average_package: '6.5 LPA',
    top_companies: ['Amazon', 'Microsoft', 'Google', 'Zscaler'],
    placement_percentage: 95
  }
];

export const mockInfra: Infrastructure[] = [
  {
    id: '1',
    category: 'Laboratories',
    details: 'State-of-the-art computer labs with latest hardware and 1Gbps internet.'
  },
  {
    id: '2',
    category: 'Library',
    details: 'Over 50,000 books and access to digital libraries like IEEE and ACM.'
  }
];
