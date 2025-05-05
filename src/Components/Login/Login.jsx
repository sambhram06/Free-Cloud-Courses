import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md h-full"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <h2 className="text-1xl font-bold mb-6">Email</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                    required
                />

                <h2 className="text-1xl font-bold mb-6">Password</h2>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none transition duration-200"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition"
                >
                    Login
                </button>

                <hr className="my-4 border-gray-300" />

                <p className="mt-4 text-sm text-center">
                    Don't have an account? <Link to='/awshome' className="w-full bg-yellow-600 text-black font-bold px-3 py-2 rounded-md hover:bg-yellow-700 transition">Sign up</Link>
                </p>

            </form>
        </div>
    );
};

export default Login;
