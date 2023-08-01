import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import CartItem from "../components/CartItem";
import Invoice from "../components/Invoice";

const Cart = () => {
  //const [l, setl] = useState(second)
  const { state, igv, subtotal, total } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.modal_invoice.showModal();
    console.log(e.target.value);
  };

  return (
    <div className="main">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mt-16 py-4">
          {/**icono */}
          <div className="flex justify-center items-center">
            <Link to="/" className="btn btn-ghost btn-circle">
              <IoMdArrowRoundBack className="w-6 h-6" />
            </Link>
            <span className="ml-1">Seguir comprando</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-20">
          <div className="list-items px-5 h-full mt-4">
            <h2 className="text-lg font-semibold uppercase border-b-2">
              Lista de Productos
            </h2>
            <div className="flex justify-between items-center my-4">
              <div className="w-1/2 mx-auto">
                Tienes {state.length} artículos en tu carrito
              </div>
              <div className="filter-items flex flex-col md:flex-row justify-center items-center w-1/2 mx-auto">
                <p>Ordenar por:</p>{" "}
                <p className="flex items-center">
                  precio <FaAngleDown className="h-5 w-5 ml-1" />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-3 mt-2 pb-3">
              {state.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
            </div>
          </div>

          <div className="summary pb-10 pt-4 px-10 rounded-md shadow-lg border mx-auto">
            <h2 className="text-lg font-semibold uppercase border-b-2">
              Resúmen
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Nombres</span>
                </label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Apellidos</span>
                </label>
                <input
                  name="lastname"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">E-mail</span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Dirección</span>
                </label>
                <input
                  name="address"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Teléfono</span>
                </label>
                <input
                  name="phone"
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>

              <div className="totales-main w-full mt-3">
                <div className="totales text-end">
                  <div className="border-b p-1">
                    subtotal: <span className="ml-3">{`S/${subtotal}`}</span>
                  </div>
                  <div className="pt-1">
                    IGV (18%): <span className="ml-4">{`S/${igv}`}</span>
                  </div>
                  <div className="font-bold pb-1">
                    TOTAL: <span className="ml-3">{`S/${total}`}</span>
                  </div>
                </div>
                <div className="flex justify-center w-full mt-3 pb-2">
                  <input
                    type="submit"
                    className="btn btn-wide btn-neutral"
                    value="PROCESAR COMPRA"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {/**MODAL  */}
        {/* You can open the modal using ID.showModal() method */}
        {/* <button className="btn" onClick={()=>window.my_modal_3.showModal()}>open modal</button> */}
        <dialog id="modal_invoice" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <Invoice />
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Cart;
