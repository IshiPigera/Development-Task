import React from 'react'
import {Link} from 'react-router-dom'
// import Home from '../pages/Home';

export default function Navbar({setIsLogin}) {

    const logoutSubmit = () =>{
        localStorage.clear()
        setIsLogin(false)
    }

    return (
        <header>
            
                <h1><a href="/"> MY NOTES</a></h1>

            <ul>
                <li><a href="/create">CREATE NOTE</a></li>
                <li onClick={logoutSubmit}><Link to="/">LOGOUT</Link></li>
            </ul>
        </header>
    )
}
