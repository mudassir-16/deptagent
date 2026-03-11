import React from 'react';
import Layout from '../components/Layout';

const mous = [
	{
		organization: 'PANTECH E-LEARNING',
		year: '2025',
		status: 'Active',
	},
	{
		organization: 'I & T Labs',
		year: '2023',
		status: 'Active',
	},
	{
		organization: 'VILINDHA TECHNOLOGIES  PVT.LTD',
		year: '2022',
		status: 'Active',
	},
	{
		organization: 'AUGMENTED BYTE(OPC) PVT.LTD',
		year: '2022',
		status: 'Active',
	},
	{
		organization: 'RK’s INSPIRE TECHNOLOGIES',
		year: '2021',
		status: 'Active',
	},
	{
		organization: 'SUN TECHNOLOGIES',
		year: '2020',
		status: 'Active',
	},
	{
		organization: 'CB CRUNCH TECHNOLOGIES  PVT.LTD',
		year: '2020',
		status: 'Active',
	},
	{
		organization: 'VOID MAIN TECHNOLOGIES',
		year: '2020',
		status: 'Active',
	},
	{
		organization: 'BRAIN O VISION SOLUTION PVT.LTD',
		year: '2020',
		status: 'Active',
	},
];

const MOUs = () => {
	return (
		<Layout>
			<section className="bg-gradient-to-r from-department-purple/10 to-department-blue/10 py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold mb-4 text-center text-department-dark">
						MoUs
					</h1>
					<p className="text-gray-700 max-w-3xl mx-auto text-center mb-6">
						Explore our institutional collaborations and MoUs with various
						organizations and companies.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{mous.map((mou, index) => (
							<div
								key={index}
								className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-department-purple hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between h-full"
							>
								<div>
									<h2 className="text-2xl font-bold text-department-purple mb-2 flex items-center gap-2">

										{mou.organization}
									</h2>
									<p className="text-gray-600 font-medium mb-1">
										<span className="font-semibold text-department-dark">
											Year:
										</span>{' '}
										{mou.year}
									</p>
									<p className="text-gray-600 font-medium mb-1">
										<span className="font-semibold text-department-dark">
											Status:
										</span>{' '}
										<span className="inline-block px-2 py-0.5 rounded-full bg-department-purple/10 text-department-purple text-xs font-bold uppercase tracking-wide">
											{mou.status}
										</span>
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default MOUs;
