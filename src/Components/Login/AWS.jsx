import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';
import { poolData } from '../awsConfig';
import Footer from '../Nav/Footer';
import Navbar from '../Nav/Navbar';
 
const AWS = ({ setLoggedInUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
 
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [submitted, setSubmitted] = useState(false);
    const [signUpVerificationCode, setSignUpVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [usernameError, setUsernameError] = useState('');
 
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
 
        const userPool = new CognitoUserPool(poolData);
        const authDetails = new AuthenticationDetails({ Username: email, Password: password });
        const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
 
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                const userEmail = result.getIdToken().payload.email;
                setEmail(userEmail);
                setLoggedInUser(userEmail);
                localStorage.setItem('useremail', JSON.stringify(userEmail));
                window.location.href = "/aws";
            },
            onFailure: (err) => setError(err.message || 'Login failed'),
        });
    };
 
    const handleForgotPassword = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
 
        const cognitoUser = new CognitoUser({ Username: email, Pool: new CognitoUserPool(poolData) });
        cognitoUser.forgotPassword({
            onSuccess: () => {
                setSuccess(true);
                setIsResetPassword(true);
                setIsForgotPassword(false);
            },
            onFailure: (err) => setError(err.message || 'Error sending password reset code'),
        });
    };
 
    const handleResetPassword = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
 
        const cognitoUser = new CognitoUser({ Username: email, Pool: new CognitoUserPool(poolData) });
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => setSuccess(true),
            onFailure: (err) => setError(err.message || 'Error resetting password'),
        });
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            const valid = /^[a-z0-9._]+$/.test(value);
            setUsernameError(valid || value.length === 0 ? '' : 'Username can only contain lowercase letters, numbers, . or _');
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (usernameError) return setError('Please enter a valid username');
        if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
 
        const userPool = new CognitoUserPool(poolData);
        userPool.signUp(
            formData.email,
            formData.password,
            [
                { Name: 'email', Value: formData.email },
                { Name: 'name', Value: formData.name },
            ],
            null,
            (err) => {
                if (err) return setError(err.message || 'Signup failed');
                setSubmitted(true);
                setIsCodeSent(true);
            }
        );
    };
 
    const handleVerificationSubmit = (e) => {
        e.preventDefault();
        const userPool = new CognitoUserPool(poolData);
        const cognitoUser = new CognitoUser({ Username: formData.email, Pool: userPool });
        cognitoUser.confirmRegistration(signUpVerificationCode, true, (err) => {
            if (err) return setError(err.message || 'Verification failed');
            navigate('/login');
        });
    };
 
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: `url('https://logincdn.msauth.net/shared/5/images/fluent_web_light_57fee22710b04cebe1d5.svg')` }}>
                <div className="flex items-center justify-center pt-20">
                    {isLogin ? (!isForgotPassword && !isResetPassword ? (
                        <form onSubmit={handleLogin} className="bg-white shadow-md p-8 rounded-lg w-full max-w-sm">
                            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                            <h2 className="text-1xl font-bold">Email Address</h2>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full mb-4 px-4 py-1 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            <h2 className="text-1xl font-bold">Password</h2>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                            <button type="submit" className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition">Login</button>
                            <p onClick={() => setIsForgotPassword(true)} className="mt-4 text-sm text-center text-blue-600 cursor-pointer">Forgot Password?</p>
                            <p className="mt-4 text-sm text-center">Don't have an account? <span onClick={() => setIsLogin(false)} className="cursor-pointer font-bold text-yellow-600">Sign Up</span></p>
                        </form>
                    ) : isForgotPassword ? (
                        <form onSubmit={handleForgotPassword} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                            <h2 className="text-1xl font-bold">Email Address</h2>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            <button type="submit" className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition">Send Code</button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                            <h2 className="text-1xl font-bold">Verification Code</h2>
                            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification code" required className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            <h2 className="text-1xl font-bold">New Password</h2>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" required className="w-full mb-4 px-4 py-2 border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            <button type="submit" className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition">Reset Password</button>
                        </form>
                    )) : (
                        <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                            <h2 className="text-1xl font-bold">Username</h2>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Username" required className="w-full mb-2 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            {usernameError && <p className="text-red-600 text-sm mb-2">{usernameError}</p>}
                            <h2 className="text-1xl font-bold">Email Address</h2>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full mb-2 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            <h2 className="text-1xl font-bold">Create Password</h2>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full mb-2 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            <h2 className="text-1xl font-bold">Confirm Password</h2>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                            {isCodeSent ? (
                                <>
                                    <h2 className="text-1xl font-bold">Email Verification Code</h2>
                                    <input type="text" value={signUpVerificationCode} onChange={(e) => setSignUpVerificationCode(e.target.value)} placeholder="Verification code" className="w-full mb-4 px-4 py-2 border-b-2 border-gray-300 focus:border-black focus:outline-none" />
                                    <button onClick={handleVerificationSubmit} className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition">Verify Email</button>
                                </>
                            ) : (
                                <button type="submit" className="w-full bg-yellow-600 text-black font-bold py-2 rounded-md hover:bg-yellow-700 transition">Sign Up</button>
                            )}
                            <p className="mt-4 text-sm text-center">Already have an account? <span onClick={() => setIsLogin(true)} className="cursor-pointer font-bold text-yellow-600">Login</span></p>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};
 
export default AWS;