import styled from '@emotion/styled';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Country } from '../types';

interface Props {
	countries: Country[];
}

const options = {
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: true,
		},
	},
};

const ChartWrapper = styled.div`
	max-width: 700px;
	margin: 0 auto;
`;

const BarChart: React.FunctionComponent<Props> = ({ countries }) => {
	const generateChartData = () => {
		const data: number[] = [];
		const labels: string[] = [];

		countries.forEach((country) => {
			data.push(country.NewConfirmed);
			labels.push(country.Country); // 나라 이름
		});

		return {
			labels,
			datasets: [
				{
					label: 'New Confirmed',
					data,
					backgroundColor: [
						'rgba(255, 99, 132, 0.5)',
						'rgba(111, 194, 230, 0.5)',
						'rgba(244, 188, 37, 0.5)',
						'rgba(100, 235, 105, 0.5)',
						'rgba(170, 100, 235, 0.5)',
					],
				},
			],
		};
	};

	return (
		<ChartWrapper>
			<Chart type="bar" options={options} data={generateChartData()} />
		</ChartWrapper>
	);
};

export default BarChart;
