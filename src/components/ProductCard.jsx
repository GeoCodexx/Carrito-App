import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext, types } from "../contexts/CartProvider";

const ProductCard = ({ product, badge=false }) => {
  const { dispatch } = useContext(CartContext);

  return (
    <>
      <div className="card bg-base-100 hover:shadow-xl border border-[#e4e4e4] relative group select-none">
        <Link to={`/product/${product.id}`}>
          <figure>
            <div className="w-[200px] mx-auto pt-4 flex justify-center items-center">
              <img
                className="max-h-[200px] group-hover:scale-110 transition ease-in-out duration-300"
                src={product.image}
                alt="Product Image"
              />
            </div>
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/product/${product.id}`}>
          <h2 className="card-title">
            {product.title}
            {badge && <div className="badge badge-secondary">Nuevo</div> }
          </h2>
          <p className="truncate">{product.description}</p></Link>
          <div className="card-actions justify-between">
            <p className="font-semibold text-lg text-secondary">
              S/ {product.price.toFixed(2)}
            </p>
            {/**BUTTON BUY */}
            <button
              className="btn btn-primary relative"
              onClick={() => dispatch({type: types.add, payload: product}) /*addToCart(product)*/}
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
