import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import RecipeDetails from "./components/recipe-details/RecipeDetails"

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Catalog />} />
      <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
