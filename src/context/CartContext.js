// context for managing the cart state

import React, { createContext, useContext, useReducer } from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducers';

const Cart = createContext(); //name of the context

faker.seed(99); 
/**
 * since we know, faker generates random data every time the page gets rendered
 * to make the data static
 * using seed faker generates only one type of data
 * its not going to change everytime the data is called
 */

const CartContext = ({ children }) => {

  // getting fake data from fakerjs api
  const products = [...Array(20)].map(() => ({ //...Array(20) will create an arry with 20 undefined elements
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: `${faker.image.food()}?random=${Math.round(Math.random() * 5000)}`,
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));
  
  /**
   * State: data or properties that need to be tracking in an application, in this case containing cart and products
   * 
   * dispatch : used to update the state
   */
  const [state, dispatch] = //useReducer Hook returns the current state and a dispatch method
    useReducer( //useReducer Hook accepts two arguments
      cartReducer, //reducer function -> contains your custom state logic
      {//initial state...can be a simple value but generally will contain an object
        products: products,
        cart:[],
      }
  );

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });


  return (
    /**
     * children are all the jsx or components wrapped inside the context
     * which we can see at the starting point of our app - index.js
     * so, all children will have access to the state and dispatch function
     * */ 
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
        {children} 
    </Cart.Provider>
  )
}

export default CartContext;

export const CartState = () => {
  return useContext(Cart);
};
