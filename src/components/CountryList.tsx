import { Country } from '../types';

interface Props {
	countries: Country[];
}

const CountryList: React.FunctionComponent<Props> = ({ countries }) => {
	return (
		<ul>
			{countries.map((country) => (
				<li key={country.ID}>{country.Country}</li>
			))}
			<li></li>
		</ul>
	);
};

export default CountryList;
