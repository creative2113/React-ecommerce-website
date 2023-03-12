import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartContext from './context/CartContext';
import ThemeContextProvider from './context/ThemeContextProvider';
import FilterBar from './context/FilterBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartContext>
      <ThemeContextProvider>
        <FilterBar >
          <App />
        </FilterBar>
      </ThemeContextProvider>
    </CartContext>
  </React.StrictMode>
);