import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Route from './Route.jsx';
import Router from './Router.jsx';
import Link from './Link.jsx';
import { getCurrentPath } from './utils.js';

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn(),
}));

describe('Router', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it('should render without problems', () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it('should render 404 if no routes match', () => {
    render(
      <Router
        routes={[]}
        defaultComponent={() => <h1>404</h1>}
      />
    );
    expect(screen.getByText('404')).toBeTruthy();
  });

  it('should render the component of the first route that match', () => {
    getCurrentPath.mockReturnValue('/about');

    const routes = [
      {
        path: '/',
        Component: () => <h1>home</h1>,
      },
      {
        path: '/about',
        Component: () => <h1>about</h1>,
      },
    ];

    render(<Router routes={routes} />);
    expect(screen.getByText('about')).toBeTruthy();
  });

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/');

    render(
      <Router>
        <Route
          path='/'
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to='/about'>Go to About</Link>
              </>
            );
          }}
        />
        <Route
          path='/about'
          Component={() => <h1>About</h1>}
        />
      </Router>
    );

    // Click on the link
    const button = screen.getByText(/About/);
    fireEvent.click(button);

    const aboutTitle = await screen.findByText('About');

    // Check that the new route is rendered
    expect(aboutTitle).toBeTruthy();
  });
});
