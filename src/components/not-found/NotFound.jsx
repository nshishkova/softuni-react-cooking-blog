import { Link } from "react-router";

export default function NotFound({
  title = "Page not found",
  message = "The page you're looking for doesn't exist or may have been moved.",
}) {
  return (
    <main className="container not-found" id="main">
      <span className="not-found-code" aria-hidden="true">404</span>
      <span className="eyebrow">Oops, nothing cooking here</span>
      <h1>{title}</h1>
      <p className="section-subtitle">{message}</p>
      <div className="not-found-actions">
        <Link className="button button-primary" to="/recipes">
          Browse recipes <span aria-hidden="true">→</span>
        </Link>
        <Link className="button button-outline" to="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
