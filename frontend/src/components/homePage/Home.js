import React,{useEffect, useState} from 'react';
import Navbar from './Navbar';
import './home.css';
import Body from './Body';
import jwt_decode from 'jwt-decode';

export default function Home() {
    
    const [user,setUser] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      const cuemail = window.location.pathname;
      if(token){
          const decodedtoken = jwt_decode(token);
          const user = decodedtoken.email;
          if(user && cuemail === `/:${user}`){
            setUser(true);
          }
      }
    return 
  }, []);


    
      if(user){
        return (    
        <div className='home'>
            <Navbar/>
            <Body/>
        </div>        
    )
        }
        else{
          return (
            <div style={{height: '100vh', width: '100vw',display: 'grid'}}>
              <div style={{maxWidth: '300px', alignSelf: 'center', justifySelf: 'center',textAlign: 'center'}}>
                <h1>Please <a href='/login'>Login</a></h1>
              </div>
            </div>
          )
        }
}
