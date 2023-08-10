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
    <div className="main bg-base-300 h-screen">
      <section className="py-10">
        <div className="container p-4 mx-auto">
          {/**SECTION PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
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
