import React from 'react';
import Navbar from './Navbar';
import './home.css';
import Body from './Body';

export default function Home() {
    
    if(localStorage.getItem('todoauthemail')){
    return (
        <div className='home'>
            <Navbar/>
            <Body/>
        </div>
        
    )}
    else{
        return(
            <>
            please login
            </>
        )
    }
}
