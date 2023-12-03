import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { jwtDecode } from "jwt-decode";
import './Ticket.css';
import { get } from 'mongoose';

function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [urgency, setUrgency] = useState('');

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
  
              // Check if the user is an admin
              const isAdmin = decodedToken.role === 'Admin';
  
              if (isAdmin) {
                // If the user is an admin, set all tickets
                setTickets(data.result);
              } else {
                // If the user is not an admin, filter tickets based on user ID
                const userTickets = data.result.filter(ticket => ticket.postedBy === userId);
                setTickets(userTickets);
              }
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
    const { name, value, type } = e.target;
  
    if (type === 'file') {
      // Handle file input differently, e.g., convert to Base64
      const file = e.target.files[0];
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Update the 'photo' state with Base64 representation of the file
      };
  
      reader.readAsDataURL(file);
    } else {
      // Handle other input types as usual
      switch (name) {
        case 'title':
          setTitle(value);
          break;
        case 'description':
          setDescription(value);
          break;
        case 'urgency':
          setUrgency(value);
          break;
        default:
          break;
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = getCookie('access_token'); // Retrieve the token
      //decode the token
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
  
      const response = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the retrieved token here
        },
        body: JSON.stringify({
          title,
          description,
          photo,
          urgency,
          postedBy: userId,
        }),
      });
  
      if (response.ok) {
        const newTicket = await response.json();
        console.log('New Ticket:', newTicket);
    
        setTitle('');
        setDescription('');
        setPhoto(null);
        setUrgency('');
        //refresh the page
        window.location.reload();
      } else {
        console.error('Failed to create ticket:', response.statusText);
      }
    } catch (error) {
      console.error('Error during ticket submission:', error.message);
    }
  };
  
  const handleSignOut = () => {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    history('/signin');
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
            <td><img src={ticket.photo ? `data:${ticket.photo.contentType};base64,${ticket.photo.data}` : ''} alt="Ticket Photo" /></td>
            <td>{ticket.postedBy}</td>
            <td>{ticket.status}</td>
            <td>{ticket.urgency}</td>
          </tr>
        ))}
      </tbody>
        </table>

        <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Title:
          <input type="text" name="title" value={title} onChange={handleInputChange} className="form-input" />
        </label>
        <label className="form-label">
          Description:
          <input type="text" name="description" value={description} onChange={handleInputChange} className="form-input" />
        </label>
        Photo:
        <input
          type="file"
          name="photo"
          onChange={handleInputChange}
          className="form-input"
        />
        <label className="form-label">
          Urgency:
          <div className="urgency-radio">
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="Low"
                  checked={urgency === 'Low'}
                  onChange={handleInputChange}
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="Medium"
                  checked={urgency === 'Medium'}
                  onChange={handleInputChange}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="urgency"
                  value="High"
                  checked={urgency === 'High'}
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
