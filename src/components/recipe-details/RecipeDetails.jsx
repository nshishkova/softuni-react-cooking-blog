import ListComment from '../list-comment/ListComment';
import { Link, useParams, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import CreateComment from "../create-comment/CreateComment.jsx";
import ConfirmModal from "../confirm-modal/ConfirmModal.jsx";
import request from "../../utils/request";
import { recipeApi, savedApi } from "../../api";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/auth-context";
import { CommentProvider } from "../../contexts/comment-context.jsx";

// Ingredients and instructions can come back as an array or as multiline text.
const toList = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value.split("\n").map(line => line.trim()).filter(Boolean);
  }

  return [];
};


export default function RecipeDetails() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const isOwner = user && user?.id === recipe?.user_id;
  const ingredients = toList(recipe?.ingredients);
  const instructions = toList(recipe?.instructions);


  useEffect(() => {
    request(`/recipes?id=eq.${recipeId}`)
      .then((result) => {
        setRecipe(result[0]);
      })
      .catch((error) => alert(error));
  }, [recipeId]);

  // Check if the logged-in user has already saved this recipe
  useEffect(() => {
    if (!user) {
      return;
    }

    savedApi.isSaved(recipeId, user.id)
      .then(setIsSaved)
      .catch(() => setIsSaved(false));
  }, [recipeId, user]);

  const saveClickHandler = async () => {
    setIsSaving(true);

    try {
      if (isSaved) {
        await savedApi.unsave(recipeId, user.id);
        setIsSaved(false);
        toast.info("Recipe removed from your saved recipes.");
      } else {
        await savedApi.save(recipeId, user.id);
        setIsSaved(true);
        toast.success("Recipe saved!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecipeClickHandler = (e) => {
    e.preventDefault();

    setShowDeleteModal(true);
  };

  const confirmDeleteHandler = async () => {
    setIsDeleting(true);

    try {
      await recipeApi.remove(recipeId);
      toast.success("Recipe deleted.");
      navigate('/recipes');
    } catch (error) {
      toast.error(error.message);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <CommentProvider>
    {showDeleteModal && (
      <ConfirmModal
        title="Delete this recipe?"
        message={`"${recipe.title}" will be deleted permanently. This can't be undone.`}
        confirmText="Yes, delete"
        isLoading={isDeleting}
        onConfirm={confirmDeleteHandler}
        onCancel={() => setShowDeleteModal(false)}
      />
    )}
    <main id="main">
      <section className="container recipe-detail">
        <Link className="back-link" to="/recipes">
          ← Back to all recipes
        </Link>
        <div className="detail-hero">
          <div>
            {recipe.category && <span className="eyebrow">{recipe.category}</span>}
            <h1>{recipe.title}</h1>
            <p className="hero-description">{recipe.description}</p>
            <div className="detail-meta">
              <span>◷ {recipe.prepTime} minutes</span>
              {/* <span>♧ Easy</span> */}
              {/* <span>★ 4.9 (28 reviews)</span> */}
            </div>
            <p>
              Shared by <strong>{recipe.author}</strong>
            </p>
            <div className="hero-actions">
              {isAuthenticated ? (
                <button
                  type="button"
                  className={isSaved ? "button button-outline" : "button button-primary"}
                  onClick={saveClickHandler}
                  disabled={isSaving}
                >
                  {isSaved ? "♥ Saved" : "♡ Save recipe"}
                </button>
              ) : (
                <Link to="/login" className="button button-primary">
                  ♡ Log in to save
                </Link>
              )}

              {isOwner && (
              <>
                <Link
                  to={`/recipes/${recipeId}/edit`}
                  className="button button-outline"
                >
                  ✏️ Edit recipe
                </Link>

                <Link to={`/recipes/${recipeId}/delete`} type="button" className="button button-outline button-danger" onClick={deleteRecipeClickHandler}>
                  🗑️ Delete recipe
                </Link>
              </>)}
            </div>
          </div>
          {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
        </div>
        <div className="detail-columns">
          <section className="detail-panel">
            <span className="eyebrow">What you'll need</span>
            <h2>Ingredients</h2>
            {ingredients.length > 0 ? (
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p>No ingredients listed.</p>
            )}
          </section>
          <section>
            <span className="eyebrow">Let's get cooking</span>
            <h2>Instructions</h2>
            {instructions.length > 0 ? (
              <ol>
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>No instructions yet.</p>
            )}
          </section>
        </div>
        <section className="comments-section">
          <span className="eyebrow">Around the table</span>
          <h2>Comments & tips</h2>
          <ListComment recipeId={recipeId} /> 
          
          {isAuthenticated ? (
            <CreateComment user={user} recipeId={recipeId} />
          ) : (
            <p className="comment-login">
              <Link className="button button-primary" to="/login">
                Log in to comment
              </Link>
            </p>
          )}
        </section>
      </section>
    </main>
    </CommentProvider>
  );
}
