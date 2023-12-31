import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';//different css
//import './Signup.css'; // Link to your CSS file

function Signup() {

  const navigateTo = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://incident-management-system-798a715d0c26.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ name: username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials'); 
      }

      const user = await response.json();
      console.log('User created:', user);
      navigateTo('/signin');
    } catch (error) {
      console.error('Sign up failed:', error.message);
    }
  }
  return (
    <div className="yourbigdiv">
    <div class="login-signup">
   <div id="background">
  
   <div id="center">
  <form>
  <a id="logo" href='/'><img className="logo" src="/Logo/1.png" width="150" height="150"/></a> 
    <h3 id="logintext">Sign up</h3>
      <div class="input">
    <label className="username" id="usernametext">Name:</label>
  
    <input type="text" id="username"  name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
  
  
  
      <div class="input">
    <label className="password" id="">Password:</label>
    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/> 
    </div>
  
    <div class="input">
    <label className="email" id="emailtext">Email:</label>
    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
    </div>
  <div id="buttons">
  
  
    
    <input class="button" id="signupbutton" type="button" value="Sign up" onClick={handleSignUp}/>
    </div>
  
  
  
  
    </form>
  
   <svg xmlns="http://www.w3.org/2000/svg" width="600" height="500" viewBox="0 0 713 892" fill="none">
    <g filter="url(#filter0_i_2_34)">
      <path d="M0 137.124L348.995 0L713 137.124V743.102L348.995 892L0 743.102V137.124Z" fill="#DBE8CF"/>
    </g>
    <defs>
      <filter id="filter0_i_2_34" x="0" y="0" width="713" height="896" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_34"/>
      </filter>
    </defs>
  </svg>
  </div>
   </div>
   </div>
   </div>
  );
}


export default Signup
