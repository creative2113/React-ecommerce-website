import React, { useRef, useState } from 'react';
import './checkoutStyles.css';
import emailjs from "emailjs-com";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTheme } from '../context/ThemeContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartState } from '../context/CartContext';
import TestCards from './TestCards';

const CheckoutForm = () => {

  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const referenceNo = Math.floor(Math.random() * 900000) + 100000;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const location = useLocation();
  const grandtotal = location.state ? location.state : 0;
  console.log('total '+grandtotal);
  const date = new Date();

  const { theme } = useTheme();

  const container = useRef();

  const navigate = useNavigate();

  const {dispatch} = CartState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (elements == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
        setError(error.message);
        setProcessing(false);
    } else {
        const { id } = paymentMethod;
        console.log(id);
        // Here, you can submit the payment method id to your server for processing the payment
        setError(null);
        setProcessing(false);
        container.current.innerHTML = `<h2>Payment succeeded</h2>`;
        dispatch({
          type: 'EMPTY_CART',
        })
        sendEmail();
    }
  };

  const sendEmail = () => {
    const emailParams = {
      to_email: email,
      name: name,
      ref_no: referenceNo,
      order_date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      total: `₹ ${grandtotal} ` 
    };
    
    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams,
        EMAILJS_PUBLIC_KEY
    ).then(
        result => {
          alert('Thanks for being a good customer! Check your email for the invoice');
          navigate('/');
        },
        error => console.log(error.text)
    );
  }

  return (
    <div className='checkoutPage' ref={container}>
      <TestCards />
      <form className='checkoutForm'>
        <div className="form-row">
            <label style={{color: theme === 'light' ? 'black':'white'}}>Name</label>
            <input className='cardInput' type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-row">
            <label htmlFor="card-element" style={{color: theme === 'light' ? 'black':'white'}}>
            Card information
            </label>
            <div id="cardElement">
                <CardElement />
            </div>
            {error && <div className="card-error" role="alert">{error}</div>}
        </div>
        <div className="form-row">
            <label style={{color: theme === 'light' ? 'black':'white'}}>Email</label>
            <input className='cardInput' type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button
            type="submit"
            disabled={processing}
            onClick={handleSubmit}
        >
            {processing ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;