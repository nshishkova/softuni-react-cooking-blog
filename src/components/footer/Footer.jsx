export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="brand footer-brand" href="index.html">
          <span className="brand-mark" aria-hidden="true">
            r.
          </span>
          <span>
            recipe<span className="brand-accent">hub</span>
          </span>
        </a>
        <p>Good food. Shared often.</p>
        <nav aria-label="Footer navigation">
          <a href="catalog.html">Recipes</a>
          <a href="#about">Our story</a>
          <a href="#contact">Contact</a>
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
