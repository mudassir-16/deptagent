import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Research = () => {
  const priorityOrder = ['Prof.', 'Dr.', 'Mrs.', 'Mr.'];
  const facultyOrder = [
    "Prof. B.V. Chowdary",
    "Dr. M. Prabhakar",
    "Dr. B. Naveen Kumar",
    "Mr. Sk. Khaleelullah",
    "Mrs. T. Aruna",
    "Mr. G. Chanakya",
    "Mr. J. Srikanth",
    "Mr. A. Sankar Reddy",
    "Mr. M.S.B Kasyapa",
    "Mr. G. Rama Krishna",
    "Mrs. CH. Sai Vijaya",
  ];

  const researchWorks = [
    { fieldOfStudy: "AI & Machine Learning", topic: "Next-Gen in-Vehicle Interaction: Wibots Wireless Network Edge Based Gesture Recognition By Using Machine Learning", faculty: "Mrs. T. Aruna" },
    { fieldOfStudy: "Deep Learning", topic: "Deep Fake Detection using Adversarial Ensemble Techniques", faculty: "Prof. B.V. Chowdary" },
    { fieldOfStudy: "Cyber Security", topic: "EFFICIENT SUPERVISED MACHINE LEARNING FOR CYBERSECURITY APPLICATIONS USING ADAPTIVE FEATURE SELECTION AND EXPLAINABLE AI SCENARIOS", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Web Spoofing Prevention: Machine Learning based Client-Side Defence", faculty: "Mr. G. Chanakya" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Eduflex Card–A Digital Card for Student Account", faculty: "Mr. G. Chanakya" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Hypokinetic Rigid Syndrome: Early Prediction of Parkinson’s Disease using Ensemble classifiers", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Artificial Intelligence based Multi-Face Recognition and Attendance Marking System", faculty: "Mr. J. Srikanth" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Smart Voting System Utilizing Iris Recognition Technology", faculty: "Mr. J. Srikanth" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Analysis of Advanced Technology Integrated Interviews", faculty: "Mr. Sk. Khaleelullah" },
    { fieldOfStudy: "AI & Machine Learning", topic: "DietRx: Machine Learning Enhanced Disease Specific Nutrition and Precautions", faculty: "Mr. Sk. Khaleelullah" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Federated Learning-Driven Decentralized Intelligence for Explainable Anomaly Detection in Industrial Operations", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "Cyber Security", topic: "Machine Learning for Web Security: Strategies to Detect and Prevent Malicious Activities", faculty: "Mr. G. Chanakya" },
    { fieldOfStudy: "Cyber Security", topic: "Revealing Cyber Risks: Innovating Malicious URL Detection with Diverse Machine Learning Strategies", faculty: "Mr. G. Chanakya" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Automated Mitotic Nuclei Classification Using Fruitfly Optimization Algorithm with Machine Learning on Breast Cancer Diagnosis", faculty: "Mrs. T. Aruna" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Traffic Route Prediction", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "Blockchain", topic: "Blockchain Anchored Federated Learning and Tokenized Traceability for Sustainable Food Supply Chains", faculty: "Dr. B. Naveen Kumar" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Interview Brilliance: Harnessing AI for Confidence-Driven Evaluation", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "Deep Learning", topic: "Analyzing and Detecting Digital Counterfeit Images using DenseNet, ResNet and CNN", faculty: "Mrs. T. Aruna" },
    { fieldOfStudy: "Deep Learning", topic: "Enhancing Urban Mobility: Deep Learning-Based Traffic Sign Assistant for the Visually Impaired", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "AI & Machine Learning", topic: "BUILDING ROBUST IOT NETWORKS WITH DYNAMIC LAYER PRIORITIZATION AND PREDICTIVE FAULT MANAGEMENT PROCESS", faculty: "Prof. B.V. Chowdary" },
    { fieldOfStudy: "Blockchain", topic: "The Role of Blockchain in Transforming Industries Beyond Finance", faculty: "Mr. M.S.B Kasyapa" },
    { fieldOfStudy: "AI & Machine Learning", topic: "IPL SCORE PREDICTION USING RANDOM FOREST", faculty: "Dr. B. Naveen Kumar" },
    { fieldOfStudy: "Deep Learning", topic: "Multi Crop Disease Detection", faculty: "Mr. M.S.B.Kasyapa" },
    { fieldOfStudy: "Deep Learning", topic: "Automated Grain Quality Testing Using CNN, Densenet, Mobile Net", faculty: "Mr. M.S.B.Kasyapa" },
    { fieldOfStudy: "Natural Language Processing", topic: "Real-Time Sentiment Analysis of Comments and Reviews: A Kafka Driven Approach", faculty: "Mrs. T. Aruna" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Professional Pathway Hub", faculty: "Mr. J. Srikanth" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Harnessing Machine Learning Ensembles For Next-Gen Cardiovascular Risk Prediction", faculty: "Dr. B. Naveen Kumar" },
    { fieldOfStudy: "Natural Language Processing", topic: "From Chaos To Clarity- A New Era In Document Clustering And Classification", faculty: "Dr. M. Prabhakar" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Improving Online Real Estate Management System Using Data Analytics", faculty: "Mrs. T. Aruna" },
    { fieldOfStudy: "Deep Learning", topic: "Identification of Missing Child and Recovery System Using Multi Class SVM and Deep Learning", faculty: "Prof. B.V. Chowdary" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Multi Facial Gesture Based Cursor Control System ", faculty: "Mr. Sk. Khaleelullah" },
    { fieldOfStudy: "Deep Learning", topic: "An Automated Leaf & Fruit Disease Prediction using Transfer Learning and Recommendations", faculty: "Mr. G. Chanakya" },
    { fieldOfStudy: "Blockchain", topic: "Funds-Chain: Unlocking the True Potential of Crowdfunding Using Blockchain", faculty: "Prof. B.V. Chowdary" },
    { fieldOfStudy: "Deep Learning", topic: "A Computing Framework for Transfer Learning and Ensemble Classification of Surface Patterns", faculty: "Mr. A. Sankar Reddy" },
    { fieldOfStudy: "Deep Learning", topic: "MRI-Scan Based Brain Tumor Detection", faculty: "Mr. A. Sankar Reddy" },
    { fieldOfStudy: "Natural Language Processing", topic: "Dynamic Multilingual Voice Transcription Using NLP", faculty: "Mr. Sk. Khaleelullah" },
    { fieldOfStudy: "AI & Machine Learning", topic: "Churn Sentry Model Approach: Leveraging Random Forest for Customer Retention using flask", faculty: "Mr. G. Ramakrishna" },
  ];

  // Grouping logic
  const groupedResearch: Record<string, { faculty: string[]; topics: string[] }> = researchWorks.reduce((acc, work) => {
    if (!acc[work.fieldOfStudy]) {
      acc[work.fieldOfStudy] = { faculty: [], topics: [] };
    }
    acc[work.fieldOfStudy].topics.push(work.topic);

    if (!acc[work.fieldOfStudy].faculty.includes(work.faculty)) {
      acc[work.fieldOfStudy].faculty.push(work.faculty);
    }

    return acc;
  }, {});


  // Sort faculty in each field based on explicit facultyOrder
  Object.entries(groupedResearch).forEach(([field, data]) => {
    data.faculty.sort((a, b) => {
      const aIndex = facultyOrder.findIndex(name => a.includes(name));
      const bIndex = facultyOrder.findIndex(name => b.includes(name));
      return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
    });
  });


  const [selectedField, setSelectedField] = useState<string | null>(null);

  return (
      <Layout>
        <section className="bg-gradient-to-r from-department-purple/10 to-department-blue/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-center text-department-dark">Research Works</h1>
            <p className="text-gray-700 max-w-3xl mx-auto text-center mb-0">
              In an era defined by rapid technological advancement, research and innovation have become integral to academic excellence and societal progress. At our department, we have established dedicated research groups focusing on cutting-edge domains. These groups are designed to foster a culture of inquiry, collaboration, and applied research among faculty and students. By working on real-world problems and interdisciplinary projects, our research groups aim to contribute impactful solutions and advance the frontiers of knowledge in their respective areas.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {selectedField === null ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(groupedResearch).map(([field, { faculty }], index) => (
                    <Card
                        key={index}
                        className="shadow-lg border-t-4 border-department-purple hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
                        onClick={() => setSelectedField(field)}
                    >
                      <CardHeader className="bg-gradient-to-r from-department-purple/5 to-department-purple/10">
                        <CardTitle className="text-xl text-department-purple font-semibold">{field}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <h2 className="text-lg font-bold text-department-dark">Research Advisors</h2>
                        <ul className="list-disc list-inside text-gray-700">
                          {faculty.map((name, idx) => (
                              <li key={idx}>{name}</li>
                          ))}
                        </ul>
                        <p className="mt-2 font-semibold text-department-purple">
                          Total Research Papers: {groupedResearch[field].topics.length}
                        </p>
                      </CardContent>
                    </Card>
                ))}
              </div>
          ) : (
              <div>
                <button
                    className="mb-6 bg-department-purple text-white px-4 py-2 rounded"
                    onClick={() => setSelectedField(null)}
                >
                  Back to Research Groups
                </button>
                <h2 className="text-3xl font-bold mb-4 text-department-dark">Contribution in {selectedField}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {groupedResearch[selectedField].topics.map((topic, idx) => (
                      <Card
                          key={idx}
                          className="shadow-md border-t-4 border-department-purple hover:shadow-lg transition-shadow duration-300"
                      >
                        <CardHeader className="bg-gradient-to-r from-department-purple/5 to-department-purple/10">
                          <CardTitle className="text-department-purple text-lg font-semibold">
                            {topic}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                  ))}
                </div>


              </div>
          )}
        </div>
      </Layout>
  );
};

export default Research;