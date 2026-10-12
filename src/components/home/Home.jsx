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
            <a className="button button-primary" href="/recipes">
              Explore recipes <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="/recipes/create">
              Have a recipe to share? <span aria-hidden="true">↗</span>
            </a>
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

      {/* Category Section */}

      {/* <section className="category-section" id="categories">
        <div className="container">
          <div className="section-heading section-heading-row">
            <div>
              <span className="eyebrow">What's on the menu?</span>
              <h2>Explore by category</h2>
            </div>
            <a className="text-link" href="catalog.html">
              View all recipes <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="category-grid">
            <a className="category-card" href="catalog.html">
              <span className="category-icon category-sun">☀</span>
              <span>
                <strong>Breakfast</strong>
                <small>Start the day right</small>
              </span>
              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="category-card" href="catalog.html">
              <span className="category-icon category-leaf">✿</span>
              <span>
                <strong>Lunch</strong>
                <small>Fresh & satisfying</small>
              </span>
              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="category-card" href="catalog.html">
              <span className="category-icon category-peach">♨</span>
              <span>
                <strong>Dinner</strong>
                <small>Gather around</small>
              </span>
              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="category-card" href="catalog.html">
              <span className="category-icon category-lilac">♡</span>
              <span>
                <strong>Desserts</strong>
                <small>A little something sweet</small>
              </span>
              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="recipes-section container" id="recipes">
        <div className="section-heading section-heading-row">
          <div>
            <span className="eyebrow">Fresh from the community</span>
            <h2>Recipes to fall for</h2>
            <p className="section-subtitle">
              A few delicious ideas to get you started.
            </p>
          </div>
          <a className="button button-outline" href="catalog.html">
            Browse all recipes <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="recipe-toolbar">
          <label className="search-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id="recipe-search"
              type="search"
              placeholder="Search recipes..."
              aria-label="Search recipes"
            />
          </label>
          <div
            className="filter-pills"
            role="group"
            aria-label="Filter recipes"
          >
            <button
              className="filter-pill active"
              data-filter="All"
              type="button"
            >
              All recipes
            </button>
            <button className="filter-pill" data-filter="Quick" type="button">
              Quick & easy
            </button>
            <button
              className="filter-pill"
              data-filter="Vegetarian"
              type="button"
            >
              Vegetarian
            </button>
            <button className="filter-pill" data-filter="Dessert" type="button">
              Desserts
            </button>
          </div>
        </div>
        <div className="recipe-grid" id="recipe-grid">
          <article
            className="recipe-card"
            data-category="Quick Vegetarian"
            data-search="lemon ricotta pasta pasta dinner vegetarian"
          >
            <a
              className="recipe-image-link"
              href="#recipe-lemon-pasta"
              aria-label="View Lemon ricotta pasta"
            >
              <img
                src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=900&q=85"
                alt="Lemon ricotta pasta topped with fresh herbs"
                loading="lazy"
              />
              <span className="recipe-tag">Quick & easy</span>
            </a>
            <div className="recipe-card-body">
              <div className="recipe-meta">
                <span>DINNER</span>
                <span>·</span>
                <span>20 MIN</span>
                <button
                  className="favorite-button"
                  aria-label="Save Lemon ricotta pasta"
                  type="button"
                >
                  ♡
                </button>
              </div>
              <h3>
                <a href="#recipe-lemon-pasta">Lemon ricotta pasta</a>
              </h3>
              <p>Bright, creamy, and ready before you know it.</p>
              <div className="recipe-author">
                <span className="author-avatar">E</span>
                <span>by Emma Wilson</span>
                <span className="recipe-rating">★ 4.9</span>
              </div>
            </div>
          </article>
          <article
            className="recipe-card"
            data-category="Vegetarian"
            data-search="roasted tomato burrata salad lunch vegetarian"
          >
            <a
              className="recipe-image-link"
              href="#recipe-tomato-salad"
              aria-label="View Roasted tomato and burrata salad"
            >
              <img
                src="https://images.unsplash.com/photo-1753791320863-bda47c67cd00?auto=format&fit=crop&w=900&q=85"
                alt="Tomato salad with creamy burrata and basil"
                loading="lazy"
              />
              <span className="recipe-tag recipe-tag-green">
                Community favorite
              </span>
            </a>
            <div className="recipe-card-body">
              <div className="recipe-meta">
                <span>LUNCH</span>
                <span>·</span>
                <span>15 MIN</span>
                <button
                  className="favorite-button"
                  aria-label="Save Tomato and burrata salad"
                  type="button"
                >
                  ♡
                </button>
              </div>
              <h3>
                <a href="#recipe-tomato-salad">Tomato & burrata salad</a>
              </h3>
              <p>Juicy tomatoes, creamy cheese, and garden basil.</p>
              <div className="recipe-author">
                <span className="author-avatar author-avatar-2">L</span>
                <span>by Luca Moretti</span>
                <span className="recipe-rating">★ 5.0</span>
              </div>
            </div>
          </article>
          <article
            className="recipe-card"
            data-category="Dessert"
            data-search="blueberry lemon loaf cake dessert sweet"
          >
            <a
              className="recipe-image-link"
              href="#recipe-blueberry-loaf"
              aria-label="View Blueberry lemon loaf"
            >
              <img
                src="https://images.unsplash.com/photo-1638270735427-6ffdeed7bf2a?auto=format&fit=crop&w=900&q=85"
                alt="Blueberry lemon loaf cake with fresh blueberries"
                loading="lazy"
              />
              <span className="recipe-tag recipe-tag-purple">
                Something sweet
              </span>
            </a>
            <div className="recipe-card-body">
              <div className="recipe-meta">
                <span>DESSERT</span>
                <span>·</span>
                <span>55 MIN</span>
                <button
                  className="favorite-button"
                  aria-label="Save Blueberry lemon loaf"
                  type="button"
                >
                  ♡
                </button>
              </div>
              <h3>
                <a href="#recipe-blueberry-loaf">Blueberry lemon loaf</a>
              </h3>
              <p>Soft, buttery, and full of little bursts of berry.</p>
              <div className="recipe-author">
                <span className="author-avatar author-avatar-3">S</span>
                <span>by Sofia Green</span>
                <span className="recipe-rating">★ 4.8</span>
              </div>
            </div>
          </article>
        </div>
        <p className="empty-state" id="empty-state" hidden>
          No recipes match your search. Try another word or filter.
        </p>
        <div className="centered-action">
          <a className="button button-dark" href="catalog.html">
            Discover more recipes <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="community-section" id="about">
        <div className="container community-inner">
          <div className="community-art">
            <img
              src="https://images.unsplash.com/photo-1753791320863-bda47c67cd00?auto=format&fit=crop&w=1000&q=85"
              alt="A colorful bowl of fresh seasonal ingredients"
              loading="lazy"
            />
            <span className="community-stamp">
              made
              <br />
              with ♡
            </span>
          </div>
          <div className="community-copy">
            <span className="eyebrow">More than a recipe box</span>
            <h2>
              A table is better
              <br />
              when <em>everyone's invited.</em>
            </h2>
            <p>
              RecipeHub is a place for everyday cooks to share the dishes they
              love. No fancy techniques needed — just good food, honest tips,
              and a community that inspires you to try something new.
            </p>
            <a className="button button-primary" href="register.html">
              Join our kitchen <span aria-hidden="true">→</span>
            </a>
            <div className="community-stat">
              <strong>One recipe at a time.</strong>
              <span>Let's make something lovely.</span>
            </div>
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
          <a className="button button-dark" href="create.html">
            Share your recipe <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section> */}
    </>
  );
}
