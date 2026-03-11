import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Building2, Handshake, Users, Calendar, MapPin, Clock, Eye, X, User, IdCard, FileImage } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Avatar components removed as not needed for this page
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const IndustryInteraction = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventPhotos, setShowEventPhotos] = useState(false);
  const [showAttendees, setShowAttendees] = useState(false);
  const [showCertificate, setShowCertificate] = useState<{ src: string; title?: string } | null>(null);
  // toast removed as share functionality was removed from cards
  // const { toast } = useToast();
  const [selectedGroup, setSelectedGroup] = useState<EventGroup | null>(null);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  function toSmartTitleCase(name: string) {
    return name
        .toLowerCase()
        .split(' ')
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ');
  }

  interface Attendee {
    id: number;
    name: string;
    department: string;
    year: string;
    avatar?: string;
  }
  
  interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    imageSrc: string;
    photos: string[];
    attendees: Attendee[];
  }

  interface StudentInteraction {
    id: number;
    studentName: string;
    rollNumber: string;
    organization: string;
    interactionType: string;
    date: string;
    certificate?: string;
  }

  interface Participant {
    studentName: string;
    rollNumber: string;
  }

  interface EventGroup {
    id: string; // composite key org|date
    title: string; // organization or event title
    organization: string;
    date: string;
    participants: Participant[];
    certificates?: string[];
  }
  
  {/*const studentEvents: Event[] = [
    {
      id: 1,
      title: "Industry Expert Talk on AI",
      description: "Distinguished industry experts from leading tech companies discussed the latest advancements in artificial intelligence and its applications in various industries.",
      date: "March 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Main Auditorium",
      imageSrc: "/event-chatgpt.png",
      photos: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
      ],
      attendees: [
        { id: 1, name: "Aditya Sharma", department: "CSE", year: "3rd Year", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Priya Patel", department: "CSE", year: "4th Year", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: 3, name: "Rahul Verma", department: "IT", year: "2nd Year", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: 4, name: "Sneha Gupta", department: "ECE", year: "3rd Year", avatar: "https://i.pravatar.cc/150?img=8" },
        { id: 5, name: "Vikram Singh", department: "CSE", year: "4th Year", avatar: "https://i.pravatar.cc/150?img=11" }
      ]
    },
    {
      id: 2,
      title: "Web Development Workshop",
      description: "Hands-on workshop on modern web development technologies and frameworks led by industry professionals from leading tech companies.",
      date: "April 5, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "IT Lab Complex",
      imageSrc: "/event-webdev.png",
      photos: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      ],
      attendees: [
        { id: 6, name: "Ananya Reddy", department: "CSE", year: "2nd Year", avatar: "https://i.pravatar.cc/150?img=20" },
        { id: 7, name: "Rohan Kumar", department: "IT", year: "3rd Year", avatar: "https://i.pravatar.cc/150?img=12" },
        { id: 8, name: "Meera Joshi", department: "CSE", year: "4th Year", avatar: "https://i.pravatar.cc/150?img=9" },
        { id: 9, name: "Arjun Nair", department: "ECE", year: "3rd Year", avatar: "https://i.pravatar.cc/150?img=17" }
      ]
    },
    {
      id: 3,
      title: "Annual Industry-Academia Meet",
      description: "A collaborative platform where industry experts and academic professionals come together to discuss the future of technology education and industry requirements.",
      date: "May 10, 2025",
      time: "9:30 AM - 4:00 PM",
      location: "Conference Center",
      imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      photos: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        "https://images.unsplash.com/photo-1518770660439-4636190af475"
      ],
      attendees: [
        { id: 10, name: "Karthik Menon", department: "CSE", year: "4th Year", avatar: "https://i.pravatar.cc/150?img=15" },
        { id: 11, name: "Divya Sharma", department: "IT", year: "3rd Year", avatar: "https://i.pravatar.cc/150?img=23" },
        { id: 12, name: "Nikhil Reddy", department: "ECE", year: "2nd Year", avatar: "https://i.pravatar.cc/150?img=67" },
        { id: 13, name: "Sanya Kapoor", department: "CSE", year: "4th Year", avatar: "https://i.pravatar.cc/150?img=45" },
        { id: 14, name: "Varun Singh", department: "CSE", year: "3rd Year", avatar: "https://i.pravatar.cc/150?img=33" },
        { id: 15, name: "Tanvi Gupta", department: "IT", year: "4th Year", avatar: "https://i.pravatar.cc/150?img=29" }
      ]
    }
  ]; */}

  // Events: enter data per-event here (event-level certificates and participants)
  const events: EventGroup[] = [
    {
      id: 'startupindia||January - March, 2025',
      title: 'StartupIndia Internship ',
      organization: 'StartupIndia',
      date: 'January - March, 2025',
      certificates: ['/nvin.jpeg','/smin.jpeg','/rmin.jpeg'],
      participants: [
          { studentName: 'Chiluveru Navya Sri', rollNumber: '22891A1213' },
          { studentName: 'M Sai Rithika', rollNumber: '22891A1232' },
          { studentName: 'Sai Rishika Madala', rollNumber: '22891A1251' },
        ],
    },
    {
      id: 'microsoft||May 5, 2025',
      title: 'Microsoft Bootcamp ',
      organization: 'Microsoft',
      date: 'May 5, 2025',
      certificates: ['/13ad.jpeg','abhiad.jpeg','31ad.jpeg'],
      participants: [
        { studentName: 'Abhitej Salla', rollNumber: '23891A1201' },
        { studentName: 'Buram Sai Rishika', rollNumber: '23891A1213' },
        { studentName: 'G VENKATA SRIHARSHARAM', rollNumber: '23891A1222' },
        { studentName: 'K SHIVA PRANEETH REDDY', rollNumber: '23891A1228' },
        { studentName: 'Konduri Mohith', rollNumber: '23891A1232' },
        { studentName: 'PAGIDIMARRI BHARATH KUMAR', rollNumber: '23891A1244' },
      ],
    },
    {
      id: 'microsoft||May 10, 2025',
      title: 'Microsoft Bootcamp ',
      organization: 'Microsoft',
      date: 'May 10, 2025',
      certificates: ['/m9.jpeg','/m10.jpeg','/m11.jpeg'],
      participants: [
        { studentName: 'BOBBALA ROHITH REDDY', rollNumber: '22891A1209' },
        { studentName: 'CANJEEVARAM RAJU HRITHIK', rollNumber: '22891A1211' },
        { studentName: 'CHILUVERU NAVYA SRI', rollNumber: '22891A1213' },
        { studentName: 'GODHALA HARIKA REDDY', rollNumber: '22891A1220' },
        { studentName: 'KATUKURI VIJITHA', rollNumber: '22891A1226' },
        { studentName: 'KOMIRISHETTY KEERTHANA', rollNumber: '22891A1227' },
        { studentName: 'M SAI RITHIKA', rollNumber: '22891A1232' },
        { studentName: 'MUSUNURU PRANEETHA', rollNumber: '22891A1236' },
        { studentName: 'PAMPANA SAI KRISHNA', rollNumber: '22891A1237' },
        { studentName: 'PEDDI SRAVANI', rollNumber: '22891A1239' },
        { studentName: 'PURALASETTI SUPRIYA', rollNumber: '22891A1244' },
        { studentName: 'SAI RISHITHA MADALA', rollNumber: '22891A1251' },
        { studentName: 'SURUGU HARSHITH KUMAR GOUD', rollNumber: '22891A1257' },
        { studentName: 'VADDAPALLY UTTEJ KUMAR', rollNumber: '22891A1259' },
        { studentName: 'VEMU SATHVIKA', rollNumber: '22891A1262' },
        { studentName: 'SHAIK MUSKAN', rollNumber: '2895A1203' },
        { studentName: 'JAKARAM JAGANNATH PREETHAM', rollNumber: '23895A1205' },
      ],
    },
    {
      id: 'raoassociates||February 24, 2025',
      title: 'Rao Associates Internship ',
      organization: 'Rao Associates',
      date: 'February 24, 2025',
      certificates: ['/pavanol.jpeg'],
      participants: [
        { studentName: 'B.Pavan babu', rollNumber: '22891A1207' },
      ],
    },
    {
      id: 'salesforce||April 19, 2025',
      title: 'Salesforce Community Meeting ',
      organization: 'Salesforce',
      date: 'April 19, 2025',
      certificates: ['/sf.jpeg', '/public/ssg.jpeg'],
      participants: [
        { studentName: 'Idukuda Venkatapathi Babu', rollNumber: '23891A1225' },
        { studentName: 'Vure Sathvik', rollNumber: '23891A1264' },
      ],
    },
    {
      id: 'iitmadras||April 30, 2025',
      title: 'IIT Madras Diploma Course ',
      organization: 'IIT Madras',
      date: 'April 30, 2025',
      certificates: ['/download.png'],
      participants: [
        { studentName: 'Idukuda Venkatapathi Babu', rollNumber: '23891A1225' },
      ],
    },
    {
      id: 'microsoft-ai||July 19, 2025',
      title: 'Microsoft-AI Workshop ',
      organization: 'Microsoft-AI Workshop',
      date: 'July 19, 2025',
      certificates: ['/msg.jpeg','/nvc.jpeg'],
      participants: [
        { studentName: 'Ch. Navya Sri', rollNumber: '22891A1213' },
      ],
    },
  ];

  // Helper: produce a timestamp for an event `date` string; handles ranges like "January - March, 2025" by using the last month/day
  const monthMap: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  };

  function getEventTimestamp(dateStr: string): number {
    if (!dateStr) return 0;
    let s = dateStr.trim();
    // If it's a range like "January - March, 2025" take right side
    if (s.includes('-')) {
      const parts = s.split('-');
      s = parts[parts.length - 1].trim();
    }
    // Try native parse first
    const parsed = Date.parse(s);
    if (!isNaN(parsed)) return parsed;

    // Try to extract month and year (optionally day)
    const m = s.match(/([A-Za-z]+)\s*(\d{1,2})?,?\s*(\d{4})/);
    if (m) {
      const monthName = m[1].toLowerCase();
      const day = m[2] ? parseInt(m[2], 10) : 1;
      const year = parseInt(m[3], 10);
      const month = monthMap[monthName] || 1;
      return new Date(year, month - 1, day).getTime();
    }

    // Fallback: look for month and year without day
    const m2 = s.match(/([A-Za-z]+)\s*(\d{4})/);
    if (m2) {
      const monthName = m2[1].toLowerCase();
      const year = parseInt(m2[2], 10);
      const month = monthMap[monthName] || 1;
      return new Date(year, month - 1, 1).getTime();
    }

    // Last resort: parse year only
    const y = s.match(/(\d{4})/);
    if (y) return new Date(parseInt(y[1], 10), 0, 1).getTime();
    return 0;
  }

  const sortedEvents = [...events].sort((a, b) => getEventTimestamp(b.date) - getEventTimestamp(a.date));

  const interactions = [
    {
      title: "Industry Partnerships",
      icon: <Building2 className="h-10 w-10 text-department-purple" />,
      description: "Collaborating with leading companies to provide students with industry-relevant skills and knowledge through workshops, internships, and joint research projects."
    },
    {
      title: "Placement Opportunities",
      icon: <Handshake className="h-10 w-10 text-department-purple" />,
      description: "Working with industry partners to create placement opportunities for our students, ensuring they have a smooth transition from academia to professional careers."
    },
    {
      title: "Industrial Visits & Expert Lectures",
      icon: <Users className="h-10 w-10 text-department-purple" />,
      description: "Regular industrial visits and expert lectures from industry professionals to keep students updated with current trends and technologies."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-heading text-department-dark mb-4">Industry Institution Interaction</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between academic learning and industry requirements through meaningful collaborations and interactions.
          </p>
          <div className="w-20 h-1 bg-department-accent mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {interactions.map((item, index) => (
            <Card key={index} className="card-hover-effect border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-department-purple/10 p-4 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-department-dark">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* List of Students Referred for Placements - grouped by company (cards) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-heading text-department-dark mb-6">Students Referred for Placements</h2>

          {(() => {
            const placements = [
              {
                company: 'GSPANN',
                students: [
                  { roll: '21891A1201', name: 'A Venkata Sai Sumanth' },
                  { roll: '21891A1206', name: 'Bobbala Ashwini' },
                  { roll: '21891A1233', name: 'Kunchala Chandra Shekar' },
                  { roll: '21891A1234', name: 'Kunta Mallikraj' },
                  { roll: '21891A1240', name: 'Mandalapu Nikhitha' },
                ],
              },
            ];

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {placements.map((p) => {
                  const expanded = expandedCompany === p.company;
                  return (
                    <Card key={p.company} className="border shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-semibold text-department-dark">{p.company}</div>
                            <div className="text-sm text-gray-600">{p.students.length} student{p.students.length>1? 's':''}</div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm" onClick={() => setExpandedCompany(expanded ? null : p.company)}>
                              {expanded ? 'Hide' : 'View'}
                            </Button>
                          </div>
                        </div>

                        {expanded && (
                          <div className="mt-4 border-t pt-3 max-h-48 overflow-y-auto">
                            <ul className="divide-y">
                              {p.students.map((s) => (
                                <li key={s.roll} className="py-2">
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-department-dark">{s.name}</div>
                                    <div className="text-sm text-gray-600">{s.roll}</div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Student Interaction Records grouped by Event */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold font-heading text-department-dark mb-6">Industry Events & Interactions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.map((g) => {
              const sampleCert = g.certificates?.[0];
              return (
                <Card key={g.id} className="border-none shadow-md transition-transform hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {sampleCert ? (
                        <button
                          onClick={() => setShowCertificate({ src: sampleCert, title: g.title })}
                          className="block w-20 h-20 shrink-0 rounded-sm overflow-hidden shadow-sm focus:outline-none"
                        >
                          <img src={sampleCert} alt={`${g.title} sample certificate`} className="w-full h-full object-cover" />
                        </button>
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400">No Image</div>
                      )}

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-department-dark whitespace-normal leading-tight">{g.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{g.date}</p>
                        <p className="text-sm text-gray-600 mt-2">{g.participants.length} participant{g.participants.length>1? 's':''}</p>
                      </div>
                    </div>

                    <div className="ml-auto mt-4 sm:mt-0">
                      <Button variant="outline" size="sm" onClick={() => setSelectedGroup(g)}>
                        View Participants
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Selected Event Group Dialog (participants) */}
        {selectedGroup && (
          <Dialog open={selectedGroup !== null} onOpenChange={() => setSelectedGroup(null)}>
            <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  <span className="block whitespace-normal leading-tight">{selectedGroup.title} — {selectedGroup.date}</span>
                </DialogTitle>
                <DialogDescription>
                  {selectedGroup.participants.length} participant{selectedGroup.participants.length>1? 's':''}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                {/* Event-level certificates (provided on the event object) */}
                {selectedGroup.certificates && selectedGroup.certificates.length > 0 ? (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-department-dark mb-3">Certificates</h3>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {selectedGroup.certificates.map((cert, idx) => (
                        <button
                          key={idx}
                          onClick={() => setShowCertificate({ src: cert, title: selectedGroup.title })}
                          className="flex-shrink-0 w-40 focus:outline-none"
                        >
                          <div className="w-40 h-24 rounded-md overflow-hidden shadow-sm">
                            <img src={cert} alt={`certificate-${idx}`} className="w-full h-full object-cover" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                {/* Participants list (names and rolls only) - scrollable when long */}
                <div className="max-h-56 overflow-y-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Student Name</TableHead>
                        <TableHead className="font-bold">Roll Number</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedGroup.participants.map((interaction) => (
                        <TableRow key={interaction.rollNumber || interaction.studentName}>
                          <TableCell className="flex items-center gap-2">
                            <User size={16} className="text-department-purple" />
                            {toSmartTitleCase(interaction.studentName)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <IdCard size={16} className="text-department-purple" />
                              {interaction.rollNumber}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setSelectedGroup(null)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Certificate Dialog */}
        {showCertificate && (
          <Dialog open={showCertificate !== null} onOpenChange={() => setShowCertificate(null)}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Certificate / Proof</DialogTitle>
                <DialogDescription>
                  {showCertificate.title}
                </DialogDescription>
              </DialogHeader>
              <div className="relative w-full aspect-video mt-4 rounded-md overflow-hidden">
                <img 
                  src={showCertificate.src} 
                  alt={`Certificate for ${showCertificate.title || 'event'}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCertificate(null)}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default IndustryInteraction;
