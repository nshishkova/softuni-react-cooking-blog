import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const { isAuthenticated } = useAuth();
  // On small screens the navigation is hidden until the menu button is clicked
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (

<header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="FoodMates home">
          <span className="brand-mark" aria-hidden="true">
            f.
          </span>
          <span>
            food<span className="brand-accent">mates</span>
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-nav"
          onClick={() => setIsMenuOpen(state => !state)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav
          className={isMenuOpen ? "primary-nav is-open" : "primary-nav"}
          id="primary-nav"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className="nav-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/recipes" className="nav-link" onClick={closeMenu}>
            Recipes
          </NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>
            About
          </NavLink>

          {/* On smaller screens the outline buttons are hidden, so the account links are shown in the menu */}
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="nav-link nav-account" onClick={closeMenu}>
                My Profile
              </NavLink>
              <Link to="/logout" className="nav-link nav-account" onClick={closeMenu}>
                Log out
              </Link>
            </>
          ) : (
            <NavLink to="/login" className="nav-link nav-account" onClick={closeMenu}>
              Log in
            </NavLink>
          )}
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
