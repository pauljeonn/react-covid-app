import { useState, useEffect } from 'react';

const App: React.FunctionComponent = () => {
	const [data, setData] = useState();

	const fetchData = async () => {
		const result = await fetch('https://api.covid19api.com/summary');
		const data = await result.json();

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
