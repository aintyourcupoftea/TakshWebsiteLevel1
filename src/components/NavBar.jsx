import React from 'react';
import logo from '../assets/taksh logo white.svg';
import Timer from './Timer';


const NavBar = () => {
    return (
        <nav className="navbar bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src={logo} alt="Taksh-Logo" width="150" height="50" />
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
