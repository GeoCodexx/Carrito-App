import "./App.css";
import MainRouter from "./Routes/MainRouter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <NavBar />
      <MainRouter />
      <Sidebar />
      <Footer />
    </>
  );
}

export default App;
