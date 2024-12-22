"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

const LoginPage = () => {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (regNo === 'VU-BCS-2409-1302' && password === 'password123') {
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container w-100">
      <div className="row">
        <div className="col-12 col-md-4 px-0">
          <div className="login-form">
            <img src="/vu-logo.png" alt="Logo" className="img-fluid logo" style={{ height: '70px', marginBottom: '30px', cursor: 'pointer' }} />
            <h1 style={{ fontWeight: 700, fontSize: '20px', marginTop: '-10px' }}>VICTORIA UNIVERSITY</h1>
            <h2 style={{ fontWeight: 500, color: 'rgba(0, 0, 0, 0.4)', marginBottom: '15px' }}>Student's Portal</h2>
            <p className="text-left w-100 mt-4">Enter your details to login</p>
            <div className="w-100">
              <input 
                type="text" 
                placeholder="Reg: VU-AAA-0000-0000" 
                className="input-field legacy-input bg-white"
                style={{ width: '265px', height: 'calc(2.55rem) !important' }}
                value={regNo} 
                onChange={(e) => setRegNo(e.target.value)}
              />
              <div className="password-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter password" 
                  className="input-field legacy-input bg-white"
                  style={{ width: '265px', height: 'calc(2.55rem) !important' }}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  className="password-toggle" 
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ position: 'relative', top: '-2px' }}></i>
                </button>
              </div>
              <div className="checkbox-container">
                <div className="remember-me">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe" style={{ 
                    fontWeight: 500, 
                    color: 'rgba(0, 0, 0, 0.65)', 
                    fontSize: '13px',
                    marginLeft: '5px'
                  }}>
                    Remember me
                  </label>
                </div>
              </div>
              <button className="sign-in-button" onClick={handleLogin}>Sign In</button>
              <div style={{ width: '265px', textAlign: 'right' }}>
                <small className="forgot-password" style={{ 
                  fontWeight: 500, 
                  color: 'rgba(0, 0, 0, 0.65)', 
                  fontSize: '13px',
                  cursor: 'pointer'
                }}>
                  Forgot password?
                </small>
              </div>
              <div className="online-payments" style={{ 
                fontWeight: 500, 
                color: 'rgba(42, 112, 181, 0.565)', 
                fontSize: '16px', 
                cursor: 'pointer',
                marginTop: '30px'
              }}>
                Online Payments
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 px-0">
          <img src="/login/login.jpg" alt="Login" className="img-fluid" style={{ height: '100vh', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;