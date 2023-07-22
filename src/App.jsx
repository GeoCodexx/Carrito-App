import "./App.css";
import MainRouter from "./Routes/MainRouter";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Filter />
      <MainRouter />
      <Footer />
    </>
  );
}

export default App;
