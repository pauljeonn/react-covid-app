import { useState, useEffect } from 'react';
import { Global, css } from '@emotion/react';
import type { ResponseData, Country } from './types';
import CountryList from './components/CountryList';
import GlobalInfo from './components/GlobalInfo';
import BarChart from './components/BarChart';
import styled from '@emotion/styled';
import { IoIosRefresh } from 'react-icons/io';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Reset = styled.div`
	margin-top: 15px;
	width: 68px;
	height: 26px;
	background-color: white;
	border: 1px solid black;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const App: React.FunctionComponent = () => {
	const [data, setData] = useState<ResponseData | undefined>();
	const [activeCountries, setActiveCountries] = useState<Country[]>([]);
	const [isToggleReset, setIsToggleReset] = useState<Boolean>(false);

	const fetchData = async () => {
		const result = await fetch('https://api.covid19api.com/summary');
		const data: ResponseData = await result.json();

		setData(data);
	};

	// 첫 화면 렌더링 시, 데이터 fetch해오기
	useEffect(() => {
		fetchData();
	}, []);

	// 현재 선택된 country를 activeCountries에 포함시켜준다 (이미 있으면 빼준다)
	const onCountryClick = (country: Country) => {
		const countryIndex = activeCountries.findIndex(
			(activeCountry) => activeCountry.ID === country.ID
		);

		// 만약 이미 선택한 country를 다시 선택했다면 activeCountries에서 제거해준다
		if (countryIndex > -1) {
			const newActiveCountries = [...activeCountries];
			newActiveCountries.splice(countryIndex, 1);
			setActiveCountries(newActiveCountries);
		} else {
			// 아직 선택하지 않았다면 activeCountries에 추가해준다
			setActiveCountries([...activeCountries, country]);
		}
	};

	// 바 차트 및 컨트리 아이템 리셋
	const reset = () => {
		setActiveCountries([]);
		// 현재 isToggleReset 값 토글하기
		setIsToggleReset(!isToggleReset);
	};

	return (
		<div className="App">
			<Global
				styles={css`
					body {
						background-color: white;
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
						<Container>
							<BarChart countries={activeCountries} />
							<Reset onClick={reset}>
								<IoIosRefresh />
							</Reset>
						</Container>
					) : (
						<p style={{ textAlign: 'center' }}>
							비교하고싶은 나라를 클릭해주세요.
						</p>
					)}

					<CountryList
						countries={data.Countries}
						onItemClick={onCountryClick}
						isReset={isToggleReset}
					/>
				</>
			) : (
				'Loading...'
			)}
		</div>
	);
};

export default App;
