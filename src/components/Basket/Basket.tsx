import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import productList from "../../assets/data/list";
import "./basket.scss";

interface LocationState {
  selectedProducts: number[];
}

export const Basket = () => {
  const location = useLocation<LocationState>();

  const [basketItems, setBasketItems] = useState(() => {
    const localData = localStorage.getItem("selectedProducts");
    return localData
      ? productList
          .filter((product) => JSON.parse(localData).includes(product.id))
          .map((item) => ({ ...item, quantity: 1 }))
      : [];
  });

  useEffect(() => {
    if (location.state?.selectedProducts) {
      const selected = productList.filter((product) =>
        location.state.selectedProducts.includes(product.id)
      );
      setBasketItems(selected.map((item) => ({ ...item, quantity: 1 })));
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(basketItems.map((item) => item.id))
    );
  }, [basketItems]);

  const incrementQuantity = (id) => {
    setBasketItems(
      basketItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decrementQuantity = (id) => {
    setBasketItems((prevItems) => {
      const newItems = prevItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(item.quantity - 1, 0) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(newItems.map((item) => item.id))
      );
      return newItems;
    });
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = () => {
    setBasketItems([]);
    localStorage.removeItem("selectedProducts");
  };

  return (
    <div>
      <div className="basket-list">
        {basketItems.map((item) => (
          <div key={item.id} className="basket-card">
            <div className="item-name">{item.name}</div>
            <div className="quantity-controls">
              <button className="pbtn" onClick={() => incrementQuantity(item.id)}>+</button>
              <div className="quantity">{item.quantity}</div>
              <button className="rbtn" onClick={() => decrementQuantity(item.id)}>-</button>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">Total Price: ${getTotalPrice().toFixed(2)}</div>
      <Link to="/" className="back-to-products">Back to Product List</Link>
      <button onClick={placeOrder} className="place-order">Place Order</button>
    </div>
  );
};
