import { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import CountryList from './components/CountryList';
import GlobalInfo from './components/GlobalInfo';
import type { ResponseData, Country } from './types';

const App: React.FunctionComponent = () => {
	const [data, setData] = useState<ResponseData | undefined>();
	const [activeCountries, setActiveCountries] = useState<Country[]>([]);

	const fetchData = async () => {
		const result = await fetch('https://api.covid19api.com/summary');
		const data: ResponseData = await result.json();

		setData(data);
		console.log(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	// 현재 선택된 country를 activeCountries에 포함시켜준다 (이미 있으면 빼준다)
	const onCountryClick = (country: Country) => {
		const countryIndex = activeCountries.findIndex(
			(activeCountry) => activeCountry.ID === country.ID
		);

		if (countryIndex > -1) {
			const newActiveCountries = [...activeCountries];
			newActiveCountries.splice(countryIndex, 1);
			setActiveCountries(newActiveCountries);
		} else {
			setActiveCountries([...activeCountries, country]);
		}
	};

	return (
		<div className="App">
			<Global
				styles={css`
					body {
						background-color: #f1f1f1;
					}
				`}
			/>

			{activeCountries.map((aCountry) => (
				<span>{aCountry.Country}</span>
			))}

			{data ? (
				<>
					<GlobalInfo
						newConfirmed={data.Global.NewConfirmed}
						newDeaths={data.Global.NewDeaths}
						newRecovered={data.Global.NewRecovered}
					/>
					<CountryList
						countries={data.Countries}
						onItemClick={onCountryClick}
					/>
				</>
			) : (
				'Loading...'
			)}
		</div>
	);
};

export default App;
