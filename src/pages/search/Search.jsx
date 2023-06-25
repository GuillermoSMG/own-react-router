import { Link } from '../../components/link/Link';

function SearchPage({ routeParams }) {
  return (
    <>
      <h1>You have been search {routeParams.query}</h1>
      <Link to='/'>Home</Link>
    </>
  );
}
export default SearchPage;
