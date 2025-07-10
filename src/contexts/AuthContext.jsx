import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { poolData } from '../Components/awsConfig'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
      setIsAuthenticated(true); 
    }

    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          logout(); 
        } else {
          const userData = session.getIdToken().payload;
          setUser({
            username: userData['cognito:username'],
            email: userData.email,
          });
          setIsAuthenticated(true);
        }
      });
    }
  }, []);

  const login = (email, password) => {
    const userPool = new CognitoUserPool(poolData);
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const userData = result.getIdToken().payload;  
        setUser({
          username: userData['cognito:username'],
          email: userData.email,
        });
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify({
          username: userData['cognito:username'],
          email: userData.email,
        }));
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
      },
    });
  };

  const logout = () => {
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
    }

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
