import React from 'react'

export default function Navbar() {
    const logout = ()=> {
        localStorage.removeItem('token');
        window.location.href = 'http://localhost:3000/login';
    }
    return (
        <div className='navbar'>
            <div className='navheading'>TO-DO List</div>
            <div className='logout'><button className='logout-btn' onClick={logout}>Logout</button></div>
        </div>
    )
}
