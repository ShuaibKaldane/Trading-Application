import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.email, // Using email as username
          password: formData.password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error, please try again');
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight heading-text">
              Welcome Back <br />
              <span className="heading-span">to your trading platform</span>
            </h1>
            <p className="mb-4 opacity-70 subheading-text">
              Log in to access your portfolio, monitor your positions, and continue your trading journey
              with our advanced trading tools and real-time market data.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-block mb-4 w-100">
                    Login
                  </button>

                  {/* Signup link */}
                  <div className="text-center">
                    <p>Don't have an account? <a href="/signup">Sign up here</a></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;