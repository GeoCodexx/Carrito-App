import { createContext, useState } from "react";

export const InvoiceContext = createContext();

const InvoiceProvider = ({ children }) => {
  
    const [data, setData] = useState(null);

  return (
    <InvoiceContext.Provider value={{ data, setData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;