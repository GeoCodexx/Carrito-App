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
  const [total, settotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (state.length > 0) {

      const subtotal = state.reduce((prev, cur) => prev + cur.amount * cur.price);
      console.log(JSON.stringify(subtotal));
      /*setSubtotal(
        [state].reduce(
          (prev, cur) => prev.amount * prev.price + cur.amount * cur.price
        )
      );*/
      //const subtotal = 
      //settotal(subtotal + 0.16 * subtotal);
    } else {
      setSubtotal(0);
      settotal(0);
    }
  }, [state]);

  /*const addToCart = (product) => {
    //console.log('Agregado al carrito');
    const newItem = { ...product, amount: 1 };

    //Verificar si el producto esta en el carrito
    const cartItem = cart.find((item) => item.id === product.id);
    //console.log(cartItem);

    if (cartItem) {
      const newCart = [...cart].map((item) =>
        item.id === product.id ? { ...item, amount: cartItem.amount + 1 } : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };*/
  //console.log(cart);
  return (
    <CartContext.Provider
      value={{ /*addToCart, cart*/ state, dispatch, total, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
