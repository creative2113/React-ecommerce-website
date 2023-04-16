// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { GooglePayButton } from '@google-pay/button-react';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const processPayment = async (paymentMethodId, billingDetails) => {
//     const response = await fetch('/api/payments', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//         paymentMethodId: paymentMethodId,
//         billingDetails: billingDetails
//         })
//     });
//     return await response.json();
// };

// const GooglePay = () => {
//     const [error, setError] = useState(null);
//     const stripePromise = loadStripe('your_stripe_publishable_key');
    
//     const handleSubmit = async (event) => {
//       event.preventDefault();
      
//       const stripe = await stripePromise;

      
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: event.target.name.value,
//           email: event.target.email.value
//         }
//       });
      
//       if (error) {
//         setError(error.message);
//       } else {
//         const result = await processPayment(paymentMethod.id, paymentMethod.billing_details);
//         console.log(result);
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name
//           <input type="text" name="name" required />
//         </label>
//         <label>
//           Email
//           <input type="email" name="email" required />
//         </label>
//         <label>
//           Card details
//           <CardElement options={{}} />
//         </label>
//         <button type="submit">Pay</button>
//         {error && <div>{error}</div>}
//       </form>
//     );
// };



// export default GooglePay;

// // const App = () => {
// //   return (
// //     <StripeProvider stripe={stripePromise}>
// //       <Elements>
// //         <PaymentForm />
// //       </Elements>
// //     </StripeProvider>
// //   );
// // };
