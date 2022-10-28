import React, { useContext } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TiShoppingCart } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "./Header.scss";
import LOGO from '../../assets/public/img/logo-logistic-footer.png';
import { Dropdown } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContextProvider";
import {useNavigate} from 'react-router-dom'

function Header() {
    const {logout}= useContext(AppContext)
    const naviagte = useNavigate()
    const handleLogout = async() => {
      await logout();
      naviagte('/login')
    }
    return (
        <div className="Header">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <Navbar expand="lg" className="navbar navbar-expand-lg">
                            <div className="logo">
                                <img src={LOGO} />
                            </div>
                            <Nav className="end nav navbar-">
                                <TiShoppingCart className="icon1" />
                                <MdEmail className="icon1" />
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
                    <div className="col-md-6">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;