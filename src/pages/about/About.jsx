import { Link } from '../../components/link/Link';
import { useI18n } from '../../hooks/useI18n';
import { i18nAbout } from '../../utils/i18n';

function AboutPage({ routeParams }) {
  const i18n = useI18n(i18nAbout, routeParams.lang ?? 'en');
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to='/'>{i18n.tag}</Link>
    </>
  );
}

export default AboutPage;
