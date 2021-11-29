import { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import type { ResponseData, Country } from './types';
import CountryList from './components/CountryList';
import GlobalInfo from './components/GlobalInfo';
import BarChart from './components/BarChart';

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
						background-color: white;
						font-family: 'Lato', sans-serif;
						font-family: 'Noto Sans KR', sans-serif;
					}
				`}
			/>

			{data ? (
				<>
					<GlobalInfo
						newConfirmed={data.Global.NewConfirmed}
						newDeaths={data.Global.NewDeaths}
						newRecovered={data.Global.NewRecovered}
						totalConfirmed={data.Global.TotalConfirmed}
						totalDeaths={data.Global.TotalDeaths}
						totalRecovered={data.Global.TotalRecovered}
						date={data.Global.Date}
					/>

					<hr />

					{activeCountries.length ? (
						<BarChart countries={activeCountries} />
					) : (
						<p style={{ textAlign: 'center' }}>
							비교하고싶은 나라를 클릭해주세요.
						</p>
					)}

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
