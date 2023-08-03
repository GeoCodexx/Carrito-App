import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../contexts/CartProvider";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import CartItem from "../components/CartItem";
import Invoice from "../components/Invoice";
import { InvoiceContext } from "../contexts/InvoiceProvider";

const Cart = () => {
  const dialogRef = useRef();
  const { state, igv, subtotal, total } = useContext(CartContext);
  //const { data, setData } = useContext(InvoiceContext);
  const stylesHidden = {
    '@media print': {
      display: 'none !important',
      '#buton-close-modal': { display: 'none !important' },
    },
  };

  const [sortBy, setSortBy] = useState("");

  const [names, setNames] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  //Función para abrir el modal que contiene la factura de la compra
  const handleSubmit = (e) => {
    e.preventDefault();
    window.modal_invoice.showModal();
    //funcion para enviar los datos al componente invoice que mostrara en un dialog la factura
    //setData(formData);
  };

  //function para imprimir modal dialog
  const handlePrintInvoice = () => {
    // Copia solo el contenido del diálogo a una ventana de impresión
    const invoiceContent = dialogRef.current.innerHTML;
    //console.log(invoiceContent);
    const printWindow = window.open("", "_blank");
     
    // Agrega un enlace al archivo de estilos de Tailwind CSS ya procesado
    printWindow.document.write('<html><head><title>Factura</title>');
    
    printWindow.document.write('<link rel="stylesheet" href="./src/index.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(invoiceContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    //console.log(printWindow);
    printWindow.print();
    printWindow.close();
  };

  // Función para ordenar los elementos por la propiedad "precio"
  const sortByPrice = (a, b) => {
    return a.price - b.price;
  };

  // Función para ordenar los elementos por la propiedad "nombre"
  const sortByTitle = (a, b) => {
    return a.title.localeCompare(b.title);
  };

  // Función para cambiar el tipo de ordenamiento
  const handleSortByClick = (event) => {
    const elem = document.activeElement; //Detecta el elemento enfocado actualmente en el documento.

    setSortBy(event.target.textContent);
    elem?.blur(); //Cierra el dropdown al hacer click, pierde el foco.
  };

  // Obtener el arreglo ordenado según el tipo de ordenamiento seleccionado
  let sortedData;

  if (sortBy === "Precio") {
    sortedData = state.sort(sortByPrice);
  } else if (sortBy === "Nombre") {
    sortedData = state.sort(sortByTitle);
  } else {
    sortedData = state;
  }

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
              <div className="w-1/2 mx-auto text-sm md:text-base">
                Tienes {state.length} artículos en tu carrito
              </div>
              <div className="filter-items flex justify-center items-center w-1/2 mx-auto">
                <p className="mr-1 text-sm md:text-base">Ordenar por</p>
                {/* <p className="flex items-center">
                  precio <FaAngleDown className="h-5 w-5 ml-1" />
                </p> */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle btn-sm"
                  >
                    <FaAngleDown />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a
                        className="text-xs md:text-base"
                        onClick={handleSortByClick}
                      >
                        Precio
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-xs md:text-base"
                        onClick={handleSortByClick}
                      >
                        Nombre
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-3 mt-2 pb-3">
              {sortedData.map((item, i) => (
                <CartItem item={item} key={i} />
              ))}
            </div>
          </div>

          <div className="summary pb-10 pt-4 px-10 rounded-md shadow-lg border md:mx-auto">
            <h2 className="text-lg font-semibold uppercase border-b-2">
              Resúmen
            </h2>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Nombres</span>
                </label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered max-w-xs input-sm"
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
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
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
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
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  className="input input-bordered w-full max-w-xs input-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="totales-main w-full mt-3">
                <div className="totales text-end print:text-end">
                  <div className="border-b p-1">
                    subtotal: <span className="ml-3">{`S/${subtotal}`}</span>
                  </div>
                  <div className="pt-1">
                    IGV (18%): <span className="ml-4">{`S/${igv}`}</span>
                  </div>
                  <div className="font-bold pb-1 mt-1">
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
        <div ref={dialogRef}>
          <dialog id="modal_invoice" className="modal">
            <form method="dialog" className="modal-box">
              <button id="buton-close-modal" className="btn btn-sm btn-circle btn-ghost absolute right-0 top-1 no-print print:hidden" style={stylesHidden}>
                ✕
              </button>
              <Invoice
                names={names}
                lastname={lastname}
                email={email}
                address={address}
                phone={phone}
                subtotal={subtotal}
                igv={igv}
                total={total}
                products={state}
                handlePrintInvoice={handlePrintInvoice}
              />
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Cart;
