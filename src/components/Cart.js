// Cart component containing the min cart page / checkout page

import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { CartState } from '../context/CartContext';
import Rating from './Rating';
import Form from 'react-bootstrap/Form';
import { AiFillDelete } from 'react-icons/ai';
import { useTheme } from '../context/ThemeContextProvider';

const Cart = () => {

  const { theme } = useTheme();
  const {
    state: {cart},
    dispatch,
    productState: { searchQuery }
  } = CartState();

  const [total, setTotal] = useState(); //for the subtotal

  // when cart items will get changed this will get executed, calculating the subtotal
  useEffect(() => {
    setTotal(
      cart.reduce(
        (acc, curr) => acc + Number(curr.price) * curr.qty, //function
        0 //initial val
      )
    );
  }, [cart]);

  const transformedProducts = () => {
    let products = cart;
    if(searchQuery) {
      products = products.filter(prod => prod.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return products;
  }

  return (
    <div className='home flex-column'>
      <div className={`productContainer ms-0 ${theme === 'dark' && 'darkBody'}`}>
        <ListGroup>
          {
            transformedProducts().map(prod => (
              <ListGroup.Item key={prod.id}>
                <Row>
                  <Col md={2}>
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>₹ {prod.price}</Col>
                  <Col md={2}>
                    <Rating rating={prod.ratings}></Rating>
                  </Col>
                  <Col md={2}>
                    <Form.Select 
                      value={prod.qty}
                      onChange={e => dispatch({
                        type: 'CHANGE_CART_QTY',
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })}
                    >
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x+1} value={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: prod,
                      })}
                    >
                      <AiFillDelete fontSize='20px' />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
      {/* className={`filters summary ${theme === 'light' ? 'lightFilter' : 'darkFilter'}`} */}
      <div className='checkoutCard'>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Subtotal ({cart.length}) items</Card.Title>
              <Card.Text>
                Total: ₹ {total}
              </Card.Text>
            <Button variant="primary" disabled = {cart.length === 0}>Proceed to Checkout</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default Cart

/**
 * The reduce() method executes a reducer function for array element.
 * The reduce() method returns a single value: the function's accumulated result.
 * The reduce() method does not execute the function for empty array elements.
 * The reduce() method does not change the original array.
 * Syntax - array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 */