import { Suspense, lazy } from 'react';
import './App.css';
import Route from './components/route/Route';
import Router from './components/router/Router';

const AboutPage = lazy(() => import('./pages/about/About'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const HomePage = lazy(() => import('./pages/home/Home'));
const SearchPage = lazy(() => import('./pages/search/Search'));

const appRoutes = [
  {
    path: '/:lang',
    Component: HomePage,
  },
  {
    path: '/:lang/about',
    Component: AboutPage,
  },
  {
    path: '/search/:query',
    Component: SearchPage,
  },
];
function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router
          routes={appRoutes}
          defaultComponent={NotFound}
        >
          <Route
            path='/'
            Component={HomePage}
          />
          <Route
            path='/en/about'
            Component={AboutPage}
          />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
