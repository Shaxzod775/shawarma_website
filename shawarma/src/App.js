import React from 'react';
import { useState } from 'react';


import { CartProvider } from './components/context/CartContext'; 
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, SpecialMenu } from './container';
import { Navbar } from './components';
import { ShoppingCart } from './components'
import SignInModal from './components/SignIn/SignIn';
import AddressModal from './components/Address/Address';
import './App.css';

const App = () => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  const handleAddressClick = () => {
    setIsAddressModalOpen(true);
  };

  return (
    <CartProvider>
      <div>
        <Navbar onSignInClick={handleSignInClick} onAddressClick={handleAddressClick} />
        <ShoppingCart />
        <Header id="Header" />
        <AboutUs id="AboutUs"/>
        <SpecialMenu id="SpecialMenu" />
        <Chef  />
        <Gallery />
        <FindUs id="FindUs"/>
        <Footer />
        <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
        <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} />
        </div>
    </CartProvider>
  );
}

export default App;
