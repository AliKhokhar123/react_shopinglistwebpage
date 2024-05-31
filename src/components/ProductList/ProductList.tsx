// ProductList.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productList from "../../assets/data/list";
import "./product.scss";
import "./Header.scss";
import logo from '../../assets/data/logo.png';
import cart from '../../assets/data/cart.png';
import search from '../../assets/data/search.png';


const ProductList = ({ updateSelectedProductCount, updateSelectedProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProductSelection = (id) => {
    setSelectedProducts((prevSelectedProducts) => {
      const isSelected = prevSelectedProducts.includes(id);
      const newSelectedProducts = isSelected
        ? prevSelectedProducts.filter((productId) => productId !== id)
        : [...prevSelectedProducts, id];

      localStorage.setItem(
        "selectedProducts",
        JSON.stringify(newSelectedProducts)
      );

      // Update count
      updateSelectedProductCount(newSelectedProducts.length);
      updateSelectedProducts(newSelectedProducts);

      return newSelectedProducts;
    });
  };

  useEffect(() => {
    const savedSelectedProducts = localStorage.getItem("selectedProducts");
    if (savedSelectedProducts) {
      const parsedProducts = JSON.parse(savedSelectedProducts);
      setSelectedProducts(parsedProducts);
      updateSelectedProductCount(parsedProducts.length);
      updateSelectedProducts(parsedProducts);
    }
  }, []); // Empty dependency array to run the effect only once on mount

  // Calculate total price of selected products
  const totalPrice = selectedProducts.reduce((acc, productId) => {
    const product = productList.find((p) => p.id === productId);
    return product ? acc + product.price : acc;
  }, 0);

  return (
    <div>
      <nav className="header-nav">
        <div className="container">
        <div className="logo" >
          <img src={logo} alt="Logo"  id="logo"/>
        </div>
          <div className="menu-items">
           
            <ul>
          
            <li className="hide" id="h"><a href="#/">HOME</a></li>
            <li className="hide"><a href="#/">ABOUT US</a></li>
            <li className="hide"><a href="#/">OFFER</a></li>
            <li className="hide"><a href="#/">SING IN</a></li>
          
            
              <li><Link
        to="/basket">

              <div className={selectedProducts.length ? "basket-dropdown" : "basketbutton"} id="bb">
        <img src={cart} alt="Cart" className="cart" />
        {selectedProducts.length ? (
          <>
            <span className="cart-count">{selectedProducts.length}</span>
            <div className="dropdown-content">
              {/* Render selected items */}
              {selectedProducts.map(productId => {
                const product = productList.find(p => p.id === productId);
                return (
                  <div key={productId}>
                    <span style={{marginRight:'10px'}}>{product.name}</span>
                    <span> ${product.price}</span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <span className="cart-count">0</span>
        )}
        <span className="total-price">Total Price: ${totalPrice.toFixed(2)}</span>
      </div>
      </Link>
            </li>
            </ul>
          </div>
         
        </div>
      </nav>
      <div className="product-list">
        {productList.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => toggleProductSelection(product.id)}
          >
            <img src={`/images/${product.img}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            <p className={selectedProducts.includes(product.id) ? "selected" : ""}>
              Selected: {selectedProducts.includes(product.id) ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
      <Link
        to="/basket"
        className="basket-link"
      >
        Go to Basket
      </Link>
      
    </div>
  );
};

export default ProductList;
