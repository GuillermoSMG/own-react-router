import { Link } from '../../components/link/Link';
import { useI18n } from '../../hooks/useI18n';
import { i18nHome } from '../../utils/i18n';

function HomePage({ routeParams }) {
  const i18n = useI18n(i18nHome, routeParams.lang ?? 'en');
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to='/en/about'>{i18n.tag}</Link>
    </>
  );
}

export default HomePage;
