import { Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/auth-context";
import { ToastContainer } from "react-toastify";

import Logout from "./components/logout/Logout";
import Login from "./components/login/Login";
import RecipeEdit from "./components/recipe-edit/RecipeEdit";
import Register from "./components/register/Register";
import RecipeCreate from "./components/recipe-create/RecipeCreate";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import RecipeDetails from "./components/recipe-details/RecipeDetails";

function App() {

  return (
    <AuthProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Catalog />} />
        <Route
          path="/recipes/:recipeId"
          element={<RecipeDetails />}
        />
        <Route path="/recipes/create" element={<RecipeCreate />} />
        <Route path="/recipes/:recipeId/edit" element={<RecipeEdit />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      <Footer />
      <ToastContainer />

    </AuthProvider>
  );
}

export default App;
