import { Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/auth-context";
import { ToastContainer } from "react-toastify";

import About from "./components/about/About";
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
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import AuthGuard from "./components/guards/AuthGuard";
import GuestGuard from "./components/guards/GuestGuard";

function App() {

  return (
    <AuthProvider>
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Catalog />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        <Route path="/about" element={<About />} />

        {/* Private routes - logged-in users only */}
        <Route element={<AuthGuard />}>
          <Route path="/recipes/create" element={<RecipeCreate />} />
          <Route path="/recipes/:recipeId/edit" element={<RecipeEdit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Guest-only routes */}
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ToastContainer />

    </AuthProvider>
  );
}

export default App;
