import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signin() {
  const navigateTo = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials'); 
      }

      const user = await response.json();
      console.log('User logged in:', user);
      navigateTo('/ticket');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="yourbigdiv">
      <div className="login-signup">
        <div id="background">
          <div id="center">
            <form>
              {/* Other form elements... */}
              <div className="input">
                <label className="username" id="usernametext">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input">
                <label className="password" id="">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div id="buttons">
                <input
                  className="button"
                  id="signinbutton"
                  type="button"
                  value="Sign in"
                  onClick={handleSignIn}
                />
                <a href="/signup">
                  <input className="button" id="signupbutton" type="button" value="Sign up" />
                </a>
              </div>
            </form>
            {/* SVG and other elements... */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
