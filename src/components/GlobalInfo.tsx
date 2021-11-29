import styled from '@emotion/styled';

interface Props {
	newConfirmed: number;
	newDeaths: number;
	newRecovered: number;
	totalConfirmed: number;
	totalDeaths: number;
	totalRecovered: number;
	date: string;
}

const Wrapper = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
`;

const Title = styled.h1`
	margin-top: 10px;
`;

const Today = styled.h3`
	margin-top: 5px;
`;

const Updated = styled.h3`
	margin-top: 5px;
	font-size: 16px;
	color: gray;
`;

const Stats = styled.div`
	min-width: 500px;
	border: 2px solid lightgray;
	border-radius: 20px;
	display: flex;
	justify-content: space-between;
	padding: 20px;
	box-sizing: border-box;
	background-color: white;
	margin-bottom: 15px;
`;

const StatsItem = styled.div`
	width: 250px;
	/* border: 1px solid lightgray; */
	/* border-radius: 20px; */
	box-sizing: border-box;
	padding-left: 20px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	line-height: 0.5;
	background-color: white;
`;

const StatsText = styled.p`
	font-size: 18px;
`;

const GlobalInfo: React.FunctionComponent<Props> = ({
	newConfirmed,
	newDeaths,
	newRecovered,
	totalConfirmed,
	totalDeaths,
	totalRecovered,
	date,
}) => {
	let today = new Date();
	let year = today.getFullYear();
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	let day = ('0' + today.getDate()).slice(-2);
	let todayString = year + '년 ' + month + '월 ' + day + '일';

	let updated = new Date(date);
	let updatedDay = ('0' + updated.getDate()).slice(-2);
	let updatedHalf = '오전';
	let updatedHours = updated.getHours();
	if (updatedHours > 12) {
		updatedHours = updatedHours - 12;
		updatedHalf = '오후';
	}
	let updatedMinutes = updated.getMinutes();
	let updatedString =
		year +
		'년 ' +
		month +
		'월 ' +
		updatedDay +
		'일 ' +
		updatedHalf +
		' ' +
		updatedHours +
		'시 ' +
		updatedMinutes +
		'분';

	return (
		<Wrapper>
			<Title>코로나19(COVID-19) 세계 현황</Title>
			{/* <Today>{dateString.toString()}</Today> */}
			<Today>{todayString}</Today>
			<Updated>마지막 업데이트: {updatedString}</Updated>
			<Stats>
				<StatsItem>
					<StatsText>
						신규 확진자: {new Intl.NumberFormat().format(newConfirmed)}
					</StatsText>
					<StatsText>
						신규 사망자: {new Intl.NumberFormat().format(newDeaths)}
					</StatsText>
					<StatsText>
						신규 완치자: {new Intl.NumberFormat().format(newRecovered)}
					</StatsText>
				</StatsItem>
				<StatsItem>
					<StatsText>
						전체 확진자: {new Intl.NumberFormat().format(totalConfirmed)}
					</StatsText>
					<StatsText>
						전체 사망자: {new Intl.NumberFormat().format(totalDeaths)}
					</StatsText>
					<StatsText>
						전체 완치자: {new Intl.NumberFormat().format(totalRecovered)}
					</StatsText>
				</StatsItem>
			</Stats>
		</Wrapper>
	);
};

export default GlobalInfo;
