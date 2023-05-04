// conating template for a single product

import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { CartState } from '../context/CartContext';
import Rating from './Rating';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContextProvider';
import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = ({ prod }) => { //getting a product object as a prop

  //getting the cart from state, and the dispatch function
  const { state: { cart }, dispatch } = CartState();

  const { theme } = useTheme();
  
  const notifySuccess = (message) => //success notification on adding / removing product from the cart 
    toast.success(message, {
      position: "top-left",
      autoClose: 1500,
      closeOnClick: true
    });
  ;

  return (
    <>
      <div className='product'>
        <Card>
          <Card.Img variant='top' src={prod.image} alt={ prod.name } />
          <Card.Body className={`${theme === 'light' ? 'lightCard' : 'darkCard'}`}>
            <Card.Title>{prod.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span style={{fontSize: '1.2rem'}}>₹ {prod.price.split('.')[0]}</span>
              {prod.fastDelivery ? (
                <div>Fast Delivery</div>
              ) : (
                <div>4 days delivery</div>
              )}
              <Rating rating={prod.ratings} />
            </Card.Subtitle>
            {
              /**
               * The Array.some() method checks if any of the elements in an array pass a test (provided as a function).
               * here the test is p.id === prod.id
               * so basically, here cart.some() returns true if the current product is present in the cart
               */
            }
            {
              cart.some(p => p.id === prod.id) ? 

                (<Button
                    onClick={() => {
                      dispatch({ //passes type and payload
                        type: 'REMOVE_FROM_CART',
                        payload: prod //product that is currently being rendered
                      });
                      notifySuccess('Item removed successfully');
                      
                    }}
                    variant='danger'
                    style={{fontSize: '0.9rem'}}
                  >
                      Remove from cart
                  </Button>) : 

                (<Button 
                    onClick={() => {
                      dispatch({ 
                        type: 'ADD_TO_CART',
                        payload: prod //product that is currently being rendered
                      });
                      notifySuccess('Item added successfully');
                    }}
                    disabled={!prod.inStock}
                    style={{fontSize: '0.9rem'}}
                  >
                    {!prod.inStock ? 'Out of Stock' : 'Add to Cart'}
                </Button>)
            }
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default SingleProduct