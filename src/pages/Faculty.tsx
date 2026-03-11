import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const Faculty = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const facultyMembers = [
    {
      id: 1,
      name: "Prof. B.V. Chowdary  ",
      position: "Head of Department",
      subDesignation: " Associate Professor",
      qualification: "M.tech, (Ph.D.)",
      experience: "17 years of teaching experience",
      specialization: "Data Mining, Machine Learning",
      email: "bvchowdary2003@gmail.com",
      publications: "Scopus Journals & Conferences: 13 \n Patents:2",
      awards: "Yuva Acharya Award 2021\nNPTEL Discipline Star JUL-DEC 2025",
      image: "/BV-IT-HOD.jpg",
      portfolio: "https://bvchowdary.vercel.app" // Add portfolio links here
    },
    {
      id: 2,
      name: "Dr. M. Prabhakar",
      position: "Associate Professor",
      subDesignation: "R&D Coordinator",
      qualification: "M.Tech, Ph.D.",
      experience: "17 years of teaching experience",
      specialization: "Data Mining, Machine Learning",
      email: "marryprabhakar@gmail.com",
      publications: "Scopus Journals & Conferences: 28 \n Patents:2 \n Book: 1 ",
      awards: "Faculty Eligibility Test(FET JNTUH)- 2011",
      image: "/public/pp.png",
      portfolio: "https://prabhakar-one.vercel.app"
    },
    {
      id: 3,
      name: "Dr. B. Naveen Kumar",
      position: "Associate Professor",
      subDesignation: "IP Project Coordinator",
      qualification: "M.Tech, Ph.D.",
      experience: "18 years of teaching experience",
      specialization: "Big Data, Machine Learning",
      email: "naveen.basava@gmail.com",
      publications: "Scopus Journals & Conferences: 9 \n Books: 4 \n Patents: 5\n \n SCI/SCIE: 1\n",
      awards: "",
      image: "/nk.jpeg",
      portfolio: "https://naveenkumarbasava.vercel.app/"
    },
    {
      id: 12,
      name: "K. Shiva Rama Krishna",
      position: "Associate Professor",
      subDesignation: "Skill Enhancement Coordinator",
      qualification: "M.Tech",
      experience: "18 years of teaching experience",
      specialization: "Computer Networks, Cloud Computing",
      email: "shivaram1p@gmail.com",
      publications: "Journals & Conferences: 7 \n Patent: 2",
      awards: "",
      image: "public/srk.jpeg",
      portfolio: ""
    },
    {
      id: 4,
      name: "Mr. Sk. Khaleelullah",
      position: "Assistant Professor",
      subDesignation: "Placement Coordinator",
      qualification: "M.Tech, Ph.D. (Pursuing)",
      experience: "12 years of teaching experience",
      specialization: "Machine Learning, Deep Learning",
      email: "khaleel1245@gmail.com",
      publications: "Scopus Journals & Conferences: 16\nBook chapter: 1 ",
      awards: "",
      image: "/public/sk1.png",
      portfolio: "https://khaleelullah.vercel.app"
    },
    {
      id: 5,
      name: "Mrs. T. Aruna",
      position: "Assistant Professor",
      subDesignation: "Certifications Coordinator",
      qualification: "M.Tech, Ph.D(Pursuing)",
      experience: "15 years of teaching experience",
      specialization: "Machine Learning, Data Science",
      email: "arunasrinivas35@gmail.com",
      publications: "Conferences:6\n Patents:1 \n Journal: 2",
      awards: "",
      image: "/ta.jpeg",
      portfolio: ""
    },
    {
      id: 6,
      name: "Mr. J. Srikanth",
      position: "Assistant Professor",
      subDesignation: "Student Coordinator",
      qualification: "M.Tech",
      experience: "9 years of teaching experience",
      specialization: "Cloud Computing, Cyber Security",
      email: "jaini.sri@gmail.com",
      publications: "Confernces:2 \n Publications: 1 \n Scopus Journal & Conference:1",
      awards: "",
      image: "public/srik.png",
      portfolio: "htpps://j-srikanth.vercel.app"
    },
    {
      id: 7,
      name: "Mr. A. Sankar Reddy",
      position: "Assistant Professor",
      subDesignation: "Club Activities Coordinator",
      qualification: " M.Tech, Ph.D.(Pursuing)",
      experience: "11 years of teaching experience",
      specialization: "Artificial Intelligence, Deep Learning",
      email: "akepatisankar@gmail.com",
      publications: " Scopus/UGC Journals & Conferences: 13 \n Patents: 1 ",
      awards: "",
      image: "/public/asr.png",
      portfolio: "https://akepatisankarreddy.vercel.app"
    },
    {
      id: 8,
      name: "Mr. M.S.B Kasyapa",
      position: "Assistant Professor",
      subDesignation: "IIC Coordinator",
      qualification: "M.tech, Ph.D.(Pursuing)",
      experience: "8 years of teaching experience",
      specialization: "Blockchain Technology, Data Science",
      email: "msbkasyapa@gmail.com",
      publications: "SCI: 2 \n Scopus Conferences: 2\n Book Chapter:1",
      awards: "",
      image: "/msb.jpeg",
      portfolio: "https://msbkasyapa.wixsite.com/msbkasyapa2"
    },
    {
      id: 10,
      name: "Mrs. Ch. Sai Vijaya",
      position: "Assistant Professor",
      subDesignation: "NPTEL Coordinator",
      qualification: "M.Tech",
      experience: "6 years of teaching experience",
      specialization: "Machine Learning",
      email: "aimlbsesai@gmail.com",
      publications: "Scopus Journals & Conferences: 2",
      awards: "",
      image: "/public/vijaya.jpeg",
      portfolio: "https://sai-vijaya.vercel.app"
    },
    {
      id: 11,
      name: "Mr. G. Chanakya",
      position: "Assistant Professor",
      subDesignation: "Academic Coordinator",
      qualification: "M.Tech",
      experience: "6 years of teaching experience",
      specialization: "Machine Learning, Artificial Intelligence",
      email: "chanakyaa@vignanits.ac.in",
      publications: "Scopus Conferences: 7 \n Patent: 1 \n Book Chapter: 1",
      awards: "",
      image: "/public/chan.png",
      portfolio: "https://chanakya-eta.vercel.app"
    },
  ];

  const supportingStaffMembers = [
    {
      id: 101,
      name: "Maha Lakshmi",
      position: "Lab Incharge",
      image: "/ma.jpeg"
    },
    {
      id: 102,
      name: "V Surya Prakash",
      position: "System / Network Admin",
      image: "/a1.jpeg" // You can use a placeholder image
    },
    {
      id: 103,
      name: "G Disendra Kumar",
      position: "System / Network Admin",
      image: "/a3.jpeg" // You can use a placeholder image
    },
    {
      id: 104,
      name: "V Venu madhav",
      position: "System / Network Admin",
      image: "/a2.jpeg" // You can use a placeholder image
    },

    {
      id: 105,
      name: "Bala Mani",
      position: "DTP Operator",
      image: "/mane.jpeg"
    },

  ];

  const StaffCard = ({ staffMember, index }) => {
    return (
        <Card key={staffMember.id} className="overflow-hidden shadow-md card-hover-effect">
          <CardContent className="p-0">
            <div
                className={`bg-gradient-to-r ${
                    index % 2 === 0 ? 'from-department-blue/5 to-department-blue/10' : 'from-department-purple/5 to-department-purple/10'
                } p-6 flex items-center gap-4`}
            >
              <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                {staffMember.image ? (
                    <img src={staffMember.image} className="h-full w-full object-cover rounded-full" alt={staffMember.name} />
                ) : (
                    <AvatarFallback
                        className={`${
                            index % 2 === 0 ? 'bg-department-blue' : 'bg-department-purple'
                        } text-white text-xl font-bold`}
                    >
                      {staffMember.name.split(' ').length > 1
                          ? staffMember.name.split(' ')[0][0] + staffMember.name.split(' ')[1][0]
                          : staffMember.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg font-heading">{staffMember.name}</h3>
                <p className={`${index % 2 === 0 ? 'text-department-blue' : 'text-department-purple'} font-medium`}>
                  {staffMember.position}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
    );
  };

  // Parse publications which can be a number or a descriptive string like "scopus:12 linea:2"
  const parsePublications = (pub) => {
    if (pub === null || pub === undefined) return [];
    // If it's already a number, return a single total entry
    if (typeof pub === 'number') return [{ source: 'Total', count: pub }];

    // Normalize separators: newlines, commas or semicolons
    const parts = String(pub).split(/\n|,|;/).map(s => s.trim()).filter(Boolean);
    const items = parts.map(part => {
      // Try to capture patterns like "scopus:12" or "Scopus Conference: 12"
      const m = part.match(/^\s*([^:\d]+?)[:\-\s]*([0-9]+)\s*$/i);
      if (m) {
        return { source: m[1].trim(), count: Number(m[2]) };
      }
      // Try another pattern: words then number at end
      const m2 = part.match(/^(.*?)(\d+)$/);
      if (m2) return { source: m2[1].trim().replace(/[:\-]$/,''), count: Number(m2[2]) };
      // Fallback: return the raw part as source with no count
      return { source: part, count: null };
    });
    // If parsing produced nothing meaningful, but the whole string is a number, handle it
    if (items.length === 0 && !Number.isNaN(Number(pub))) return [{ source: 'Total', count: Number(pub) }];
    return items;
  };

  return (
      <Layout>
        <section className="bg-gradient-to-r from-department-purple/10 to-department-blue/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-center text-department-dark">Our Faculty</h1>
            <p className="text-gray-700 max-w-3xl mx-auto text-center mb-0">
              Meet our team of experienced educators and researchers dedicated to excellence in IT education.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <p className="text-gray-700 mx-auto mb-12 max-w-4xl text-center">
            Our department has highly qualified and experienced faculty members dedicated to providing
            quality education and mentoring to students. They bring a wealth of knowledge from both
            academia and industry to ensure our students receive the best possible education.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map((faculty, index) => (
                <Card
                    key={faculty.id}
                    className="overflow-hidden shadow-md card-hover-effect cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setSelectedFaculty(faculty)}
                >
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-r ${index % 2 === 0 ? 'from-department-blue/5 to-department-blue/10' : 'from-department-purple/5 to-department-purple/10'} p-6 flex items-center gap-4`}>
                      <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                        {faculty.image ? (
                            <img src={faculty.image} className="h-full w-full object-cover object-top rounded-full" alt={faculty.name} />
                        ) : (
                            <AvatarFallback className={`${index % 2 === 0 ? 'bg-department-blue' : 'bg-department-purple'} text-white text-xl font-bold`}>
                              {faculty.name.split(' ').length > 1
                                  ? faculty.name.split(' ')[0][0] + faculty.name.split(' ')[1][0]
                                  : faculty.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg font-heading">{faculty.name}</h3>
                        <p className={`${index % 2 === 0 ? 'text-department-blue' : 'text-department-purple'} font-medium`}>{faculty.position}</p>
                        {faculty.subDesignation && (
                          <p className="text-sm text-gray-600">{faculty.subDesignation}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>

        <section className="bg-gray-100 py-12 ">
          <div className="container mx-auto px-4 ">
            <h2 className="text-2xl font-bold mb-4 text-center text-department-dark">Supporting Staff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {supportingStaffMembers.map((staff, index) => (
                  <StaffCard key={staff.id} staffMember={staff} index={index} />
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!selectedFaculty} onOpenChange={() => setSelectedFaculty(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedFaculty && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedFaculty.name}</DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      {selectedFaculty.position}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-6 space-y-6">
                    <div className="flex gap-6 items-start">
                      <Avatar className="h-32 w-32 border-2 border-department-blue shadow-md flex-shrink-0">
                        {selectedFaculty.image ? (
                            <img src={selectedFaculty.image} className="h-full w-full object-cover object-top rounded-full" alt={selectedFaculty.name} />
                        ) : (
                            <AvatarFallback className="bg-department-blue text-white text-3xl font-bold">
                              {selectedFaculty.name.split(' ').length > 1
                                  ? selectedFaculty.name.split(' ')[0][0] + selectedFaculty.name.split(' ')[1][0]
                                  : selectedFaculty.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 uppercase">Position</h4>
                          <p className="text-lg text-department-blue font-medium">{selectedFaculty.position}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold text-gray-600 uppercase">Qualification</h4>
                          <p className="text-gray-700">{selectedFaculty.qualification}</p>
                        </div>
                        
                        {selectedFaculty.email && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-600 uppercase">Email</h4>
                              <p className="text-gray-700 break-all">{selectedFaculty.email}</p>
                            </div>
                        )}
                        {selectedFaculty.portfolio && selectedFaculty.portfolio.trim() ? (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 uppercase">Portfolio Page</h4>
                            <a
                              className="text-blue-600 underline break-all hover:text-blue-800"
                              href={selectedFaculty.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {selectedFaculty.portfolio}
                            </a>
                          </div>
                        ) : (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 uppercase">Portfolio Page</h4>
                            <p className="text-gray-400 italic">Coming soon</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Experience</h4>
                        <p className="text-gray-700">{selectedFaculty.experience}</p>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Specialization</h4>
                        <p className="text-gray-700">{selectedFaculty.specialization}</p>
                      </div>
                    </div>

                    <div className={`grid ${selectedFaculty.awards && String(selectedFaculty.awards).trim() ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Publications</h4>
                        <div className="flex flex-col gap-2">
                          {parsePublications(selectedFaculty.publications).map((it, i) => {
                            const key = `${it.source}-${i}`;
                            const lc = (it.source || '').toLowerCase();
                            let color = 'bg-green-600';
                            if (lc.includes('scopus')) color = 'bg-indigo-600';
                            else if (lc.includes('web') || lc.includes('science') || lc.includes('wos')) color = 'bg-yellow-600';
                            else if (lc.includes('journal')) color = 'bg-emerald-600';
                            else if (lc.includes('conference')) color = 'bg-sky-600';
                            else if (lc.includes('book')) color = 'bg-fuchsia-600';

                            return (
                              <div key={key} className="flex items-center gap-3">
                                <Badge className={`${color} text-white text-sm px-2 py-1 rounded-md`}>
                                  <span className="font-semibold">{it.count ?? '-'}</span>
                                </Badge>
                                <div className="text-sm text-gray-700">
                                  {it.source}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {selectedFaculty.awards && String(selectedFaculty.awards).trim() && (
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Awards</h4>
                          <div className="flex flex-col gap-2">
                            {String(selectedFaculty.awards).split('\n').map((award, idx) => (
                              <Badge key={idx} className="bg-orange-600 text-white w-fit">{award}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
            )}
          </DialogContent>
        </Dialog>
      </Layout>
  );
};

export default Faculty;