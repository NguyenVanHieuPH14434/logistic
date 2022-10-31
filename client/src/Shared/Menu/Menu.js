import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoChecklist } from "react-icons/go";
import { BiBox } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import "./Menu.scss";

function Menu() {
    const [show, setShow] = useState(true)

    const handleOnClickBtn = (e) =>{
        
    }
    return (
        <>
            <div style={{ backgroundColor: '#9470d4' }} className="menu_left">
                <i onClick={(e) => handleOnClickBtn(e)} class="fa-solid fa-bars"></i>
                <Nav className="flex-column">
                    <DropdownButton
                        key={'end'}
                        id={`dropdown-button-drop-${'end'}`}
                        drop={'end'}
                        variant="primary"
                        title={<Container className="container1"       >
                            <GoChecklist className="icon3" />
                            <p className="para">TẠO ĐƠN</p>
                        </Container>}
                    >
                        <Dropdown.Item eventKey="1" as={Link} to="/app/groceries">Tạo Đơn Hàng</Dropdown.Item>
                        <Dropdown.Item eventKey="2" as={Link} to="/app/deposit">Tạo Đơn Ký Gửi</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        key={'end'}
                        id={`dropdown-button-drop-${'end'}`}
                        drop={'end'}
                        variant="primary"
                        title={<Container className="container2">
                            <BiBox className="icon3" />
                            <p className="para">ĐƠN HÀNG</p>
                        </Container>}
                    >
                        <Dropdown.Item eventKey="1" as={Link} to="/app/listGroceries">Tất Cả Đơn Hàng</Dropdown.Item>
                        <Dropdown.Item eventKey="2" as={Link} to="/app/listDeposit">Tất Cả Đơn Ký Gửi</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        key={'end'}
                        id={`dropdown-button-drop-${'end'}`}
                        drop={'end'}
                        variant="primary"
                        title={<Container className="container1">
                            <BiUser className="icon3" />
                            <p className="para">CÁ NHÂN</p>
                        </Container>}
                    >
                        <Dropdown.Item eventKey="1" as={Link} to="/app/user">Thông Tin Cá Nhân</Dropdown.Item>
                        <Dropdown.Item eventKey="2" as={Link} to="/app/changePass">Thay Đổi Mật Khẩu</Dropdown.Item>
                    </DropdownButton>
                </Nav>
            </div>
        </>
    );
}

export default Menu;