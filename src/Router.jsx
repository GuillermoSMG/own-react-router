import { Children, useEffect, useState } from 'react';
import { EVENTS } from './consts';
import { match } from 'path-to-regexp';
import { getCurrentPath } from './utils';

function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404 - Not found</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);
  let routeParams = {};

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;

    const isRoute = name === 'Route';

    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    // path-to-regexp to detect dynamic routes like =>
    // /search/:query
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    // save dynamic route params extracted with path-to-regexp
    // Example => /search/:query =>
    // URL => /search/react =>
    // matched.params.query === 'react'
    routeParams = matched.params;
    return true;
  })?.Component;
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}

export default Router;
