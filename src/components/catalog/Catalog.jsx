import { useEffect, useState } from "react";
import RecipeCard from "../recipe-card/RecipeCard";
import { toast } from "react-toastify";
import {recipeApi} from "../../api";

export default function Catalog() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       const toastId = toast.loading("Loading recipes...");

       recipeApi.getAll()
       .then((result) => {
           setRecipes(result);
           toast.dismiss(toastId);
       })
       .catch((err) => {
           setError(err.message);
           toast.update(toastId, {
               render: "Could not load recipes. Please try again later.",
               type: "error",
               isLoading: false,
               autoClose: 5000,
           });
       })
       .finally(() => setIsLoading(false));

       // Remove the loading toast if the user leaves the page before the recipes arrive
       return () => toast.dismiss(toastId);
    }, []);

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
          {/* <div className="filter-pills">
            <a className="filter-pill active" href="catalog.html">All recipes</a
            ><a className="filter-pill" href="catalog.html#quick">Quick & easy</a
            ><a className="filter-pill" href="catalog.html#vegetarian">Vegetarian</a
            ><a className="filter-pill" href="catalog.html#desserts">Desserts</a>
          </div> */}
        </div>
        {!isLoading && !error && (
          recipes.length > 0 ? (
            <div className="recipe-grid">
              {recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />)}
            </div>
          ) : (
            <p className="empty-state">No recipes yet. Be the first to share one!</p>
          )
        )}
        <div className="centered-action">
          {/* <Link className="button button-primary" to="/recipes/create"
            >Share your recipe ↗</Link
          > */}
        </div>
      </section>
  );
}