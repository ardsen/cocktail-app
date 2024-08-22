import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { CocktailsProvider } from "./contexts/CocktailsContext";
import CocktailRecipe from "./components/CocktailRecipe";

function App() {
  return (
    <AuthProvider>
      <CocktailsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="app" element={<AppLayout />}>
              <Route path=":code" element={<CocktailRecipe />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CocktailsProvider>
    </AuthProvider>
  );
}

export default App;
