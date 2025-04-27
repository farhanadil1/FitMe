// src/components/AuthModal.jsx
import React, { useState } from 'react';
import Login from '../pages/Login';
import Signup from '../pages/Signup';


const AuthModal = ({ showLoginInitially = true, onClose }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(showLoginInitially);

  const closeAll = () => {
    onClose(); // Close parent modal
  };

  return (
    <>
      <Login
        show={isLoginOpen}
        onClose={closeAll}
        switchToSignup={() => setIsLoginOpen(false)}
      />
      <Signup
        show={!isLoginOpen}
        onClose={closeAll}
        switchToLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
};

export default AuthModal;
