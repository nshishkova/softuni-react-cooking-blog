import { useEffect, useState } from "react";
import { Link } from "react-router";
import RecipeCard from "../recipe-card/RecipeCard";
import { recipeApi, savedApi } from "../../api";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  const [myRecipes, setMyRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayName = user?.user_metadata?.name || user?.email;

  useEffect(() => {
    if (!user) {
      return;
    }

    // Load both lists at the same time
    Promise.all([
      recipeApi.getByOwner(user.id),
      savedApi.getAll(user.id),
    ])
      .then(([own, saved]) => {
        setMyRecipes(own);
        setSavedRecipes(saved);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [user]);

  if (!user) {
    return (
      <main className="container profile-page" id="main">
        <p className="empty-state">
          Please <Link to="/login">log in</Link> to see your profile.
        </p>
      </main>
    );
  }

  return (
    <main className="container profile-page" id="main">
      <section className="profile-heading">
        <span className="eyebrow">Your kitchen</span>
        <h1>Hello, <em>{displayName}.</em></h1>
        <p className="section-subtitle">Your shared and saved recipes, all in one place.</p>
      </section>

      {isLoading && <p className="empty-state">Loading your recipes...</p>}
      {error && <p className="empty-state">Could not load your recipes: {error}</p>}

      {!isLoading && !error && (
        <>
          <section className="profile-section">
            <h2>My recipes ({myRecipes.length})</h2>
            {myRecipes.length > 0 ? (
              <div className="recipe-grid">
                {myRecipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
              </div>
            ) : (
              <p className="empty-state">
                You haven't shared any recipes yet. <Link to="/recipes/create">Share your first one ↗</Link>
              </p>
            )}
          </section>

          <section className="profile-section">
            <h2>Saved recipes ({savedRecipes.length})</h2>
            {savedRecipes.length > 0 ? (
              <div className="recipe-grid">
                {savedRecipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
              </div>
            ) : (
              <p className="empty-state">
                No saved recipes yet. <Link to="/recipes">Browse recipes</Link> and tap "♡ Save recipe".
              </p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
