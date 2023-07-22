import "./App.css";
import MainRouter from "./Routes/MainRouter";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <NavBar />
      <Filter />
      <MainRouter />
      <Sidebar />
      <Footer />
    </>
  );
}

export default App;
