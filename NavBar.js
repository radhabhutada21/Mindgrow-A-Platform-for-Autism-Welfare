import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../media/photos/navbarlogo.jpg'; // Adjust the path to your logo file


function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src={logo} alt="Logo" className="logo-img me-2" />
                    MindGrow
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link" id='patients' to="/home">Home</Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" id='patients' to="/patients">PATIENTS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" id='patients' to="/allPatients">VIEW ALL</Link>
                        </li>
                        <li className="nav-item">
                            <p className="nav-link" id='patients'>Dr. Gunjan Bhavija</p>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default NavBar;