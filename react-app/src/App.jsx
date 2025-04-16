import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginAws from './Components/Login/LoginAws';
import SignUpAws from './Components/Login/SignUpAws';
import Azurepage from './Components/Azure/Azurepage';
import Awspage from './Components/AWS/Awspage';
import Landingpage from './Components/Landingpage';

function App() {
  return (
    <Router> {/* Wrap everything in Router */}
      <Routes>
      <Route path="/" element={<Landingpage />} />
        <Route path="/aws" element={<Awspage />} />
        <Route path="/azure" element={<Azurepage />} />
        <Route path="/SignUp" element={<SignUpAws />} />
        <Route path="/Login" element={<LoginAws />} /> 
      </Routes>
    </Router>
  );
}

export default App;
