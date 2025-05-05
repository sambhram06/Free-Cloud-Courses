import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAzu from '../Nav/NavbarAzu';  
import Footer from '../Nav/Footer';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from '../awsConfig'; 
import { useAuth } from '../../contexts/AuthContext';

const LoginAzu = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false); 
  const [isForgotPassword, setIsForgotPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const userPool = new CognitoUserPool(poolData);
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Login success:', result);
        const userEmail = result.getIdToken().payload.email;
        console.log('User Email:', userEmail);
        setEmail(userEmail);
        setLoggedInUser(userEmail)
        localStorage.setItem('useremail', JSON.stringify(userEmail));
        window.location.href = "/azurecourses"
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        setError(err.message || 'Login failed');
      },
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        setSuccess(true);
        setIsResetPassword(true); 
        setIsForgotPassword(false); 
      },
      onFailure: (err) => {
        setError(err.message || 'Error sending password reset code');
      },
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        setSuccess(true);
        setIsResetPassword(false); 
      },
      onFailure: (err) => {
        setError(err.message || 'Error resetting password');
      },
    });
  };

  return (
    <div>
      <NavbarAzu /> 
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
        style={{
          backgroundImage: `url('https://logincdn.msauth.net/shared/5/images/fluent_web_light_57fee22710b04cebe1d5.svg')`, 
        }}
      >
        <div className="flex items-center justify-center pt-30">
          {!isForgotPassword && !isResetPassword ? (
            <form
              onSubmit={handleLogin}
              className="bg-white p-8 rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.2)] w-full max-w-sm"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

              <h2 className="text-1xl font-bold ">Email</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <h2 className="text-1xl font-bold ">Password</h2>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-2">Login successful!</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>

              <hr className="my-4 border-gray-300" />

              <p
                onClick={() => setIsForgotPassword(true)} 
                className="mt-4 text-sm text-center text-blue-600 cursor-pointer"
              >
                Forgot Password?
              </p>

              <p className="mt-4 text-sm text-center">
                Don't have an account?{' '}
                <Link
                  to="/signupazure"
                  className="bg-blue-600 text-white font-bold px-3 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Sign up
                </Link>
              </p>
            </form>
          ) : isForgotPassword ? (
            <form
              onSubmit={handleForgotPassword}
              className="bg-white p-8 rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.2)] w-full max-w-sm"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

              <h2 className="text-1xl font-bold mb-1">Enter Your Email</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-2">Verification code sent to your email!</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Send Verification Code
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleResetPassword}
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

              <h2 className="text-1xl font-bold mb-1">Verification Code</h2>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <h2 className="text-1xl font-bold mb-1">New Password</h2>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-600 text-sm mb-2">Password reset successful!</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginAzu;
