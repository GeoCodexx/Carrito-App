import React from "react";

const ProductCard = ({product}) => {
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
          className="h-52 px-7 pt-7"
            src={product.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.title}
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p className="truncate">{product.description}</p>
          <div className="card-actions justify-between">
            <p className="font-semibold text-lg text-secondary">S/ {product.price}</p>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
