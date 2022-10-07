import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TiShoppingCart } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";

function Header() {
    return (
        <div className="Header">
            <Navbar bg="light" expand="lg" className="navbar">
                <Navbar.Brand className="logo">
                    <p className="text1">Hi</p>
                    <p className="text2">Express</p>
                    <p className="special">&#174;</p>
                </Navbar.Brand>
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