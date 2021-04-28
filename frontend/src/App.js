import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container } from 'react-bootstrap';

// Components
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Cart from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from './actions/userActions';

function App() {

  const dispatch = useDispatch();
  const loginState = useSelector(state => state.userLogin);
  const { loggedInUser } = loginState;

  useEffect(() => {
    let timer;
    const loginTime = loggedInUser ? loggedInUser.loginTime : null ;
    if(loginTime){
      const logoutTime = loginTime + 360000;
      if(logoutTime < Date.now()){
        dispatch(logout())
      }else{
        const timeRemaining = logoutTime - Date.now();
        timer = setTimeout(() => {
          dispatch(logout());
        },timeRemaining);
      }
    }
     
    return () => {
      if(timer){
        clearTimeout(timer);
      }
    }
  },[loggedInUser])


  return (
    <Router>
      <Header/>
      <main>
        <Container className="py-3">
          <Route path="/" exact component={ HomeScreen } />
          <Route path="/product/:id" component={ ProductScreen } />
          <Route path="/login" component={ LoginScreen } />
          <Route path="/register" component={ RegisterScreen } />
          <Route path="/profile" component={ ProfileScreen } />
          <Route path="/shipping" component={ ShippingScreen } />
          <Route path="/payment" component={ PaymentScreen } />
          <Route path="/placeorder" component={ PlaceOrderScreen } />
          <Route path="/order/:id" component={ OrderScreen } />
          <Route path="/cart/:id?" component={ Cart } />
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
