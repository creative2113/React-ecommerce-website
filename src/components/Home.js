import React from 'react'
import { CartState } from '../context/CartContext'
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import './styles.css';

const Home = () => {
  const { 
    state: { products }, //destructuring
    productFilterState: { sort, byStock, byFastDelivery, byRating, searchQuery }
  } = CartState();

  /**
   * @returns filtered products
   */
  const transformProducts = () => {
    let sortedProducts = products;

    if(sort) { //sort the products if sort = true
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
      sortedProducts = sortedProducts.filter(prod => prod.ratings === byRating);
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
      <div className='productContainer'>
        {
          transformProducts().map((prod) => {
            return <SingleProduct key={prod.id} prod={prod} />
          })
        }
      </div>
      <Filters />
    </div>
  )
}

export default Home;




/**
 * The destructuring assignment syntax is a JavaScript expression 
 * that makes it possible to unpack values from arrays, or properties 
 * from objects, into distinct variables.
 */