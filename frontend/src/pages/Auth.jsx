import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrorMsg('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!email || !password) return setErrorMsg('Please enter email and password.');

        setIsLoading(true);
        try {
            // Note: Targeting the Express backend directly on port 3000
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Password: password })
            });
            const data = await response.json();
            if (data.success) {
                login(data.user);
                navigate('/shop');
            } else {
                setErrorMsg(data.error || "Invalid Credentials");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("Connection to server failed. Is the backend running on port 3000?");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!firstName || !lastName || !email || !password) return setErrorMsg("Required fields missing");

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    Password: password,
                    Email: email,
                    State: state,
                    City: city,
                    Zip: zip
                })
            });
            const data = await response.json();
            if (data.success) {
                setIsLogin(true);
                alert("Account created! Please log in.");
            } else {
                setErrorMsg(data.error || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setErrorMsg("Connection to server failed. Is the backend running on port 3000?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            
            <div className={`auth-container ${isLogin ? 'is-login' : 'is-signup'}`}>
                <div className="auth-card glass-panel">
                    
                    <div className="auth-header">
                        <Link to="/">
                            <img src="/assets/img/logo.png" className="auth-logo" alt="RARE Logo" />
                        </Link>
                        <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Join RARE'}</h2>
                        <p className="auth-subtitle">
                            {isLogin 
                                ? 'Enter your details to access your premium art collection.' 
                                : 'Create an account to discover imagination painted on canvas.'}
                        </p>
                    </div>

                    {errorMsg && <div className="auth-error-chip py-2">{errorMsg}</div>}

                    <div className="auth-body">
                        {isLogin ? (
                            <form className="auth-form fade-in" onSubmit={handleLogin}>
                                <div className="input-group">
                                    <i className="fas fa-envelope input-icon"></i>
                                    <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} required />
                                </div>
                                <div className="input-group">
                                    <i className="fas fa-lock input-icon"></i>
                                    <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
                                </div>
                                
                                <div className="auth-actions align-items-center">
                                    <a href="#" className="forgot-password">Forgot Password?</a>
                                </div>

                                <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                                    {isLoading ? <span className="spinner"></span> : 'Sign In'}
                                </button>
                            </form>
                        ) : (
                            <form className="auth-form fade-in" onSubmit={handleSignup}>
                                <div className="d-flex gap-10">
                                    <div className="input-group half-width">
                                        <i className="fas fa-user input-icon"></i>
                                        <input type="text" placeholder="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)} required />
                                    </div>
                                    <div className="input-group half-width">
                                        <i className="fas fa-user input-icon"></i>
                                        <input type="text" placeholder="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <i className="fas fa-envelope input-icon"></i>
                                    <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} required />
                                </div>
                                <div className="input-group">
                                    <i className="fas fa-lock input-icon"></i>
                                    <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
                                </div>
                                
                                <div className="d-flex gap-10">
                                    <div className="input-group third-width">
                                        <input type="text" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
                                    </div>
                                    <div className="input-group third-width">
                                        <input type="text" placeholder="State" value={state} onChange={e=>setState(e.target.value)} />
                                    </div>
                                    <div className="input-group third-width">
                                        <input type="text" placeholder="Zip" value={zip} onChange={e=>setZip(e.target.value)} />
                                    </div>
                                </div>

                                <button type="submit" className="auth-submit-btn mt-3" disabled={isLoading}>
                                    {isLoading ? <span className="spinner"></span> : 'Create Account'}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="auth-footer text-center mt-4">
                        <p className="toggle-text">
                            {isLogin ? "Don't have an account?" : "Already a member?"}
                            <button className="toggle-btn" onClick={toggleMode} type="button">
                                {isLogin ? 'Sign up now' : 'Log in here'}
                                <i className="fas fa-arrow-right ml-1"></i>
                            </button>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Auth;
