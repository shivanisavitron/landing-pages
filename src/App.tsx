import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ParseItPage from "./pages/parseit/ParseItPage";
import AtithiPage from "./pages/atithi/AtithiPage";
import MoldPage from "./pages/mold/MoldPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Future products get their own folder under src/pages/<product>/, a
// matching <Route> here (e.g. src/pages/mold/MoldPage.tsx -> "/mold"), and
// an entry in the PRODUCTS list in src/pages/home/HomePage.tsx.
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parseit" element={<ParseItPage />} />
        <Route path="/atithi" element={<AtithiPage />} />
        <Route path="/mold" element={<MoldPage />} />
      </Routes>
    </>
  );
}

export default App;
