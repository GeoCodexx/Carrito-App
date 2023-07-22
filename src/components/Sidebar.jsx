import { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarProvider";
import { IoMdArrowForward } from "react-icons/io";
import { CartContext } from "../contexts/CartProvider";
import CartItem from "./CartItem";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart } = useContext(CartContext);
  //console.log(useContext(CartContext));

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-[69px] h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px] rounded-s-md overflow-scroll pb-16`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Bag(0)</div>
        {/**icono */}
        <div onClick={handleClose} className="flex justify-center items-center">
          <button className="btn btn-ghost">
            <IoMdArrowForward className="w-6 h-6"></IoMdArrowForward>
          </button>
        </div>
      </div>
      <div className="my-5">
        {cart.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
