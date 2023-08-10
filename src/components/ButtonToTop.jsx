import { BsArrowUpShort } from "react-icons/bs";

const ButtonToTop = () => {
  //funcion para reubicar hacia arriba al usuario
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="btn btn-circle btn-neutral fixed bottom-12 right-2" onClick={scrollToTop}>
      <BsArrowUpShort className="h-8 w-8"/>
    </div>
  );
};

export default ButtonToTop;
