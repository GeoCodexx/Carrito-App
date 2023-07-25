import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/ProductProvider";

const FilteredProducts = () => {
    const {filteredProducts} = useContext(ProductContext);

  return (
    <div className="main">
      <section className="py-10">
        <div className="container p-4 mx-auto">
          {/**SECTION PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {filteredProducts.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default FilteredProducts