import { useLocation } from "react-router-dom";
import "./App.css";
import MainRouter from "./Routes/MainRouter";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchFiltersButton from "./components/SearchFiltersButton";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeContext } from "./contexts/DarkModeProvider";
import { useContext, useEffect, useState } from "react";
import ButtonToTop from "./components/ButtonToTop";

function App() {
  const location = useLocation();
  const shouldHideFilter =
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/cart");

  const [scrollbtn, setScrollbtn] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 2000) {
        setScrollbtn(true);
      } else {
        setScrollbtn(false);
      }
    });
  }, []);

  return (
    <>
      <div
        className="relative bg-base-300 font-[Poppins]"
        data-theme={darkMode ? "dark" : "light"}
      >
         <NavBar /> 
        {!shouldHideFilter && <SearchFiltersButton />}
        {!shouldHideFilter && <Filter />}
        <MainRouter />
        <ToastContainer />
        <Sidebar />
        <Footer />
        {scrollbtn && <ButtonToTop />}
      </div>
    </>
  );
}

export default App;
