import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/ProductProvider";

const NewProducts = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="main">
      <section className="py-10">
        <div className="container p-4 mx-auto">
          {/**SECTION PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {products.map((item, i) => (
              <ProductCard key={i} product={item} badge={true}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProducts;
