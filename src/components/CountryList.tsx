import styled from '@emotion/styled';
import { Country } from '../types';
import CountryItem from './CountryItem';

interface Props {
	countries: Country[];
	onItemClick: (country: Country) => void;
}

const ListWrapper = styled.ul`
	padding: 0;
	display: flex;
	flex-wrap: wrap;
`;

const CountryList: React.FunctionComponent<Props> = ({
	countries,
	onItemClick,
}) => {
	return (
		<ListWrapper>
			{countries.map((country) => (
				// props로 받아온 onItemClick을 CountryItem의 props로 또 전달한다
				<CountryItem country={country} onItemClick={onItemClick} />
			))}
		</ListWrapper>
	);
};

export default CountryList;
