import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext'; 
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, SpecialMenu } from './container';
import { Navbar } from './components';
import { ShoppingCart } from './components'
import { AuthProvider } from './components/context/AuthContext';
import SignInModal from './components/SignIn/SignIn';
import AddressModal from './components/Address/Address';
import SignUpModal from './components/SignUp/SignUp';
import MyInfoModal from './components/MyInfo/MyInfo';
import Orders from './components/Orders/Orders';
import OrderDetail from './components/Orders/OrderDetails/OrderDerails';


import './App.css';


const App = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isMyInfoModalOpen, setIsMyInfoModalOpen] = useState(false);



  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleAddressClick = () => {
    setIsAddressModalOpen(true);
  };

  const handleSignUpClick = () => {
    setIsSignUpModalOpen(true)
    setIsSignInModalOpen(false);
  };

  const handleMyInfoClick = () => {
    setIsMyInfoModalOpen(true);
  };



  return (
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
    <div>
    <Navbar onSignInClick={handleSignInClick} onAddressClick={handleAddressClick} onMyInfoClick={handleMyInfoClick} />
    <Routes>
      <Route path='/' element={<><Header /><AboutUs /><SpecialMenu /><Chef /><Gallery /><FindUs /></>} />
      <Route path='/orders' element={<Orders/>}/>
      <Route path='/orders/:id' element={<OrderDetail/>}/>
    </Routes>
    <ShoppingCart />
    
    <Footer />
    <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} onSignUpClick={handleSignUpClick} />
    <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
    <SignUpModal isOpen={isSignUpModalOpen} onClose={() => setIsSignUpModalOpen(false)} />
    <MyInfoModal isOpen={isMyInfoModalOpen} onClose={() => setIsMyInfoModalOpen(false)} />
    </div>
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
