import { useLocation } from "react-router-dom";
import "./App.css";
import MainRouter from "./Routes/MainRouter";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchFiltersButton from "./components/SearchFiltersButton";
import Sidebar from "./components/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation();
  const shouldHideFilter = location.pathname.startsWith("/product/") || location.pathname.startsWith("/cart");


  return (
    <>
      <div className="relative">
        <NavBar />
        {!shouldHideFilter && <SearchFiltersButton />}
        {!shouldHideFilter && <Filter />}
        <MainRouter />
        <ToastContainer />
        <Sidebar />
        <Footer />
      </div>
    </>
  );
}

export default App;
