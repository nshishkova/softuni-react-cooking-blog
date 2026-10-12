import { useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "../../utils/request";

export default function RecipeDetails() {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        request(`/recipes?id=eq.${recipeId}`)
            .then(result => {
                setRecipe(result[0])
    }).catch(error => alert(error));
    }, [recipeId]);

    return (
        

    <main id="main">
      <section className="container recipe-detail">
        <a className="back-link" href="/recipes">← Back to all recipes</a>
        <div className="detail-hero">
          <div>
            <span className="eyebrow">A community favorite · Dinner</span>
            <h1>{recipe.title}</h1>
            <p className="hero-description">
              {recipe.description}
            </p>
            <div className="detail-meta">
              <span>◷ {recipe.prepTime} minutes</span><span>♧ Easy</span
              ><span>★ 4.9 (28 reviews)</span>
            </div>
            <p>Shared by <strong>Emma Wilson</strong></p>
            <div className="hero-actions">
              <a className="button button-primary" href="login.html"
                >♡ Save recipe</a
              ><a className="button button-outline" href="edit.html">Edit recipe</a>
            </div>
          </div>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
          />
        </div>
        <div className="detail-columns">
          <section className="detail-panel">
            <span className="eyebrow">What you'll need</span>
            <h2>Ingredients</h2>
            <ul>
              <li>250 g pasta</li>
              <li>150 g ricotta cheese</li>
              <li>1 lemon, zested and juiced</li>
              <li>2 tbsp olive oil</li>
              <li>Fresh basil leaves</li>
              <li>Salt and freshly ground pepper</li>
              <li>Grated parmesan, to serve</li>
            </ul>
          </section>
          <section>
            <span className="eyebrow">Let's get cooking</span>
            <h2>Instructions</h2>
            <ol>
              <li>
                <strong>Cook the pasta.</strong> Bring a pot of salted water to
                a boil and cook pasta according to the package instructions.
                Save a mug of pasta water before draining.
              </li>
              <li>
                <strong>Make the sauce.</strong> Stir ricotta, lemon zest, lemon
                juice, olive oil, salt, and pepper in a large bowl.
              </li>
              <li>
                <strong>Bring it together.</strong> Add the hot pasta and a
                splash of pasta water. Toss until the sauce is silky and coats
                every strand.
              </li>
              <li>
                <strong>Finish and serve.</strong> Add fresh basil and parmesan.
                Taste, season, and enjoy straight away.
              </li>
            </ol>
          </section>
        </div>
        <section className="comments-section">
          <span className="eyebrow">Around the table</span>
          <h2>Comments & tips</h2>
          <div className="comment-card">
            <strong>Amelia R.</strong>
            <p>
              Added a little chili flakes and it was lovely. Perfect weeknight
              dinner!
            </p>
          </div>
          <div className="comment-card">
            <strong>Jordan K.</strong>
            <p>
              So simple and fresh. I used whole-wheat pasta and it worked great.
            </p>
          </div>
          <form className="comment-form">
            <label htmlFor="comment">Have a tip or question?</label
            ><textarea
              id="comment"
              rows="3"
              placeholder="Share your thoughts..."
            ></textarea>
            <p>
              <a className="button button-primary" href="login.html"
                >Log in to comment</a
              >
            </p>
          </form>
        </section>
      </section>
    </main>

    )
}