import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ category, idProd }) => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    //SIMILAR PRODUCTS
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((elems) => {
        const similarProducts = elems.filter(
          (item) => item.category === category && item.id !== idProd
        );

        setSimilar(similarProducts);
      });
  }, [category]);

  return (
    <>
      <h2 className="font-semibold text-xl">Artículos Similares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-5 border shadow-md rounded-lg mt-3">
        {similar.length > 0 ? (
          similar.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <div className="border p-1 relative rounded-lg overflow-hidden group hover:shadow-lg">
                <figure>
                  <img
                    className="max-h-[200px] max-w-[200px] mx-auto group-hover:scale-110 transition duration-300 ease-in-out"
                    src={item.image}
                    alt={item.title}
                  />
                </figure>
                <p className="text-center my-2 px-2">{item.title}</p>
                <div className="absolute top-0 left-0 bg-secondary p-1 rounded-e-lg">
                  <p className="text-center text-white">
                    -{Math.round(Math.random() * 20 + 10)}%
                  </p>
                </div>
                <div className="flex justify-center">
                  <p className="text-xl font-semibold px-12 py-2 text-gray-300 bg-neutral rounded-lg">
                    S/{item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-center mt-1">
                  Vendidos: {item.rating.count}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center">
            UPS..!! NO SE ENCONTRARON RESULTADOS
          </div>
        )}
      </div>
    </>
  );
};

export default SimilarProducts;
