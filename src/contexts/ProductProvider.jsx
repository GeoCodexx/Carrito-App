import { createContext, useEffect, useState } from "react";

//Context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [result, setResult] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //fetch
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const setSearchWord = async (value) => {
    if (value) {
      /*const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();*/
      const results = [...products].filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );

      results.length > 0 && setResult(results);
    }
  };

  const setFilterProducts = (cat, price, rat /*, location*/) => {
    //console.log(cat, price, rat);
    if (cat !== "selected" && price === 0 && rat === 0) {
      const response = [...products].filter((item) =>
        item.category.toLowerCase().includes(cat.toLowerCase())
      );
      //console.log(response);
      setFilteredProducts(response); //Para el caso se creo una pagina solo para filtrados. En un caso real alterar con una condiiconal ternaria para asignar a cada ruta el filtro correspondiente con useLocation() para saber la ruta actual.
    } else if (cat === "selected" && price !== 0 && rat === 0) {
      const response = [...products].filter((item) => item.price <= price);
      setFilteredProducts(response);
    } else if (cat === "selected" && price === 0 && rat !== 0) {
      const response = [...products].filter((item) => rat-1<=item.rating.rate && item.rating.rate<= rat);
      setFilteredProducts(response);
    } else if (cat !== "selected" && price !== 0 && rat === 0) {
      const response = [...products].filter(
        (item) =>
          item.cat.toLowerCase().includes(cat.toLowerCase()) &&
          item.price <= price
      );
      setFilteredProducts(response);
    } else if (cat === "selected" && price !== 0 && rat !== 0) {
      const response = [...products].filter(
        (item) => item.price <= price && rat-1<=item.rating.rate && item.rating.rate<= rat
      );
      setFilteredProducts(response);
    } else {
      const response = [...products].filter(
        (item) =>
          item.category.toLowerCase().includes(cat.toLowerCase()) &&
          item.price <= price &&
          rat-1<= item.rating.rate && item.rating.rate<= rat
      );
      setFilteredProducts(response);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setSearchWord,
        result,
        setFilterProducts,
        filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
