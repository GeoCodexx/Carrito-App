import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdRemove, IoMdAdd } from "react-icons/io";

const CartItem = ({ item }) => {
  const { id, title, image, price, amount } = item;
  return (
    <div className="flex justify-between items-center rounded-md shadow">
      <div className="min-h-[150px] flex items-center px-1">
        {/**Image */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[60px]" src={image} alt={title} />
        </Link>
      </div>
      {/**title and remove icon*/}
      <div className="flex flex-col justify-center p-2">
        <div className="flex justify-between">
          <div className="title-cart-item">
            <Link className="text-sm uppercase font-medium">
              {title}
            </Link>
          </div>
        </div>

        {/**Qty */}

        <div className="flex justify-between items-center h-full font-medium text-sm mt-2">
          <div className="amount-item flex">
            <button className="btn btn-xs">
              <IoMdRemove />
            </button>
            <div className="h-full flex justify-center items-center px-2">
              {amount}
            </div>
            <button className="btn btn-xs">
              <IoMdAdd />
            </button>
          </div>
          <div className="costs ml-2">
            {/**total */}
            <div>{`S/ ${parseFloat(price*amount).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
      {/**remove icon */}
      <div className="text-xl cursor-pointer px-1">
        <RiDeleteBin6Line className="text-gray-500 hover:text-red-500 transition" />
      </div>
    </div>
  );
};

export default CartItem;
