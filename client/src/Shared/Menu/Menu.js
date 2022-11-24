import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoChecklist } from "react-icons/go";
import { BiBox } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import "./Menu.scss";
import "../../components/Customer/Deposit/listDeposit.scss"
import { AppContext } from "../../contexts/AppContextProvider";

function Menu() {

    const [show, setShow] = useState('d-none')

    const handleOnClickBtn = (e) => {
        setShow(() => show === 'd-none' ? 'd-block' : 'd-none')
    }
    const {state:{user}} = useContext(AppContext)
    return (
        <>
            <div style={{ backgroundColor: '#9470d4' }} className="menu_left noPrint">
                <i style={{ fontSize: '40px' }} onClick={(e) => handleOnClickBtn(e)} class="fa-solid fa-bars text-white border border-info text-center mt-5 d-lg-none d-md-none d-sm-block d-block"></i>
                <Nav value={show} className={`flex-column d-lg-block d-md-block d-sm-none ${show}`}>
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
                        <Dropdown.Item eventKey="1"  as={Link} to="/app/home">Home</Dropdown.Item>
                        
                        {user.role == 'admin'|| user.role == 'manager'? (<><Dropdown.Item eventKey="3" as={Link} to="/app/addMember">Tạo tài khoản</Dropdown.Item>
                        <Dropdown.Item eventKey="2" as={Link} to="/app/changePass">Thay Đổi Mật Khẩu</Dropdown.Item></>):''}
                    </DropdownButton>
                </Nav>
            </div>
        </>
    );
}

export default Menu;