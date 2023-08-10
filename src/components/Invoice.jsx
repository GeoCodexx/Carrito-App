import logoImage from "../assets/logo-cart-96x96.svg";

const Invoice = ({
  names,
  lastname,
  email,
  address,
  phone,
  subtotal,
  igv,
  total,
  products,
  handlePrintInvoice,
}) => {
  return (
    <>
      <div className="p-4 bg-gray-100">
        <div className="mx-auto bg-white shadow-md p-8 rounded-lg overflow-hidden">
          {/**LOGO */}
          <div className="flex justify-center items-center md:text-xl lg:text-2xl font-bold">
            Carrito App
          </div>
          <p className="text-center text-xs md:text-base bg-print">
            RUC: 12345678900
          </p>
          <p className="text-center text-xs md:text-base">
            Factura Electrónica
          </p>
          <p className="text-center text-xs md:text-base">FE-00001</p>

          {/* Información del cliente */}
          <div className="mt-1 mb-4 p-2 border-y border-black border-dashed text-xs md:text-sm">
            <p className="text-gray-700">
              NOMBRE: {`${names.toUpperCase()} ${lastname.toUpperCase()}`}
            </p>
            <p
              className="text-gray-700 md:hidden no-print print:hidden"
              style={styles}
            >
              EMAIL:
              {email.length > 15
                ? `${email.toUpperCase().substring(0, 15)}...`
                : email.toUpperCase()}
            </p>
            <p className="text-gray-700 hidden md:block">
              EMAIL: {email.toUpperCase()}
            </p>
            <p className="text-gray-700">DIRECCIÓN: {address.toUpperCase()}</p>
            <p className="text-gray-700">TELEF.: {phone.toUpperCase()}</p>
          </div>

          {/* Detalles de la factura */}
          <div className="mb-4">
            {/**TABLE DETAILS */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="bg-base-200 border-b">
                    <th>Cant.</th>
                    <th className="">Descripción</th>
                    <th className="">Importe</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    /* rows */
                    products.map((prod, i) => (
                      <tr key={i} className="text-xs md:text-sm">
                        <td>
                          {prod.amount < 10 ? `0${prod.amount}` : prod.amount}
                        </td>
                        <td className="uppercase">{prod.title}</td>
                        <td>{`S/ ${parseFloat(prod.price * prod.amount).toFixed(
                          2
                        )}`}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="totales text-end">
            <div className="border-b p-1 text-xs md:text-sm">
              Subtotal: <span className="ml-3">{`S/${subtotal}`}</span>
            </div>
            <div className="pt-1 text-xs md:text-sm">
              IGV (18%): <span className="ml-4">{`S/${igv}`}</span>
            </div>
            <div className="font-bold pb-1 text-xs md:text-base mt-1">
              TOTAL: <span className="ml-3">{`S/${total}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-1 print:hidden">
        <button
          className="btn btn-neutral"
          onClick={() => handlePrintInvoice()}
        >
          Imprimir
        </button>
        <button className="btn ml-4">Cerrar</button>
      </div>
    </>
  );
};

export default Invoice;
