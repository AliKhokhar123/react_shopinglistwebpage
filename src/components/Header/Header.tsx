import React, { useState, useEffect, useMemo } from "react";
import { productList } from "../../assets/data/list";
import logo from '../../assets/data/logo.png';
import cart from '../../assets/data/cart.png';
import search from '../../assets/data/search.png';
import "./Header.scss";

interface HeaderProps {
  selectedProductCount: number;
  selectedProducts: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
}

const Header: React.FC<HeaderProps> = ({ selectedProductCount, selectedProducts }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Toggle the isMenuOpen state
  };

  // Memoize the total price calculation
  const totalPriceMemo = useMemo(() => {
    return selectedProducts.reduce((acc: number, productId: string) => {
      const product = productList.find(product => product.id.toString() === productId);
      return product ? acc + product.price : acc;
    }, 0);
  }, [selectedProducts]);

  useEffect(() => {
    setTotalPrice(totalPriceMemo); // Update total price when selected products change
  }, [totalPriceMemo]);

  return (
    <nav className="header-nav">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className={`menu-items ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li><a href="#/">HOME</a></li>
            <li><a href="#/">BIKES</a></li>
            <li><a href="#/">GEAR</a></li>
            <li><a href="#/">PARTS</a></li>
            <li><a href="#/">TIRES</a></li>
            <li><a href="#/">SERVICE-INFO</a></li>
            <li><a href="#/">CATALOGUES</a></li>
            <li><a href="#/">CONTACT</a></li>
            <li style={{ marginLeft: '83px' }}>
              <img src={search} alt="s" className="cart" />
            </li>
            <li>
              <img src={cart} alt="Cart" className="cart" />
              <span className="cart-count">{selectedProductCount}</span>
              <span className="total-price">Total Price: ${totalPrice.toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <div className="toggle-menu" onClick={toggleMenu}>
          <div className={`burger ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
