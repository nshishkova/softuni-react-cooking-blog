import { Route, Routes } from "react-router";
import { authApi } from "./components/api"
import { useState } from "react";
import { useNavigate } from "react-router";
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
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      const result = await authApi.register(userData);

      setAuth(result);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutAction = () => {
    setAuth(null);
  };

  const login = async (userData) => {
    try {
      const result = await authApi.login(userData);

      setAuth(result);

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Header isAuthenticated={!!auth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Catalog />} />
        <Route
          path="/recipes/:recipeId"
          element={<RecipeDetails user={auth?.user} />}
        />
        <Route path="/recipes/create" element={<RecipeCreate />} />
        <Route path="/recipes/:recipeId/edit" element={<RecipeEdit />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route
          path="/register"
          element={<Register onRegister={register} />} />
        <Route path="/logout" element={<Logout onLogout={logoutAction} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
