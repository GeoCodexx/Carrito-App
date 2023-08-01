import React from 'react';

const Invoice = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-md p-8 rounded-lg">
        {/* Información del cliente */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Datos del Cliente</h2>
          <p className="text-gray-600">Nombre del cliente: Juan Pérez</p>
          <p className="text-gray-600">Email: juan@example.com</p>
          <p className="text-gray-600">Teléfono: 555-1234</p>
        </div>

        {/* Detalles de la factura */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Detalles de la Factura</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Descripción</th>
                <th className="text-left py-2">Cantidad</th>
                <th className="text-left py-2">Precio Unitario</th>
                <th className="text-left py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Camisa de algodón</td>
                <td className="py-2">2</td>
                <td className="py-2">$25.00</td>
                <td className="py-2">$50.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Pantalón de mezclilla</td>
                <td className="py-2">1</td>
                <td className="py-2">$40.00</td>
                <td className="py-2">$40.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="border-t mt-4 pt-4">
          <h2 className="text-xl font-semibold mb-2">Total</h2>
          <p className="text-xl font-semibold">$90.00</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;