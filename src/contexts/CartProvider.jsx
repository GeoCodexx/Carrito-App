import { createContext, useEffect, useState, useReducer } from "react";

export const types = {
  add: "add",
  remove: "remove",
  increment: "increment",
  decrement: "decrement",
  subtotal: "subtotal",
  total: "total",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.add:
      //console.log('Agregado al carrito');
      const newItem = { ...action.payload, amount: 1 };
      //Verificar si el producto esta en el carrito
      const cartItem = state.find((item) => item.id === action.payload.id);
      //console.log(cartItem);
      if (cartItem) {
        const newCart = [...state].map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: cartItem.amount + 1 }
            : item
        );
        //setCart(newCart);
        return newCart;
      } else {
        return [...state, newItem];
      }

    case types.remove:
      //console.log(action.payload.id);
      const newState = state.filter((items) => items.id !== action.payload);
      //console.log(newState);
      return newState;
    case types.increment:
      return state.map((item) =>
        item.id === action.payload ? { ...item, amount: item.amount + 1 } : item
      );
    case types.decrement:
      return state
        .map((item) =>
          item.id === action.payload && item.amount > 0
            ? { ...item, amount: item.amount - 1 }
            : item
        )
        .filter((item) => item.amount > 0);
    default:
      return state;
  }
};

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  //const [cart, setCart] = useState([]);
  const [state, dispatch] = useReducer(reducer, []);
  const [igv, setIgv] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, settotal] = useState(0);

  useEffect(() => {
    if (state.length > 0) {
      //Calculate the subtotal of shopping cart items
      const subtotalCart = state.reduce((accumulator, item) => {
        return accumulator + item.amount * item.price;
      }, 0);

      //Calculate subtotal, total & IGV
      setSubtotal(subtotalCart.toFixed(2));
      setIgv((subtotalCart * 0.18).toFixed(2));
      settotal((subtotalCart + subtotalCart * 0.18).toFixed(2));
    } else {
      setSubtotal(0);
      setIgv(0);
      settotal(0);
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch, igv, total, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
