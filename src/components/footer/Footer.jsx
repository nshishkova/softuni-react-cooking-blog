import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Link className="brand footer-brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            r.
          </span>
          <span>
            recipe<span className="brand-accent">hub</span>
          </span>
        </Link>
        <p>Good food. Shared often.</p>
        <nav aria-label="Footer navigation">
          <Link to="/recipes">Recipes</Link>
          <Link to="/about">About</Link>
          {/* <a href="#contact">Contact</a> */}
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>
          © <span id="year"></span> RecipeHub. Made with care.
        </span>
        <span>
          Designed for curious home cooks <span aria-hidden="true">♡</span>
        </span>
      </div>
    </footer>
  );
}
