import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../contexts/ProductProvider";
import heroImage from "../assets/home-hero.svg"

const Home = () => {
  const { products } = useContext(ProductContext);
  //console.log(products);
  return (
    <div className="main">
      {/**HERO HOMEPAGE */}
      <header>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={heroImage}
              className="max-w-[280px] lg:max-w-xl rounded-lg shadow-2xl"
            />
            <div className="mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl font-bold">Mini E-commerce!</h1>
              <p className="py-6">
                Un proyecto elaborado con tecnologías modernas y robustas
                tales como ReactJS; para el diseño de interface y la lógica, 
                así como Tailwind CSS como framework para
                el diseño web y otras librerías de componentes.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-10">
        <div className="container p-4 mx-auto">
          {/**SECTION PRODUCTS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {products.map((item, i) => (
              <ProductCard key={i} product={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
