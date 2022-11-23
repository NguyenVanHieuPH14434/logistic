import React, { useContext, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TiShoppingCart } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";
import "../../components/Customer/Deposit/listDeposit.scss"
import LOGO from '../../assets/public/img/logo-logistic-footer.png';
import { Dropdown } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContextProvider";
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const { logout } = useContext(AppContext)
    const naviagte = useNavigate()
    const handleLogout = async () => {
        await logout();
        naviagte('/login')
    }
    return (
        <div className="Header noPrint">
            <Navbar expand="lg" className="navbar navbar-expand-lg">
                <div className="logo">
                    <Link as={Link} to="/">
                        <img src={LOGO} />
                    </Link>
                </div>
                <Nav className="end nav navbar-">
                    <AiOutlineBell className="icon1" />
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <FaUserCircle className="icon2" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;