export default function Catalog() {
  return (
      <section className="container catalog-intro">
        <span className="eyebrow">Fresh from the community</span>
        <h1>Find something <em>delicious.</em></h1>
        <p className="section-subtitle">
          Explore everyday favorites, quick meals, and something sweet.
        </p>
        <div className="recipe-toolbar catalog-tools">
          <label className="search-box"
            ><span aria-hidden="true">⌕</span
            ><input
              type="search"
              placeholder="Search recipes..."
              aria-label="Search recipes"
          /></label>
          <div className="filter-pills">
            <a className="filter-pill active" href="catalog.html">All recipes</a
            ><a className="filter-pill" href="catalog.html#quick">Quick & easy</a
            ><a className="filter-pill" href="catalog.html#vegetarian">Vegetarian</a
            ><a className="filter-pill" href="catalog.html#desserts">Desserts</a>
          </div>
        </div>
        <div className="recipe-grid">
          <article className="recipe-card">
            <a className="recipe-image-link" href="details.html"
              ><img
                src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=900&q=85"
                alt="Fresh pasta with tomatoes and herbs"
              /><span className="recipe-tag">Quick & easy</span></a
            >
            <div className="recipe-card-body">
              <div className="recipe-meta">
                <span>DINNER</span><span>·</span><span>20 MIN</span>
              </div>
              <h3><a href="details.html">Lemon ricotta pasta</a></h3>
              <p>Bright, creamy, and ready before you know it.</p>
              <div className="recipe-author">
                <span className="author-avatar">E</span><span>by Emma Wilson</span
                ><span className="recipe-rating">★ 4.9</span>
              </div>
            </div>
          </article>
          <article className="recipe-card">
            <a className="recipe-image-link" href="details.html"
              ><img
                src="https://images.unsplash.com/photo-1753791320863-bda47c67cd00?auto=format&fit=crop&w=900&q=85"
                alt="Tomato and burrata salad"
              /><span className="recipe-tag recipe-tag-green">Vegetarian</span></a
            >
            <div className="recipe-card-body">
              <div className="recipe-meta">
                <span>LUNCH</span><span>·</span><span>15 MIN</span>
              </div>
              <h3><a href="details.html">Tomato & burrata salad</a></h3>
              <p>Juicy tomatoes, creamy cheese, and garden basil.</p>
              <div className="recipe-author">
                <span className="author-avatar author-avatar-2">L</span
                ><span>by Luca Moretti</span
                ><span className="recipe-rating">★ 5.0</span>
              </div>
            </div>
          </article>
          <article className="recipe-card">
            <a className="recipe-image-link" href="details.html"
              ><img
                src="https://images.unsplash.com/photo-1638270735427-6ffdeed7bf2a?auto=format&fit=crop&w=900&q=85"
                alt="Blueberry lemon loaf cake"
              /><span className="recipe-tag recipe-tag-purple">Dessert</span></a
            >
            <div className="recipe-card-body">
              <div className="recipe-meta">
                <span>DESSERT</span><span>·</span><span>55 MIN</span>
              </div>
              <h3><a href="details.html">Blueberry lemon loaf</a></h3>
              <p>Soft, buttery, and full of little bursts of berry.</p>
              <div className="recipe-author">
                <span className="author-avatar author-avatar-3">S</span
                ><span>by Sofia Green</span
                ><span className="recipe-rating">★ 4.8</span>
              </div>
            </div>
          </article>
        </div>
        <div className="centered-action">
          <a className="button button-primary" href="create.html"
            >Share your recipe ↗</a
          >
        </div>
      </section>
  );
}