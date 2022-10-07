import React from "react";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoChecklist } from "react-icons/go";
import { BiBox } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import "./Menu.scss";

function Menu() {
    return (
        <>
            <Nav className="flex-column">
                <DropdownButton
                    key={'end'}
                    id={`dropdown-button-drop-${'end'}`}
                    drop={'end'}
                    variant="primary"
                    title={<Container className="container1">
                        <GoChecklist className="icon3" />
                        <p className="para">TẠO ĐƠN</p>
                    </Container>}
                >
                    <Dropdown.Item eventKey="1">Tạo Đơn Hàng</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Tạo Đơn Ký Gửi</Dropdown.Item>
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
                    <Dropdown.Item eventKey="1">Tất Cả Đơn Hàng</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Tất Cả Đơn Ký Gửi</Dropdown.Item>
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
                    <Dropdown.Item eventKey="1">Thông Tin Cá Nhân</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Thay Đổi Mật Khẩu</Dropdown.Item>
                </DropdownButton>
            </Nav>
        </>
    );
}

export default Menu;