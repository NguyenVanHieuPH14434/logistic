import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TiShoppingCart } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";
import LOGO from '../../assets/public/img/logo-logistic-footer.png';

function Header() {
    return (
        <div className="Header">
            <Navbar expand="lg" className="navbar">
                <div className="logo">
                    <img src={LOGO} />
                </div>
                <Nav className="end">
                    <TiShoppingCart className="icon1" />
                    <MdEmail className="icon1" />
                    <AiOutlineBell className="icon1" />
                    <FaUserCircle className="icon2" />
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;