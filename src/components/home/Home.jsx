import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot"></span> Fresh food · Brighter days
          </span>
          <h1>
            Find your next
            <br />
            <em>favorite</em> recipe.
          </h1>
          <p className="hero-description">
            Discover fresh, feel-good recipes made for everyday life. Save the
            dishes you love and share something delicious with the community.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/recipes">
              Explore recipes <span aria-hidden="true">→</span>
            </Link>
            {/* <a className="text-link" href="/recipes/create">
              Have a recipe to share? <span aria-hidden="true">↗</span>
            </a> */}
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-one">M</span>
              <span className="avatar avatar-two">A</span>
              <span className="avatar avatar-three">J</span>
            </div>
            <p>
              <strong>Made with love</strong>
              <br />
              <span>By home cooks, for home cooks</span>
            </p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=1400&q=85"
              alt="Fresh pasta with tomatoes, basil and parmesan"
              className="hero-image"
            />
            <div className="image-label">
              <span className="label-icon" aria-hidden="true">
                ✳
              </span>
              <span>
                <strong>Simple ingredients.</strong>
                <br />
                Beautiful results.
              </span>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-star" aria-hidden="true">
              ✳
            </span>
            <span>
              Cook something
              <br />
              you'll remember.
            </span>
          </div>
        </div>
      </section>

      <section className="newsletter-section container" id="share">
        <div className="newsletter-card">
          <div>
            <span className="eyebrow">Your kitchen, your story</span>
            <h2>Have a recipe worth sharing?</h2>
            <p>
              Pass it on. Your next favorite dish might come from someone just
              like you.
            </p>
          </div>
          <Link className="button button-dark" to="/recipes/create">
            Share your recipe <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </>
  );
}
