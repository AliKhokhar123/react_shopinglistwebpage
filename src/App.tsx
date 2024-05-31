import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import { Basket } from "./components/Basket/Basket";

export const App = () => {
  const [selectedProductCount, setSelectedProductCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const updateSelectedProductCount = (count) => {
    setSelectedProductCount(count);
  };

  const updateSelectedProducts = (products) => {
    setSelectedProducts(products);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => (
          <ProductList
            {...props}
            updateSelectedProductCount={updateSelectedProductCount}
            updateSelectedProducts={updateSelectedProducts}
          />
        )} />
        <Route path="/basket" component={Basket} />
      </Switch>
    </Router>
  );
};
