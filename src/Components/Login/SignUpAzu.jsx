import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarAWS from '../Nav/NavbarAWS';
import Footer from '../Nav/Footer';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { poolData } from '../awsConfig'; 
import NavbarAzu from '../Nav/NavbarAzu';


const SignUpAzu = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); 
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    const userPool = new CognitoUserPool(poolData);

    userPool.signUp(
      formData.email,
      formData.password,
      [
        {
          Name: 'email',
          Value: formData.email,
        },
        {
          Name: 'name',
          Value: formData.name,
        },
      ],
      null,
      (err, result) => {
        if (err) {
          console.error('Signup error:', err);
          setError(err.message || 'Signup failed');
          return;
        }

        console.log('User signed up:', result);
        setSubmitted(true);
        setIsCodeSent(true); 
      }
    );
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();

    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = new CognitoUser({ Username: formData.email, Pool: userPool });

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error('Verification error:', err);
        setError(err.message || 'Verification failed');
        return;
      }

      console.log('User verified:', result);
      setIsVerified(true);
      setIsCodeSent(false); 
      navigate('/loginazure'); 
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
      <div className="flex items-center justify-center pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.2)] w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          {submitted && (
            <p className="text-green-600 mb-4 text-center">
              Signup successful! Please check your email for the verification code.
            </p>
          )}
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {!isCodeSent && (
            <>
              <h2 className="text-1xl font-bold ">Username</h2>
              <input
                type="text"
                name="name"
                placeholder="Enter a Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <h2 className="text-1xl font-bold ">Email</h2>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <h2 className="text-1xl font-bold ">Password</h2>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <h2 className="text-1xl font-bold ">Confirm Password</h2>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </>
          )}

          {isCodeSent && (
            <div>
              <h2 className="text-1xl font-bold mb-1">Enter Verification Code</h2>
              <input
                type="text"
                name="verificationCode"
                placeholder="Enter the code sent to your email"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                required
              />

              <button
                type="submit"
                onClick={handleVerificationSubmit}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Verify Email
              </button>
            </div>
          )}

          <hr className="my-4 border-gray-300" />

          <p className="mt-4 text-sm text-center">
            Do you have an account?{' '}
            <Link
              to="/loginazure"
              className="w-full bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpAzu;
