import React from 'react'
import { CartState } from '../context/CartContext'
import { useTheme } from '../context/ThemeContextProvider';
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './styles.css';

const Home = () => {
  // const { state } = CartState();
  /**
   * here we are only concerned about the products, 
   * so we will destructure and only get the products from state
   */
  const { 
    state: { products }, //destructuring
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery }
  } = CartState();

  const { theme } = useTheme();

  const transformProducts = () => {
    let sortedProducts = products;

    if(sort) {
      sortedProducts = sortedProducts.sort((a, b) => (
        sort === 'lowToHigh' ? (a.price-b.price) : (b.price-a.price)
      ));
    }

    if(!byStock) {
      sortedProducts = sortedProducts.filter(prod => prod.inStock);
    }

    if(byFastDelivery) {
      sortedProducts = sortedProducts.filter(prod => prod.fastDelivery);
    }

    if(byRating) {
      sortedProducts = sortedProducts.filter(prod => prod.ratings >= byRating);
    }

    if(searchQuery) {
      sortedProducts = sortedProducts.filter(
        prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  }
  return (
    <div className='home'>
      <Filters />
      <div className={`productContainer ${theme === 'dark' && 'darkBody'}`}>
        {
          transformProducts().map((prod) => {
            return <SingleProduct key={prod.id} prod={prod} />
          })
        }
      </div>
    </div>
  )
}

export default Home;




/**
 * The destructuring assignment syntax is a JavaScript expression 
 * that makes it possible to unpack values from arrays, or properties 
 * from objects, into distinct variables.
 */