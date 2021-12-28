import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Country } from '../types';

interface Props {
	country: Country;
	onItemClick: (country: Country) => void;
	isReset: Boolean;
}

interface ListContentProps {
	isActive: Boolean;
}

const ListItem = styled.li`
	list-style-type: none;
	flex: 0 1 50%;
	text-align: center;
	cursor: pointer;

	@media (min-width: 480px) {
		flex: 0 0 25%;
	}

	@media (min-width: 1600px) {
		flex: 0 0 20%;
	}
`;

const ListContent = styled.div<ListContentProps>`
	background-color: ${(props) => (props.isActive ? '#FABB33' : '#F8F9F9')};
	margin: 10px;
	padding: 15px 0;
	border-radius: 10px;
`;

const CountryName = styled.h4`
	margin-top: 0;
`;

const CountryItem: React.FunctionComponent<Props> = ({
	country,
	onItemClick,
	isReset,
}) => {
	const [isActive, setIsActive] = useState<Boolean>(false);

	useEffect(() => {
		setIsActive(false);
	}, [isReset]);

	const handleOnClick = (country: Country) => {
		onItemClick(country); // props로 받아온 onItemClick 함수 실행
		setIsActive(!isActive); // 현재 isActive 상태 toggle
	};

	return (
		<ListItem key={country.ID} onClick={() => handleOnClick(country)}>
			<ListContent isActive={isActive}>
				<CountryName>{country.Country}</CountryName>
				<div>확진자: {country.NewConfirmed}</div>
				<div>사망자: {country.NewDeaths}</div>
				<div>완치자: {country.NewRecovered}</div>
			</ListContent>
		</ListItem>
	);
};

export default CountryItem;
