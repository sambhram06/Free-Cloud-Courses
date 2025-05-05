import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarAWS from '../Nav/NavbarAWS';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
    console.log('User Registered:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {submitted && <p className="text-green-600 mb-4 text-center">Signup successful!</p>}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <h2 className="text-1xl font-bold mb-6">Username</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter a Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
          required
        />

        <h2 className="text-1xl font-bold mb-6">Name</h2>
        <input
          type="Name"
          name="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
          required
        />

        <h2 className="text-1xl font-bold mb-6">Password</h2>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
          required
        />

        <h2 className="text-1xl font-bold mb-6">Confirm Password</h2>
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
          className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition"
        >
          Sign Up
        </button>

        <hr className="my-4 border-gray-300" />

        <p className="mt-4 text-sm text-center">
          Do you have an account? <Link to='/login' className="w-full bg-yellow-600 text-black font-bold px-4 py-2 rounded-md hover:bg-yellow-700 transition">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
