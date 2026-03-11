import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPortal } from 'react-dom'; // Import createPortal

// Convert Google Drive link to embeddable preview link
const getEmbedLink = (url: string) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

// --- ReportModal Component ---
const ReportModal = React.forwardRef(({ isOpen, onClose, src }: any, ref: any) => {
    if (!isOpen) return null;

    return (
        <div
            ref={ref}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000] p-4 cursor-pointer" // Added cursor-pointer
            onClick={onClose} // Close on overlay click
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[90vh] flex flex-col relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full p-1 hover:bg-gray-400 transition-colors duration-200 z-10 cursor-pointer" // Changed hover:bg-gray-300 to hover:bg-gray-400 and added cursor-pointer
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Content Area */}
                <div className="flex-grow overflow-hidden pt-10">
                    {src ? (
                        src.toLowerCase().endsWith('.pdf') || src.includes('drive.google.com') ? (
                            <iframe
                                src={getEmbedLink(src)}
                                className="w-full h-full border-none"
                                title="Placement Report"
                                allowFullScreen
                                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                            ></iframe>
                        ) : (
                            <img
                                src={src}
                                alt="Placement Report"
                                className="max-w-full max-h-full object-contain mx-auto my-auto"
                            />
                        )
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No report available.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
ReportModal.displayName = 'ReportModal';

// --- Main Placements Component ---
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR0YrL_-K8ffPKIelEfprG9LU8wg5tjvpJs7orx9dLv1Coa3uGjJcmrDi4awxm6ng/pub?output=csv';

const Placements = () => {
    const [placementData, setPlacementData] = useState<any[]>([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentReportLink, setCurrentReportLink] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(csvUrl)
            .then((response) => response.text())
            .then((data) => {
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const formattedData = results.data.map((row: any) => ({
                            year: row.Year,
                            studentsPlaced: parseInt(row.StudentsPlaced),
                            offers: parseInt(row.Offers),
                            numberOfStudentsEligible: parseInt(row.Eligible),
                            topCompanies: row.TopCompanies.split(',').map((s) => s.trim()),
                            highlight: row.Highlight,
                            color: row.Color.toLowerCase() === 'purple' ? 'purple' : 'blue',
                            placementReportLink: row.PlacementReportLink,
                        }));
                        setPlacementData(formattedData);
                    },
                });
            })
            .catch((error) => {
                console.error("Error fetching or parsing CSV:", error);
            });
    }, []);

    useEffect(() => {
        if (isModalOpen && modalRef.current) {
            setTimeout(() => {
                modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [isModalOpen]);

    const handleCardClick = (data: any, idx: number) => {
        setSelectedCardIndex(idx);

        if (data.placementReportLink) {
            setCurrentReportLink(data.placementReportLink);
            setIsModalOpen(true);
        } else {
            setCurrentReportLink('');
            setIsModalOpen(false);
            alert(`No detailed report available for ${data.year} at this time.`);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentReportLink('');
        setSelectedCardIndex(null);
    };

    return (
        <Layout>
            <section className="bg-gradient-to-r from-department-purple/10 to-department-blue/10 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4 text-center text-department-dark">Placements</h1>
                    <p className="text-gray-700 max-w-3xl mx-auto text-center mb-0">
                        Explore our placement statistics and success stories. Click on an academic year to view the detailed placement report.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {placementData.map((data, idx) => (
                        <Card
                            key={data.year}
                            className={`transition-transform duration-300 shadow-lg border-t-4 cursor-pointer card-hover-effect ${data.color === 'purple' ? 'border-department-purple' : 'border-department-blue'} ${selectedCardIndex === idx ? 'scale-105 ring-2 ring-department-purple/40' : 'hover:scale-105'}`}
                            onClick={() => handleCardClick(data, idx)}
                        >
                            <CardHeader className={`bg-gradient-to-r ${data.color === 'purple' ? 'from-department-purple/5 to-department-purple/10' : 'from-department-blue/5 to-department-blue/10'}`}>
                                <CardTitle className={`text-2xl ${data.color === 'purple' ? 'text-department-purple' : 'text-department-blue'} font-semibold`}>
                                    {data.year}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 py-6">
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-lg font-medium text-gray-700">Number of Students Eligible</span>
                                    <span className="text-3xl font-bold text-department-dark">{data.numberOfStudentsEligible}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-lg font-medium text-gray-700">No. of Students Placed</span>
                                    <span className="text-3xl font-bold text-department-dark">{data.studentsPlaced}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-lg font-medium text-gray-700">No. of Offers</span>
                                    <span className="text-3xl font-bold text-department-dark">{data.offers}</span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-lg font-medium text-gray-700">Top Recruiters</span>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {data.topCompanies.map((company: string, i: number) => (
                                            <span
                                                key={i}
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${data.color === 'purple' ? 'bg-department-purple/10 text-department-purple' : 'bg-department-blue/10 text-department-blue'}`}
                                            >
                                                {company}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className={`text-base font-semibold ${data.color === 'purple' ? 'text-department-purple' : 'text-department-blue'}`}>
                                        {data.highlight}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Report Modal */}
            {isModalOpen && createPortal(
                <ReportModal
                    ref={modalRef}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    src={currentReportLink}
                />,
                document.body // Render the modal directly into the document body
            )}
        </Layout>
    );
};

export default Placements;
