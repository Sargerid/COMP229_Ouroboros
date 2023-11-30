import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'

function Home() {
    const [count, setCount] = useState(0)

    const [isAuthorized, setIsAuthorized] = useState(true)

    return (
        <div className='HomePage'>
            <header>
                <h2> Incident Management </h2>
            </header>
            <nav>
               <a href='/'><img className="logo" src="/Logo/1.png" /></a> 

                <ul>
                    <li> <a href="/">Home Page </a></li>
                    <li style={{display: isAuthorized ? "block" : "none"}}> <a href="/profile">Profile</a> </li>
                    <li  style={{display: isAuthorized ? "block" : "none"}}> <a href="/ticket">Ticket Management</a></li>
                    <li> <a href="/signin">Sign in</a></li>
                </ul>
            </nav>
            <main>
                <p><span class="Incident"> Incident Management </span>
                    Incident management for buildings refers to the systematic process and protocols in place to address and respond to various incidents or emergencies that may occur within a building or a built environment. These incidents can range from natural disasters like earthquakes, fires, floods, or severe weather events to human-made emergencies such as power outages, gas leaks, security breaches, or medical emergencies.

                    The primary objectives of incident management for buildings include:

                    Safety and Security: Ensuring the safety and security of occupants within the building during emergencies.

                    Minimizing Damage: Taking measures to minimize property damage and protect critical infrastructure.

                    Effective Response: Implementing structured plans and procedures to respond promptly and efficiently to incidents.

                    Continuity of Operations: Ensuring that essential services or operations continue or are quickly restored following an incident.
                </p>
            </main>
            <footer>
                Copyright &copy; 2023
                <a href="mailto:rcaraba@centennialcollege.ca">kjoghtap@centennialcollege.ca</a>
            </footer>
        </div>
    )
}

export default Home
