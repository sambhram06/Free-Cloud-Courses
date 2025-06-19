import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './Components/Landingpage';
import AwsIntro from './Components/AWS/AwsIntro';
import AzureCourses from './Components/Azure/AzureCourses';
import ExploreCourses from './Components/AWS/ExploreCourses';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './Components/AWS/Context/AppContext';
import { Provider } from 'react-redux';
import store from './store';

import { Buffer } from 'buffer';
import RolePage from './Components/Azure/RolePage';
import Azure from './Components/Login/Azure';
import AWS from './Components/Login/AWS';
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
          <Route path="/loginaws" element={<AWS setLoggedInUser={setLoggedInUser} />} />
          <Route path="/loginazure" element={<Azure setLoggedInUser={setLoggedInUser} />} />

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
