import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [prevEmail, setPrevEmail] = useState('');
  const [prevPassword, setPrevPassword] = useState('');
  const [prevName, setPrevName] = useState('');
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [nameEditMode, setNameEditMode] = useState(false);

  const [tickets, setTickets] = useState([
    {
      ticket: '1234',
      description: 'Sample description',
      status: 'Open',
      created: '2023-11-23',
      photo: 'photo',
      postedBy: 'User123',
      urgency: 'High',
    },
    // just example
  ]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEditEmail = () => {
    setEmailEditMode(true);
    setPrevEmail(email);
  };

  const handleEditPassword = () => {
    setPasswordEditMode(true);
    setPrevPassword(password);
  };

  const handleEditName = () => {
    setNameEditMode(true);
    setPrevName(name);
  };

  const handleCancelEmail = () => {
    setEmailEditMode(false);
    setEmail(prevEmail);
  };

  const handleCancelPassword = () => {
    setPasswordEditMode(false);
    setPassword(prevPassword);
  };

  const handleCancelName = () => {
    setNameEditMode(false);
    setName(prevName);
  };

  const handleSaveEmail = () => {
    setEmailEditMode(false);
  };

  const handleSavePassword = () => {
    setPasswordEditMode(false);
  };

  const handleSaveName = () => {
    setNameEditMode(false);
  };

  return (
      <div className='ProfilePage'>
        <div>
        <header>
          <h2>Incident Management</h2>
        </header>
        <nav>
          <a href='/'>
            <img className="logo" src="/Logo/1.png" alt="Logo" />
          </a>
          <ul>
            <li><a href="/">Home Page</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/ticket">Ticket Management</a></li>
            <li><a href="/signin">Sign in</a></li>
          </ul>
        </nav>
        <center><h2>YOUR PROFILE</h2></center>
        <center><label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          readOnly={!emailEditMode}
        />
        {!emailEditMode ? (
          <button onClick={handleEditEmail}>Edit</button>
        ) : (
          <div>
            <button onClick={handleSaveEmail}>Save</button>
            <button onClick={handleCancelEmail}>Cancel</button>
          </div>
        )}</center>
      </div>
      <div>
        <center><label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          readOnly={!passwordEditMode}
        />
        {!passwordEditMode ? (
          <button onClick={handleEditPassword}>Edit</button>
        ) : (
          <div>
            <button onClick={handleSavePassword}>Save</button>
            <button onClick={handleCancelPassword}>Cancel</button>
          </div>
        )}</center>
      </div>
      <div>
        <center><label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          readOnly={!nameEditMode}
        />
        {!nameEditMode ? (
          <button onClick={handleEditName}>Edit</button>
        ) : (
          <div>
            <button onClick={handleSaveName}>Save</button>
            <button onClick={handleCancelName}>Cancel</button>
          </div>
        )}</center>
      </div>
      <center><h2>YOUR TICKETS</h2></center>
      <center><table className="ticket-table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Photo</th>
            <th>Posted By</th>
            <th>Urgency</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.ticket}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.created}</td>
              <td>{ticket.photo}</td>
              <td>{ticket.postedBy}</td>
              <td>{ticket.urgency}</td>
            </tr>
          ))}
        </tbody>
      </table></center>
    </div>
  );
}

export default Profile;
