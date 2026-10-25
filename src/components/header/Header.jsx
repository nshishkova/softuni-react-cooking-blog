import { Link, NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (

<header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="RecipeHub home">
          <span className="brand-mark" aria-hidden="true">
            r.
          </span>
          <span>
            recipe<span className="brand-accent">hub</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded="false"
          aria-controls="primary-nav"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav
          className="primary-nav"
          id="primary-nav"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/recipes" className="nav-link">
            Recipes
          </NavLink>
          {/* <Link to="/categories" className="nav-link">
            Categories
          </Link> */}
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </nav>

        <div className="header-actions">
          {/* Show different header actions based on authentication status */}
          {isAuthenticated ? (
            // Header for logged-in users
            <>
              <Link
                to="/recipes/create"
                className="button button-primary button-small"
              >
                Share a Recipe <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/profile"
                className="button button-outline button-small"
              >
                My Profile
              </Link>
              <Link to="/logout" className="button button-outline button-small">
                Log out
              </Link>
            </>
          ) : (
            // Header for guests who are not logged in
            <>
              <Link to="/login" className="button button-outline button-small">
                Log in
              </Link>
              <Link
                to="/register"
                className="button button-primary button-small"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
