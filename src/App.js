import { loadStripe } from '@stripe/stripe-js';
import './App.css';
import CheckoutForm from './components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';
const stripePromise = loadStripe('pk_test_51MwPQuSBD8MtMZAoDOk33CGs935GKRdxMeR3HN4Rro4g8HIuIPOMfDRLHoEYWPFPHIpK0RfN5Gc9zbKOhqcMzMPn00z8zgZCFw');
function App() {
  return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              } />
            </Routes>
        </BrowserRouter>
        <ToastContainer />
      </>
  );
}

export default App;
