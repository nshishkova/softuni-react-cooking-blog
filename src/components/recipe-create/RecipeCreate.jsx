export default function RecipeCreate() {
  return (
    <main className="container form-page" id="main">
      <section className="editor-heading">
        <a className="back-link" href="catalog.html">← Back to recipes</a
        ><span className="eyebrow">Your kitchen, your story</span>
        <h1>Share a <em>recipe.</em></h1>
        <p>Write it down, add your tips, and pass something delicious along.</p>
      </section>
      <section className="editor-layout">
        <form className="design-form editor-form">
          <div className="form-section-title">
            <span>01</span>
            <div>
              <h2>The essentials</h2>
              <p>Give your recipe a name and a little introduction.</p>
            </div>
          </div>
          <label htmlFor="recipe-title">Recipe title</label
          ><input
            id="recipe-title"
            type="text"
            value=""
            placeholder="e.g. Lemon ricotta pasta"
            required
          /><label htmlFor="description">Short description</label
          ><textarea
            id="description"
            rows="3"
            placeholder="What makes this recipe special?"
          ></textarea>
          <div className="form-two-col">
            <div>
              <label htmlFor="category">Category</label
              ><select id="category">
                <option>Choose a category</option>
                <option selected>Dinner</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
              </select>
            </div>
            <div>
              <label htmlFor="time">Prep + cook time (minutes)</label
              ><input
                id="time"
                type="number"
                min="1"
                value=""
                placeholder="20"
              />
            </div>
          </div>
          <label htmlFor="image">Image URL</label
          ><input
            id="image"
            type="url"
            value=""
            placeholder="https://example.com/your-dish.jpg"
          /><label htmlFor="ingredients"
            >Ingredients <span className="label-hint">One per line</span></label
          ><textarea
            id="ingredients"
            rows="5"
            placeholder="200 g pasta&#10;1 lemon&#10;Fresh basil"
          ></textarea
          ><label htmlFor="instructions">Instructions</label
          ><textarea
            id="instructions"
            rows="6"
            placeholder="1. Prepare your ingredients..."
          ></textarea
          ><label htmlFor="tips">Tips (optional)</label
          ><textarea
            id="tips"
            rows="3"
            placeholder="Any substitutions or serving tips?"
          ></textarea>
          <div className="form-actions">
            <a className="button button-outline" href="index.html">Cancel</a
            ><button className="button button-primary" type="button">
              Publish recipe ↗
            </button>
          </div>
          <p className="demo-note">
            Design preview only — publishing is not connected to a backend.
          </p>
        </form>
        <aside className="editor-aside">
          <div className="aside-tip">
            <span className="tip-icon">✳</span>
            <h3>A little tip</h3>
            <p>
              Clear ingredient amounts and numbered steps make your recipe
              easier for someone else to recreate.
            </p>
          </div>
          <div className="aside-preview">
            <span className="eyebrow">Your recipe, your way</span
            ><img
              src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=800&q=85"
              alt="Pasta inspiration"
            />
            <h3>Make it feel like you.</h3>
            <p>Add the small details you wish you knew before making it.</p>
          </div>
        </aside>
      </section>
    </main>

  );
}