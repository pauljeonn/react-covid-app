import { useState, useEffect } from 'react';

type Country = {
	Country: string;
	CountryCode: string;
	Date: string;
	ID: string;
	NewConfirmed: number;
	NewDeaths: number;
	NewRecovered: number;
	Premium: unknown;
	Slug: string;
	TotalConfirmed: number;
	TotalDeaths: number;
	TotalRecovered: number;
};

type GlobalData = {
	Date: string;
	NewConfirmed: number;
	NewDeaths: number;
	NewRecovered: number;
	TotalConfirmed: number;
	TotalDeaths: number;
	TotalRecovered: number;
};

type ResponseData = {
	Countries: Country[];
	Date: string;
	Global: GlobalData;
	ID: string;
	Message: string;
};

const App: React.FunctionComponent = () => {
	const [data, setData] = useState<ResponseData | undefined>();

	const fetchData = async () => {
		const result = await fetch('https://api.covid19api.com/summary');
		const data: ResponseData = await result.json();

		setData(data);
		console.log(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			<h1>코로나19(COVID-19) 세계 현황</h1>
		</div>
	);
};

export default App;
