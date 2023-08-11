import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/ProductProvider";

const NewProducts = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="main">
      <section className="py-10">
        <div className="container p-4 mx-auto relative mt-6">
          <h2 className="mt-6 mb-8 text-center font-semibold uppercase text-lg md:text-xl">Lista de productos nuevos en oferta</h2>
          {/* *SECTION PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-3 px-6 sm:px-4">
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
