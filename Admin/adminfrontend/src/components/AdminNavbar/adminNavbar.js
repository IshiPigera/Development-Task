import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import './adminNavbar.css'; 

function AdminNavbar() {
    const [click,setClick]=useState(false);
    const [button, setButton] = useState(true)

    const showButton = () =>{
        if(window.innerWidth<= 960){
            setButton(false);
        }else{
            setButton(true);
        }
    };
 
 
    return (
        <>
         <nav className="navbar">
         <div className='navbar-container'>
            
         <Link to="/home" className="navbar-logo">
               ADMIN</Link>        
              
            <ul className ={click ? 'nav-menu active' : 'nav-menu'}>
            </ul>                
             </div>           
             </nav>   
        </>
    );
}

export default AdminNavbar;