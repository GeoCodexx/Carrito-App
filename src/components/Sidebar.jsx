import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarProvider";
import { BiArrowFromLeft } from "react-icons/bi";
import { CartContext } from "../contexts/CartProvider";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { state, igv, subtotal, total } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-base-200 fixed top-0 h-screen shadow-2xl md:w-[45vw]  lg:w-[40vw] xl:max-w-[30vw] transition-all duration-500 z-50 px-4 lg:px-[20px] rounded-s-md select-none`}
    >
      <div className="flex items-center justify-between py-2">
        {/**icono */}
        <div
          onClick={handleClose}
          className="flex justify-center items-center tooltip tooltip-bottom"
          data-tip="Ocultar"
        >
          <button className="btn btn-ghost btn-circle">
            <BiArrowFromLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="text-sm md:text-base uppercase font-semibold md:mr-6">
          Carrito de Compras ({state.length} arts.)
        </div>
      </div>
      <div className="mt-2 pb-3 border-b border-base-content h-3/5 w-full overflow-y-auto">
        {state.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </div>

      <div className="totales-main w-full mt-1">
        <div className="totales text-end">
          <div className="p-1">
            subtotal: <span className="ml-3">{`S/${subtotal}`}</span>
          </div>
          <div className="p-1">
            IGV (18%): <span className="ml-4">{`S/${igv}`}</span>
          </div>
          <div className="font-bold pb-1 mt-1">
            TOTAL: <span className="ml-3">{`S/${total}`}</span>
          </div>
        </div>
        <div className="flex justify-center w-full mt-3 pb-2">
          <Link
            to="/cart"
            className="btn btn-wide btn-outline"
            onClick={handleClose}
          >
            IR AL CARRITO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
