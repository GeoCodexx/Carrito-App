import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarProvider";
import { IoMdArrowForward } from "react-icons/io";
import { CartContext } from "../contexts/CartProvider";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { state, igv, subtotal, total } = useContext(CartContext);
  //console.log(useContext(CartContext));

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-500 z-20 px-4 lg:px-[35px] rounded-s-md select-none`}
    >
      <div className="flex items-center justify-between py-2 border-b">
        <div className="uppercase text-sm font-semibold">
          Carrito de Compras ({state.length} arts.)
        </div>
        {/**icono */}
        <div onClick={handleClose} className="flex justify-center items-center">
          <button className="btn btn-ghost btn-circle">
            <IoMdArrowForward className="w-6 h-6"></IoMdArrowForward>
          </button>
        </div>
      </div>
      <div className="mt-2 pb-3 border-b border-black/50 h-2/3 w-full overflow-y-auto">
        {state.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </div>

      <div className="totales-main w-full mt-1">
        <div className="totales text-end">
          <div className="border-b p-1">
            subtotal: <span className="ml-3">{`S/${subtotal}`}</span>
          </div>
          <div className="pt-1">
            IGV (18%): <span className="ml-4">{`S/${igv}`}</span>
          </div>
          <div className="font-bold pb-1 mt-1">
            TOTAL: <span className="ml-3">{`S/${total}`}</span>
          </div>
        </div>
        <div className="flex justify-center w-full mt-3 pb-2">
          <Link to="/cart" className="btn btn-wide btn-outline" onClick={handleClose}>IR AL CARRITO</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
