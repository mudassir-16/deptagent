import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  //Events 
  const events = [
    "Department Day: 7th February 2026","Alumni Meet: 7th February 2026"
  ];

  return (
    <Layout>
      {/* Marquee Events Section */}
      
      <div className="bg-blue border-y-2 border-yellow-400 py-2 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap"> <span className="md:px-16 text-purple-600 font-bold">Upcoming Events : </span>
          {[...events, ...events].map((event, idx) => (
            <span key={idx} className="text-yellow-800 font-semibold mx-4 flex-shrink-0">
              📢 {event}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-department-purple/10 to-department-blue/10 md:py-12 transform-gpu will-change-auto">
          

        <div className="container mx-auto px-4 transform-gpu will-change-auto text-center">

          <div className="flex items-center mb-6 text-center justify-center">
            <img src="/vait-logo.png" alt="VAIT Department Logo" className="h-16 w-16 mr-4 rounded-full shadow-md" />
            <h1 className="text-4xl md:text-4xl font-bold text-department-dark leading-tight transform-gpu will-change-auto text-center">
              Department of <span className="text-department-purple transform-gpu will-change-auto">Information Technology</span>
            </h1>
          </div>
          <p className="text-gray-700 text-lg mb-8 transform-gpu will-change-auto">
            Shaping the future through innovation, quality education, and technological excellence. Join us in our journey to create tomorrow's IT leaders.
          </p>
        </div>
        <div className="container mx-auto px-4 transform-gpu will-change-auto">
          <div className="flex flex-col md:flex-row items-center transform-gpu will-change-auto">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12 animate-fade-in transform-gpu will-change-auto">
              <h3 className="text-4xl md:text-3xl font-bold text-department-purple leading-tight transform-gpu will-change-auto text-center">
                Preface of the Department
              </h3>
            <div className="animate-fade-in transform-gpu will-change-auto" style={{ animationDelay: '0.2s' }}>
              <img
                  src="/Preface.jpeg"
                  alt="Preface of IT Department"
                  className="rounded-lg shadow-2xl w-full h-auto transform-gpu will-change-auto"
              />
            </div>


            </div>
            <div className="md:w-1/2 animate-fade-in transform-gpu will-change-auto" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-4xl md:text-3xl font-bold text-department-purple leading-tight transform-gpu will-change-auto text-center">
                Placement Insights
              </h3>
              <img 
                src="/pi.png" 
                alt="IT Department" 
                className="rounded-lg shadow-2xl w-full h-auto transform-gpu will-change-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 transform-gpu will-change-auto">
        {/* About Department Section */}
        <section className="animate-fade-in transform-gpu will-change-auto" style={{ animationDelay: '0.3s' }}>
          <h2 className="section-header transform-gpu will-change-auto">About Department</h2>
          <div className="prose max-w-none transform-gpu will-change-auto">
            <p className="text-gray-700 mb-4 text-lg transform-gpu will-change-auto">
              Department of Information Technology established in the year 2019 with an intake of 60. 
              The mission of the Department is to provide quality and value-laden education for 
              students, in the traditional and contemporary areas of Information Technology.
            </p>
            <p className="text-gray-700 mb-4 transform-gpu will-change-auto">
              Our department offers comprehensive courses in programming, database management, 
              networking, cybersecurity, web technologies, and artificial intelligence. We prepare 
              our students to excel in the rapidly evolving field of IT through a blend of 
              theoretical knowledge and practical applications.
            </p>
            <p className="text-gray-700 mb-6 transform-gpu will-change-auto">
              The department has well-equipped laboratories with modern facilities and is staffed 
              with highly qualified and experienced faculty who are dedicated to ensuring academic 
              excellence and professional growth of students.
            </p>
            <Button
              className="bg-department-purple text-white hover:bg-department-purple-dark"
              onClick={() => setIsGoalDialogOpen(true)}
            >
              Department Goals
            </Button>
            <Tabs defaultValue="vision-mission">
              <TabsList className="flex justify-center space-x-4 flex-wrap">
                <TabsTrigger value="vision-mission" className="px-4 py-2 text-lg font-semibold text-department-purple border-b-2 border-transparent hover:border-department-purple">Vision & Mission</TabsTrigger>

                <TabsTrigger value="pso" className="px-4 py-2 text-lg font-semibold text-department-blue text-department-green border-b-2 border-transparent hover:border-department-green">Program Specific Outcomes</TabsTrigger>

                <TabsTrigger value="po-upto-2023" className="px-4 py-2 text-lg font-semibold text-department-purple border-b-2 border-transparent hover:border-department-purple">Program Outcomes upto 2023</TabsTrigger>

                <TabsTrigger value="po-from-2024" className="px-4 py-2 text-lg font-semibold text-department-blue border-b-2 border-transparent hover:border-department-blue">Program Outcomes from 2024</TabsTrigger>
              </TabsList>
              <TabsContent value="vision-mission" className="mt-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">Vision</h2>
                  <p className="text-gray-700 text-lg">
                    To emerge as a premier center for education and research in computer science and engineering and in transforming students into innovative professionals of contemporary and future technologies to cater the global needs of human resources for IT and ITES companies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-blue-700 mb-2">Mission</h2>
                  <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
                    <li>
                      To produce excellent computer science professionals by imparting quality training, hands-on experience, and value-based education.
                    </li>
                    <li>
                      To strengthen links with industry through collaborative partnerships in research & product development and student internships.
                    </li>
                    <li>
                      To promote research-based projects and activities among the students in the emerging areas of technology.
                    </li>
                    <li>
                      To explore opportunities for skill development in the application of computer science among rural and underprivileged populations.
                    </li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="pso" className="mt-6">
                <dl className="text-lg space-y-6">
                  <div>
                    <dt className="font-bold text-indigo-600">PSO1: Professional Skills</dt>
                    <dd className="text-gray-700">
                      Learn the basic concepts of Computer Science and Engineering and apply them to areas like Data Structures, Operating Systems, Computer Organization, Computer Networks, and Information Security in the design and implementation of complex systems.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PSO2: Problem-Solving Skills</dt>
                    <dd className="text-gray-700">
                      Provide solutions to complex Computer Science and Engineering problems using the latest hardware and software tools, along with analytical skills, to arrive at cost-effective and appropriate solutions.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PSO3: Entrepreneurship Skills and Career Management</dt>
                    <dd className="text-gray-700">
                      Demonstrate social awareness, environmental wisdom, and ethical responsibility to lead a successful career and sustain a passion for real-world applications using optimal resources as an entrepreneur.
                    </dd>
                  </div>
                </dl>

              </TabsContent>
              <TabsContent value="po-upto-2023" className="mt-6">
                <dl className="text-lg space-y-6">
                  <div>
                    <dt className="font-bold text-indigo-600">PO1: Engineering Knowledge</dt>
                    <dd className="text-gray-700">
                      Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO2: Problem Analysis</dt>
                    <dd className="text-gray-700">
                      Identify, formulate, review, research, literature and analyze complex engineering problems reaching substantiated conclusions using the first principle of mathematics, natural science and engineering science.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO3: Design/Development of Solutions</dt>
                    <dd className="text-gray-700">
                      Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO4: Conduct Investigations of Complex Problems</dt>
                    <dd className="text-gray-700">
                      Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO5: Modern Tool Usage</dt>
                    <dd className="text-gray-700">
                      Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO6: The Engineer and Society</dt>
                    <dd className="text-gray-700">
                      Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO7: Environment and Sustainability</dt>
                    <dd className="text-gray-700">
                      Understand the impact of professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO8: Ethics</dt>
                    <dd className="text-gray-700">
                      Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO9: Individual and Team Work</dt>
                    <dd className="text-gray-700">
                      Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO10: Communication</dt>
                    <dd className="text-gray-700">
                      Communicate effectively on complex engineering activities with the engineering community and with society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO11: Project Management and Finance</dt>
                    <dd className="text-gray-700">
                      Demonstrate knowledge and understanding of the engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO12: Life-Long Learning</dt>
                    <dd className="text-gray-700">
                      Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.
                    </dd>
                  </div>
                </dl>
              </TabsContent>
              <TabsContent value="po-from-2024" className="mt-6">
                <dl className="text-lg space-y-6">
                  <div>
                    <dt className="font-bold text-indigo-600">PO1: Engineering Knowledge</dt>
                    <dd className="text-gray-700">
                      Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified from WK1 to WK4 respectively to develop the solution of complex engineering problems.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO2: Problem Analysis</dt>
                    <dd className="text-gray-700">
                      Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development. (WK1 to WK4)
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO3: Design/Development of Solutions</dt>
                    <dd className="text-gray-700">
                      Design creative solutions for complex engineering problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required. (WK5)
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO4: Conduct Investigations of Complex Problems</dt>
                    <dd className="text-gray-700">
                      Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis & interpretation of data to provide valid conclusions. (WK8)
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO5: Engineering Tool Usage</dt>
                    <dd className="text-gray-700">
                      Create, select and apply appropriate techniques, resources and modern engineering & IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems. (WK2 and WK6)
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO6: The Engineer and the World</dt>
                    <dd className="text-gray-700">
                      Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on sustainability with reference to economy, health, safety, legal framework, culture and environment. (WK1, WK5, and WK7).
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO7: Ethics</dt>
                    <dd className="text-gray-700">
                      Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national & international laws. (WK9)
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO8: Individual and Collaborative Team work</dt>
                    <dd className="text-gray-700">
                      Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO9: Communication</dt>
                    <dd className="text-gray-700">
                      Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations considering cultural, language, and learning differences.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO10: Project Management and Finance</dt>
                    <dd className="text-gray-700">
                      Apply knowledge and understanding of engineering management principles and economic decision-making and apply these to one's own work, as a member and leader in a team, and to manage projects and in multidisciplinary environments.
                    </dd>
                  </div>

                  <div>
                    <dt className="font-bold text-indigo-600">PO11: Life-Long Learning</dt>
                    <dd className="text-gray-700">
                      Recognize the need for, and have the preparation and ability for i) independent and life-long learning ii) adaptability to new and emerging technologies and iii) critical thinking in the broadest context of technological change. (WK8)
                    </dd>
                  </div>
                </dl>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      {/* Goal Dialog */}
      <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-department-purple">Department Goals</DialogTitle>
            <DialogDescription className="text-gray-700 mt-2 text-sm">
              <dl className="space-y-4">

                <div>
                  <dt className="font-semibold text-indigo-600">Deliver Industry-Relevant Curriculum</dt>
                  <dd className="text-gray-700">
                    Regularly we update the curriculum yearly to reflect emerging technologies such as AI, IoT, cybersecurity, and cloud computing.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Research and Innovation in IT</dt>
                  <dd className="text-gray-700">
                    Promote interdisciplinary research, innovative ideas, and publication in reputed journals and conferences.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Enhance Student Employability and Skill Development</dt>
                  <dd className="text-gray-700">
                    Provide certifications, internships, and training programs in collaboration with industry partners.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Strengthen Industry-Academia Collaboration</dt>
                  <dd className="text-gray-700">
                    Build MoUs with tech companies for internships, guest lectures, real-world projects, and curriculum inputs.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Ensure Quality Teaching and Continuous Learning</dt>
                  <dd className="text-gray-700">
                    Adopt modern pedagogical tools such as Project-Based Learning, flipped classrooms, online labs, and collaborative platforms.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Encourage Entrepreneurship and Start-up Culture</dt>
                  <dd className="text-gray-700">
                    Support incubation centers, hackathons, and innovation challenges for students and faculty.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Improve Infrastructure and Technological Resources</dt>
                  <dd className="text-gray-700">
                    Continuously upgrade labs, servers, and software tools to align with current industry standards.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Promote Ethical and Responsible Use of Technology</dt>
                  <dd className="text-gray-700">
                    Emphasize cybersecurity, digital ethics, and data privacy in teaching and practice.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Achieve National and International Accreditations</dt>
                  <dd className="text-gray-700">
                    Align programs with NBA standards to ensure quality and global recognition.
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-indigo-600">Encourage Global Exposure and Collaboration</dt>
                  <dd className="text-gray-700">
                    Facilitate student and faculty exchange programs, MOUs with international institutions, and joint research.
                  </dd>
                </div>

              </dl>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


      <div className="container mx-auto px-4 py-16 transform-gpu will-change-auto">
        {/* Stats Section */}
        <section className="mt-16 py-12 bg-gradient-to-r from-department-purple/5 to-department-blue/5 rounded-xl transform-gpu will-change-auto">
          <div className="container mx-auto px-4 transform-gpu will-change-auto">
            <h2 className="section-header-center mb-12 transform-gpu will-change-auto">Department Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transform-gpu will-change-auto">
              <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover-effect transform-gpu will-change-auto">
                <div className="text-4xl font-bold text-department-purple mb-2 transform-gpu will-change-auto">94%</div>
                <div className="text-gray-700 transform-gpu will-change-auto">Placement Rate</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover-effect transform-gpu will-change-auto">
                <div className="text-4xl font-bold text-department-blue mb-2 transform-gpu will-change-auto">65+</div>
                <div className="text-gray-700 transform-gpu will-change-auto">Research Contributions</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover-effect transform-gpu will-change-auto">
                <div className="text-4xl font-bold text-department-purple mb-2 transform-gpu will-change-auto">9+</div>
                <div className="text-gray-700 transform-gpu will-change-auto">Industry Partners</div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md card-hover-effect transform-gpu will-change-auto">
                <div className="text-4xl font-bold text-department-blue mb-2 transform-gpu will-change-auto">5</div>
                <div className="text-gray-700 transform-gpu will-change-auto">Active Student Clubs</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
