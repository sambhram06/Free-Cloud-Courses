import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthCallback = ({ setLoggedInUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        console.error('No auth code in URL');
        return;
      }

      try {
        const response = await fetch('https://ap-south-1iqxuzzcbn.auth.ap-south-1.amazoncognito.com/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: '6877ph5ofmlnpo8tetot0bguut',
            redirect_uri: 'https://d21a3j72wk3f7t.cloudfront.net/auth-callback',
            code,
          }),
        });

        const data = await response.json();

        if (data.id_token) {
  const decoded = jwtDecode(data.id_token);
  console.log("Decoded Google user:", decoded);

  const currentUser = {
    username: decoded.name || decoded.email.split('@')[0],
    email: decoded.email,
  };

  localStorage.setItem('user', JSON.stringify(currentUser));
  setLoggedInUser(currentUser);

  navigate('/aws');
  setTimeout(() => window.location.reload(), 0);

        } else {
          console.error('No ID token in response:', data);
          navigate('/loginaws'); 
        }
      } catch (err) {
        console.error('Google auth failed:', err);
        navigate('/loginaws');
      }
    };

    exchangeCodeForToken();
  }, [navigate, setLoggedInUser]);

  return null;
};

export default AuthCallback;
