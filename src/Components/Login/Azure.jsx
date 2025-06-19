import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Nav/Footer';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { poolData } from '../awsConfig';
import Navbar from '../Nav/Navbar';

const Azure = ({ setLoggedInUser }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const userPool = new CognitoUserPool(poolData);
    const userData = { Username: email, Pool: userPool };
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const userEmail = result.getIdToken().payload.email;
        setEmail(userEmail);
        setLoggedInUser(userEmail);
        localStorage.setItem('useremail', JSON.stringify(userEmail));
        window.location.href = '/azurecourses';
      },
      onFailure: (err) => setError(err.message || 'Login failed'),
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
    cognitoUser.forgotPassword({
      onSuccess: () => {
        setSuccess(true);
        setIsResetPassword(true);
        setIsForgotPassword(false);
      },
      onFailure: (err) => setError(err.message || 'Error sending code'),
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => setIsResetPassword(false),
      onFailure: (err) => setError(err.message || 'Reset failed'),
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return setError('Passwords do not match');
    const userPool = new CognitoUserPool(poolData);
    userPool.signUp(
      email,
      password,
      [
        { Name: 'email', Value: email },
        { Name: 'name', Value: name },
      ],
      null,
      (err, result) => {
        if (err) return setError(err.message);
        setSubmitted(true);
        setIsCodeSent(true);
      }
    );
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
    cognitoUser.confirmRegistration(verificationCode, true, (err) => {
      if (err) return setError(err.message);
      navigate('/loginazure');
    });
  };

  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
        style={{
          backgroundImage: `url('https://logincdn.msauth.net/shared/5/images/fluent_web_light_57fee22710b04cebe1d5.svg')`,
        }}
      >
        <div className="flex items-center justify-center pt-20">
          <form
            onSubmit={
              isForgotPassword ? handleForgotPassword :
              isResetPassword ? handleResetPassword :
              mode === 'signup' && isCodeSent ? handleVerifyCode :
              mode === 'signup' ? handleSignUp : handleLogin
            }
            className="bg-white p-8 rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.2)] w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isForgotPassword ? 'Forgot Password' : isResetPassword ? 'Reset Password' : mode === 'signup' ? 'Sign Up' : 'Login'}
            </h2>

            {submitted && <p className="text-green-600 mb-4 text-center">Signup successful! Check your email for verification code.</p>}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-600 mb-4 text-center">Success!</p>}

            {isForgotPassword || isResetPassword ? null : mode === 'signup' && !isCodeSent && (
              <>
                <h2 className="text-1xl font-bold">Username</h2>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  required
                />
              </>
            )}

            {(mode === 'login' || isForgotPassword || isResetPassword || mode === 'signup') && (
              <>
                <h2 className="text-1xl font-bold">Email</h2>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  required
                />
              </>
            )}

            {isResetPassword ? (
              <>
                <h2 className="text-1xl font-bold">Verification Code</h2>
                <input
                  type="text"
                  placeholder="Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  required
                />
                <h2 className="text-1xl font-bold">New Password</h2>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  required
                />
              </>
            ) : mode === 'signup' && isCodeSent ? (
              <>
                <h2 className="text-1xl font-bold">Verification Code</h2>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  required
                />
              </>
            ) : (
              <>
                <h2 className="text-1xl font-bold">Password</h2>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  required
                />
                {mode === 'signup' && (
                  <>
                    <h2 className="text-1xl font-bold">Confirm Password</h2>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none"
                      required
                    />
                  </>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isForgotPassword ? 'Send Code' : isResetPassword ? 'Reset Password' : mode === 'signup' && isCodeSent ? 'Verify Email' : mode === 'signup' ? 'Sign Up' : 'Login'}
            </button>

            <hr className="my-4 border-gray-300" />

            {!isForgotPassword && !isResetPassword && (
              <>
                {mode === 'login' && (
                  <p
                    onClick={() => setIsForgotPassword(true)}
                    className="mt-2 text-sm text-center text-blue-600 cursor-pointer"
                  >
                    Forgot Password?
                  </p>
                )}
                <p className="mt-2 text-sm text-center">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === 'login' ? 'signup' : 'login');
                      setError('');
                      setIsCodeSent(false);
                      setIsForgotPassword(false);
                      setIsResetPassword(false);
                    }}
                    className="text-blue-600 font-bold"
                  >
                    {mode === 'login' ? 'Sign Up' : 'Login'}
                  </button>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Azure;
