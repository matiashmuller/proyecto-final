import React from "react";
import logo from '../assets/logo.png';
import { Facebook } from "react-bootstrap-icons";
import { Instagram } from "react-bootstrap-icons";
import { Twitter } from "react-bootstrap-icons";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
    return (
        <footer className='nav-back' data-bs-theme='dark'>
            <div className="container d-flex flex-wrap justify-content-between py-5">
                <div className="col-md-4 col-12 d-flex align-items-center  justify-content-center">
                    <HashLink to="/proyecto-final#" title="Inicio" className="text-muted text-decoration-none lh-1">
                        <img src={logo} alt="logo" style={{ height: 50 }} />
                    </HashLink>
                </div>
                <span className="col-md-4 col-12 mt-4 mt-md-1 text-light  text-center">
                    © 2023 CoditoDeals, powered by 
                    <a style={{color: '#B030B0', textDecoration: 'none'}} href="https://apidocs.cheapshark.com/"> CheapShark API</a>
                </span>
                <ul className="nav col-md-4 col-12 mt-md-0 mt-4 justify-content-center list-unstyled d-flex ">
                    <li className="ms-3">
                        <a href="https://www.facebook.com/CoditoDeals">
                            <Facebook title="Seguir en Facebook" size={30} />
                        </a>
                    </li>
                    <li className="ms-3">
                        <a href="https://www.instagram.com/CoditoDeals">
                            <Instagram title="Seguir en Instagram" size={30} />
                        </a>
                    </li>
                    <li className="ms-3">
                        <a href="https://twitter.com/CoditoDeals">
                            <Twitter title="Seguir en Twitter" size={30} />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;