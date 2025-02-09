import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className='navbar navbar-expand-lg fixed-top'>
      <div className='container-fluid'>
        <a className='navbar-brand me-auto' href="#">Mi app</a>
        <div className='offcanvas offcanvas-end' tabIndex={-1} id='offcanvasNavBar' aria-labelledy="offcanvasNavbarLabel" >
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>Logo</h5>
            <button type='button' className='btn-close' data-bs-dismiss="offcanvas" aria-label='Close'></button>
          </div>
          <div className='offcanvas-body'>
            <ul className='navbar-nav justify-content-center flex-grow-1 pe-3'>
              <li className='navbar-item'>
                <a className='nav-link mx-lg-2 active' aria-current="page" href="#">Home</a>
              </li>
              <li className='navbar-item'>
                <a className='nav-link mx-lg-2 ' href="#">About</a>
              </li>
              <li className='navbar-item'>
                <a className='nav-link mx-lg-2 ' href="#">Services</a>
              </li>
              <li className='navbar-item'>
                <a className='nav-link mx-lg-2 ' href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <Link className='login-button' to="/login">Login</Link>
        <button className='navbar-toggler pe-0' type='button' data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavBar" aria-controls='offcanvasNavBar'
          arial-label="Toggle navigation">
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
    </nav>

  );
};

export default Navbar;
