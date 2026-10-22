import ListComment from '../list-comment/ListComment';
import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import CreateComment from "../create-comment/CreateComment.jsx";
import request from "../../utils/request";
import { recipeApi } from "../../api";
import AuthContext from "../../contexts/auth-context";

export default function RecipeDetails() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const isOwner = user && user?.id === recipe?.user_id;


  useEffect(() => {
    request(`/recipes?id=eq.${recipeId}`)
      .then((result) => {
        setRecipe(result[0]);
      })
      .catch((error) => alert(error));
  }, [recipeId]);

  const deleteRecipeClickHandler = async (e) => {
    e.preventDefault();

    const confirmed = confirm(`Are you sure you want to delete ${recipe.title} recipe?`);

    if (!confirmed) {
        return;
    }

    try {
      await recipeApi.remove(recipeId);
      navigate('/recipes');
    } catch (error) {
      alert(error);
    }
    
  }

  return (
    <main id="main">
      <section className="container recipe-detail">
        <a className="back-link" href="/recipes">
          ← Back to all recipes
        </a>
        <div className="detail-hero">
          <div>
            <span className="eyebrow">A community favorite · Dinner</span>
            <h1>{recipe.title}</h1>
            <p className="hero-description">{recipe.description}</p>
            <div className="detail-meta">
              <span>◷ {recipe.prepTime} minutes</span>
              <span>♧ Easy</span>
              <span>★ 4.9 (28 reviews)</span>
            </div>
            <p>
              Shared by <strong>Emma Wilson</strong>
            </p>
            <div className="hero-actions">
              <a href="/login" className="button button-primary">
                ♡ Save recipe
              </a>

              {isOwner && (
              <>
                <Link
                  to={`/recipes/${recipeId}/edit`}
                  className="button button-outline"
                >
                  ✏️ Edit recipe
                </Link>

                <a href={`/recipes/${recipeId}/delete`} type="button" className="button button-outline" onClick={deleteRecipeClickHandler}>
                  🗑️ Delete recipe
                </a>
              </>)}
            </div>
          </div>
          <img src={recipe.imageUrl} alt={recipe.title} />
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
          <ListComment recipeId={recipeId} refresh={refresh} /> 
          
          {isAuthenticated && !isOwner ? (
            <CreateComment user={user} recipeId={recipeId} onCreate={() => setRefresh(state => !state)} />
          ) : (
            <p>
                <a className="button button-primary" href="/login">
                    Log in to comment
                </a>
            </p>
          )
          }
        </section>
      </section>
    </main>
  );
}
