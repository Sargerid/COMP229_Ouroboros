import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from "jwt-decode";
import './Ticket.css';
import { get } from 'mongoose';

function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    dateCreated: '',
    dateModified: '',
    photo: '',
    postBy: '',
    Status: '',
    urgency: '',
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const history = useNavigate();
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    const checkAuthAndFetchTickets = async () => {
      try {
        const token = getCookie('access_token');
  
        if (token) {
          setIsAuthenticated(true);
  
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);
  
          if (decodedToken) {
            const userId = decodedToken._id;   
            
            getUserName(userId);

            const response = await fetch('http://localhost:3000/api/tickets', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
  
            if (response.ok) {
              const data = await response.json();
              console.log('Fetched tickets data:', data);
  
              const userTickets = data.result.filter(ticket => ticket.postedBy === userId);
  
              setTickets(userTickets);
            } else {
              console.error('Failed to fetch tickets:', response.statusText);
            }
          } else {
            console.error('Failed to decode token');
          }
        } else {
          setIsAuthenticated(false);
          history('/signin');
        }
      } catch (error) {
        console.error('Error during authentication and ticket fetch:', error.message);
      }
    };
  
    checkAuthAndFetchTickets();
  }, [history]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setFormData({
      description: '',
      dateCreated: '',
      dateModified: '',
      photo: '',
      postBy: '',
      Status: '',
      urgency: '',
    });
  };

  const handleSignOut = () => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    history('/signin');
  };

  //get the name of the user related to userId
  const getUserName = async (userId) => {
    try {
      const token = getCookie('access_token');

      if (token) {
        const decodedToken = jwtDecode(token);
        console.log('Decoded token:', decodedToken);

        if (decodedToken) {
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Fetched user data:', data);

            return data.result.name;
          } else {
            console.error('Failed to fetch user:', response.statusText);
          }
        } else {
          console.error('Failed to decode token');
        }
      } else {
        setIsAuthenticated(false);
        history('/signin');
      }
    } catch (error) {
      console.error('Error during authentication and user fetch:', error.message);
    }
  };


  return (
    <div className='TicketPage'>
      <header>
        <h2>Incident Management</h2>
      </header>
      <nav>
        <a href='/'>
          <img className="logo" src="/Logo/1.png" alt="Logo" />
        </a>
        <ul>
          <li> <a href="/">Home Page </a></li>
          <li style={{display: isAuthenticated ? "block" : "none"}}> <a href="/profile">Profile</a> </li>
          <li  style={{display: isAuthenticated ? "block" : "none"}}> <a href="/ticket">Ticket Management</a></li>
          <li style={{display: isAuthenticated ? "none" : "block"}}> <a href="/signin">Sign in</a></li>
            {isAuthenticated && (
              <button onClick={handleSignOut} className="sign-out-button">
                Sign Out
              </button>)}
        </ul>
      </nav>
      <main>
        <p><span className="Ticket">Ticket Management</span></p>
        <table className="custom-table">
          <thead>
            <tr>
              <th></th>
              <th>Number</th>
              <th>Description</th>
              <th>Date created</th>
              <th>Date Modified</th>
              <th>Photo</th>
              <th>Posted By</th>
              <th>Status</th>
              <th>Urgency</th>
            </tr>
          </thead>
          <tbody>
        {tickets.map((ticket, index) => (
          <tr key={index}>
            {/* Render ticket data in table rows */}
            <td>
              <div className="rowData">
                <button>Remove</button>
                <button>Modify</button>
              </div>
            </td>
            <td>{ticket._id}</td>
            <td>{ticket.description}</td>
            <td>{ticket.created}</td>
            <td>{ticket.dateModified}</td>
            <td><img src={`data:${ticket.photo.contentType};base64,${ticket.photo.data}`} alt="Ticket Photo" /></td>
            <td>{ticket.postedBy}</td>
            <td>{ticket.status}</td>
            <td>{ticket.urgency}</td>
          </tr>
        ))}
      </tbody>
        </table>

        <form onSubmit={handleSubmit} className="form-container">
          <label className="form-label">
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="form-label">
            Date Created:
            <input type="date" name="dateCreated" value={formData.dateCreated} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="form-label">
            Date Modified:
            <input type="date" name="dateModified" value={formData.dateModified} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="form-label">
            Photo:
            <input type="text" name="photo" value={formData.photo} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="form-label">
            Posted By:
            <input type="text" name="postBy" value={formData.postBy} onChange={handleInputChange} className="form-input" />
          </label>
          <label className="form-label">
            Status:
            <div className="Status-radio">
              <label>
                <input
                  type="radio"
                  name="Status"
                  value="Open"
                  checked={formData.Status === 'Open'}
                  onChange={handleInputChange}
                />
                Open
              </label>
              <label>
                <input
                  type="radio"
                  name="Status"
                  value="InProgress"
                  checked={formData.Status === 'InProgress'}
                  onChange={handleInputChange}
                />
                InProgress
              </label>
              <label>
                <input
                  type="radio"
                  name="Status"
                  value="Closed"
                  checked={formData.Status === 'Closed'}
                  onChange={handleInputChange}
                />
                Closed
              </label>
            </div>
          </label>
          <label className="form-label">
            Urgency:
            <div className="urgency-radio">
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="Low"
                  checked={formData.urgency === 'Low'}
                  onChange={handleInputChange}
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="Medium"
                  checked={formData.urgency === 'Medium'}
                  onChange={handleInputChange}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="High"
                  checked={formData.urgency === 'High'}
                  onChange={handleInputChange}
                />
                High
              </label>
            </div>
          </label>
          <button type="submit" className="form-button">Submit</button>
        </form>
      </main>
      <footer>
        Copyright &copy; 2023
        <a href="mailto:rcaraba@centennialcollege.ca">kjoghtap@centennialcollege.ca</a>
      </footer>
    </div>
  );
}

export default Ticket;
