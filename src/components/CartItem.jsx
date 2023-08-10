import { useContext } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext, types } from "../contexts/CartProvider";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const { id, title, image, price, amount } = item;

  const { dispatch } = useContext(CartContext);

  return (
    <div className="flex justify-between items-center rounded-md shadow-md border px-2 md:px-4 relative">
      <div className="min-h-[120px] flex items-center px-1">
        {/**Image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[60px]" src={image} alt={title} />
        </Link>
      </div>
      {/**title and remove icon*/}
      <div className="flex flex-col justify-center p-2 ml-4 md:max-w-[400px]">
        <div className="flex justify-between max-w-[120px] sm:min-w-[200px]">
          <div className="title-cart-item">
            <Link className="text-xs uppercase font-medium">
              <span className="w-full">{title}</span>
            </Link>
          </div>
        </div>

        {/**Qty */}

        <div className="flex justify-between items-center h-full font-medium text-sm mt-2 lg:max-w-[300px]">
          <div className="amount-item flex">
            {/**Decrement item amount */}
            <button
              className="btn btn-xs p-1"
              onClick={() => dispatch({ type: types.decrement, payload: id })}
            >
              <IoMdRemove />
            </button>
            <div className="h-full flex justify-center items-center px-1">
              {amount}
            </div>
            {/**Decrement item amount */}
            <button
              className="btn btn-xs p-1"
              onClick={() => dispatch({ type: types.increment, payload: id })}
            >
              <IoMdAdd />
            </button>
          </div>
          <div className="costs ml-2">
            {/**total */}
            <div>{`S/ ${parseFloat(price * amount).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
      {/**remove icon */}
      <div
        className="text-xl cursor-pointer px-1 absolute top-1 right-0"
        onClick={() => {
          dispatch({ type: types.remove, payload: id });
          toast.error("Producto removido correctamente", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
        }}
      >
        <RiDeleteBin6Line className="text-gray-500 hover:text-red-500 transition" />
      </div>
    </div>
  );
};

export default CartItem;
