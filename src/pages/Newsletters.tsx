import React from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const newsletters2025_2026 = [
	{
		volume: "Volume 1",
		cover: "/nl.png",
		pdf: "https://drive.google.com/file/d/1iudmWisKzasPFfA6rlm9HH1YHy98KHp-/view?usp=sharing",
		date: "2025-2026",
		description:
			"New edition featuring department highlights, student achievements, and industry collaborations.",
	},
];

const newsletters2024_2025 = [
	{
		volume: "Volume 2",
		cover: "/nl.png",
		pdf: "https://drive.google.com/file/d/1Dva0vf4u9wf1ET43BqbR3itn2vp1Miev/view?usp=sharing",
		date: "January 2025 to June 2025",
		description:
			"Second edition with research spotlights, club activities, and placement success stories.",
	},
	{
		volume: "Volume 1",
		cover: "/nl.png",
		pdf: "https://drive.google.com/file/d/1NF8vu2r-MJ2_uWaTWuzXUITyoofQttW1/view?usp=sharing",
		date: "July 2024 to December 2024",
		description:
			"Inaugural edition featuring department highlights, student achievements, and industry collaborations.",
	},
	
];

const NewsletterSection = ({ title, newsletters }: { title: string; newsletters: typeof newsletters2025_2026 }) => {
	const [openIdx, setOpenIdx] = React.useState<number | null>(null);

	const getEmbedUrl = (url: string) => {
		const match = url.match(/\/d\/([\w-]+)\//);
		return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
	};

	return (
		<div className="mb-12">
			<h2 className="text-2xl font-semibold text-department-accent mb-4 text-center">{title}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{newsletters.map((nl, idx) => (
					<Card
						key={idx}
						className="shadow-md border-none card-hover-effect"
					>
						<CardContent className="p-6 flex flex-col items-center text-center">
							<h2 className="text-2xl font-bold font-heading text-department-dark mb-2">
								{nl.volume}
							</h2>
							<div className="text-department-accent font-semibold mb-2">
								{nl.date}
							</div>
							<p className="text-gray-600 mb-4">{nl.description}</p>
							<Button
								variant="default"
								className="flex items-center gap-2"
								onClick={() => setOpenIdx(idx)}
							>
								<Eye size={18} /> View PDF
							</Button>
						</CardContent>
						<Dialog open={openIdx === idx} onOpenChange={() => setOpenIdx(null)}>
							<DialogContent className="max-w-4xl w-full p-0 bg-white rounded-lg shadow-2xl border-0">
								<DialogHeader className="p-4 border-b">
									<DialogTitle className="text-2xl font-bold text-department-dark">{nl.volume} PDF</DialogTitle>
								</DialogHeader>
								<div className="w-full aspect-video bg-gray-50 flex items-center justify-center">
									<iframe
										src={getEmbedUrl(nl.pdf)}
										title={nl.volume}
										className="w-full h-full rounded-b-lg border-0"
										allow="autoplay"
									></iframe>
								</div>
							</DialogContent>
						</Dialog>
					</Card>
				))}
			</div>
		</div>
	);
};

const Newsletters = () => {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold font-heading text-department-dark mb-4">
						Department Newsletters
					</h1>


					<div className="flex items-center gap-4 max-w-2xl mx-auto">
						<img
							src="/nl.png"
							alt="Cover of News Letters"
							className="rounded-lg shadow-2xl w-32 h-32 transform-gpu will-change-auto"
						/>
						<p className="text-xl text-gray-600">
							Stay updated with our department's latest news, achievements, and events.
							Browse and read our beautifully designed newsletters in PDF format.
						</p>
					</div>

					<div className="w-20 h-1 bg-department-accent mx-auto mt-6"></div>
				</div>

				<NewsletterSection title="Academic year 2025-2026" newsletters={newsletters2025_2026} />
				<NewsletterSection title="Academic year 2024-2025" newsletters={newsletters2024_2025} />
			</div>
		</Layout>
	);
};

export default Newsletters;

