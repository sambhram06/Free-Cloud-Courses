import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAws from './Components/Login/LoginAws';
import SignUpAws from './Components/Login/SignUpAws';
import Landingpage from './Components/Landingpage';
import AwsIntro from './Components/AWS/AwsIntro';
import AzureCourses from './Components/Azure/AzureCourses';
import SignUpAzu from './Components/Login/SignUpAzu';
import LoginAzu from './Components/Login/LoginAzu';
import ExploreCourses from './Components/AWS/ExploreCourses';
import { useAuth } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './Components/AWS/Context/AppContext';

import { Provider } from 'react-redux';
import store from './store';

import { Buffer } from 'buffer';
import RolePage from './Components/Azure/RolePage';
window.Buffer = Buffer;

function App() {

  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("useremail")) || null)

  console.log("loggedInUSer", loggedInUser)

  return (
<Provider store={store}>
  <AuthProvider>
    <Router>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signupaws" element={<SignUpAws />} />
          <Route path="/loginaws" element={<LoginAws setLoggedInUser={setLoggedInUser} />} />
          <Route path="/signupazure" element={<SignUpAzu />} />
          <Route path="/loginazure" element={<LoginAzu setLoggedInUser={setLoggedInUser} />} />

          <Route path="/azurecourses" element={<AzureCourses />} />
          <Route path="/role/:roleName" element={<RolePage />} />

          <Route path="/aws" element={<AwsIntro loggedInUser={loggedInUser} />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
        </Routes>
      </CourseProvider>
    </Router>
  </AuthProvider>
</Provider>

  );
}

export default App;
