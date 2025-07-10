import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Buffer } from 'buffer';

import Landingpage from './Components/Landingpage';
import AwsIntro from './Components/AWS/AwsIntro';
import AzureCourses from './Components/Azure/AzureCourses';
import ExploreCourses from './Components/AWS/ExploreCourses';
import RolePage from './Components/Azure/RolePage';
import Azure from './Components/Login/Azure';
import AWS from './Components/Login/AWS';
import AuthCallback from './Auth/AuthCallback';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CourseProvider } from './Components/AWS/Context/AppContext';
import store from './store';

window.Buffer = Buffer;

function AppContent() {
  const { user } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (user) {
      setLoggedInUser(user);
      console.log('Logged In User:', user.email);
    }
  }, [user]);

  return (
    <Router>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/loginaws" element={<AWS setLoggedInUser={setLoggedInUser} />} />
          <Route path="/loginazure" element={<Azure setLoggedInUser={setLoggedInUser} />} />
          <Route path="/auth-callback" element={<AuthCallback setLoggedInUser={setLoggedInUser} />} />
          <Route path="/azurecourses" element={<AzureCourses />} />
          <Route path="/role/:roleName" element={<RolePage />} />
          <Route path="/aws" element={<AwsIntro loggedInUser={loggedInUser} />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
        </Routes>
      </CourseProvider>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}

export default App;
