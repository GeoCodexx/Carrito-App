import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, types } from "../contexts/CartProvider";
import { toast } from "react-toastify";

const ProductCard = ({ product, badge = false }) => {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({
      type: types.add,
      payload: product,
    });

    toast.success("Agregado correctamente al carrito", {
      position: "bottom-center",
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="card bg-base-100 hover:shadow-xl border border-[#e4e4e4] relative group select-none">
        <Link to={`/product/${product.id}`}>
          <figure>
            <div className="h-[180px] max-w-[200px] mx-auto pt-4 flex justify-center items-center">
              <img
                className="max-h-[150px] group-hover:scale-110 transition ease-in-out duration-300"
                src={product.image}
                alt="Product Image"
              />
            </div>
          </figure>
        </Link>
        <div className="card-body">
          {badge && <div className="badge badge-secondary">Nuevo</div>}
          <Link to={`/product/${product.id}`}>
            <h2
              className={`card-title text-base ${
                product.title.length <= 28 && "mb-7"
              }`}
            >
              {product.title.length >= 45
                ? `${product.title.substring(0, 45)}...`
                : product.title}
            </h2>
          </Link>
          <div className="card-actions justify-between">
            <p className="font-medium text-lg text-secondary">
              S/ {product.price.toFixed(2)}
            </p>
            {/**BUTTON BUY */}
            <button
              className="btn btn-primary relative"
              onClick={handleAddToCart}
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
