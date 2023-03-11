import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer />
      </>
  );
}

export default App;
