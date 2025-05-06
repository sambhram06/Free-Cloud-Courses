import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';

const CallbackHandler = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoading) return;

    if (auth.isAuthenticated) {
      const provider = localStorage.getItem('auth_provider');

      if (provider === 'aws') {
        navigate('/awshome');
      } else if (provider === 'azure') {
        navigate('/azurehome');
      } else {
        navigate('/'); 
      }
    } else if (auth.error) {
      console.error('Auth error:', auth.error);
      navigate('/error');
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.error, navigate]);

  return <div>Authenticating...</div>;
};

export default CallbackHandler;
