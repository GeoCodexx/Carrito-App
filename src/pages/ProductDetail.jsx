import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext, types } from "../contexts/CartProvider";
import { ProductContext } from "../contexts/ProductProvider";
import SimilarProducts from "../components/SimilarProducts";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const [cant, setCant] = useState(1);
  
  //imagen principal del visor del producto
  const [imageView, setImageView] = useState('');

  const imageMainRef = useRef();

  const { id } = useParams();

  const { dispatch } = useContext(CartContext);
  //const { products } = useContext(ProductContext);

  //console.log(id);
  useEffect(() => {
    //obtener los detalles del producto y productos similares
    const getProductDetails = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const productData = await response.json();
        
        //Se crea el objeto agregando una propiedad  "dscto"
        const addingDcto = {
          ...productData,
          dscto: Math.round(Math.random() * 20 + 10),
        };

        setData(addingDcto);

      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    //Se llama a la funcion 
    getProductDetails();

    //Se volvera a montar cada vez que cambie el id
  }, [id]);

  //Gestionar las imagenes en miniatura
  const handleClickImage = (e) => { 
    //console.log(e.target.src);
    imageMainRef.current.src = e.target.src;
    //console.log(imageMainRef.current.src);
   }

  return (
    <div className="main pb-10">
      <div className="container mx-auto px-4 pt-20 mb-10">
        <div className="grid gird-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-2 shadow-md rounded-md p-4 border">
          <div className="image-section flex flex-col lg:flex-row justify-between border">
            <div className="thumbs flex flex-row lg:flex-col justify-evenly">
              {/**IMAGES ´PRODUCT */}
              <div className="p-4 w-20 hover:border hover:shadow-md rounded-md group transition ease" onClick={handleClickImage}>
                <figure>
                  <img
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                    src={data.image}
                    alt={data.title}
                  />
                </figure>
              </div>
              <div className="p-4 w-20 hover:border hover:shadow-md rounded-md group transition ease" onClick={handleClickImage}>
                <figure>
                  <img
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                    src={data.image}
                    alt={data.title}
                  />
                </figure>
              </div>
              <div className="p-4 w-20 hover:border hover:shadow-md rounded-md group transition ease" onClick={handleClickImage}>
                <figure>
                  <img
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                    src={data.image}
                    alt={data.title}
                  />
                </figure>
              </div>
              <div className="p-4 w-20 hover:border hover:shadow-md rounded-md group transition ease" onClick={handleClickImage}>
                <figure>
                  <img
                    className="group-hover:scale-110 transition duration-300 ease-in-out"
                    src={data.image}
                    alt={data.title}
                  />
                </figure>
              </div>
            </div>

            {/**MAIN IMAGE VIEW */}
            <div className="image order-first lg:order-last flex justify-center items-center py-3 rounded-md w-full sm:h-full">
              <figure>
                <img ref={imageMainRef} className="max-h-52" src={data.image} alt={data.title} />
              </figure>
            </div>
          </div>

          <div className="details border rounded-md p-4 mb-3">
            <p className="font-bold text-lg sm:text-xl uppercase mb-2 text-center sm:text-left">
              {data.title}
            </p>
            <div className="badge badge-outline mb-3 px-3 py-2">
              {data.category}
            </div>
            <p className="badge badge-secondary ml-2">
              Dscto:
              <span className="font-medium ml-1">{data.dscto}%</span>
            </p>
            <p className="text-justify mt-2">{data.description}</p>
            <div className="flex justify-between items-center">
              <p className="font-semibold mt-2 text-xl text-neutral">
                S/{data.price}
              </p>
            </div>
            <div className="footer-details flex flex-col sm:flex-row items-center">
              <div className="amount-item flex items-center sm:border my-2 sm:my-0">
                {/**Decrement item amount */}
                <button
                  className="btn btn-xs"
                  onClick={() =>
                    setCant((state) => (state > 1 ? state - 1 : 1))
                  }
                >
                  <IoMdRemove />
                </button>
                <div className="h-full flex justify-center items-center px-2">
                  {cant}
                </div>
                {/**Decrement item amount */}
                <button
                  className="btn btn-xs"
                  onClick={() => setCant(cant + 1)}
                >
                  <IoMdAdd />
                </button>
              </div>
              <div className="btn add-to-cart mt-3">
                <button
                  className="btn btn-neutral"
                  onClick={() =>
                    dispatch({
                      type: types.addDetail,
                      payload: { product: data, qty: cant },
                    })
                  }
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>

        {/**SIMILAR PRODUCTS */}
        <section className="similar-products mt-10">
          <SimilarProducts category={data.category} idProd={data.id} />
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
