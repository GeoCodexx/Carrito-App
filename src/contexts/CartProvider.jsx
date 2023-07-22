import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  //const [isAlready, setIsAlready] = useState(false);

  const addToCart = (product) => {
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
  };
  console.log(cart);
  return (
    <CartContext.Provider value={{ addToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
