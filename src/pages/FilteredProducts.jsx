import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/ProductProvider";

const FilteredProducts = () => {
  const { filteredProducts } = useContext(ProductContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className="main bg-base-300 h-full">
      <div className="pt-20">
        <h2 className="uppercase text-lg font-semibold text-center mt-4">Lista de productos filtrados</h2>
      </div>
  
      <section className="py-10">
        <div className="container p-4 mx-auto">
          {/**SECTION PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-3 px-8 sm:px-4">
            {data.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilteredProducts;
