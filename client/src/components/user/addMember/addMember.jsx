import React, { useState } from "react";
import "./addMember.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
import { Link } from "react-router-dom";
import logo_login from "../../../assets/public/img/logo_login.png";
import { Register } from "../../../api/auth";

export default function AddMember() {
  const [register, setRegister] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    checkPassword: "",
  });
  console.log(register);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegister({ ...register, [name]: value });
  };
  const checkValidate = (n) => {
    //create
    if (
      n.fullName !== "" &&
      n.phone &&
      n.password !== ""
    ) {
      if (n.password) {
        Register(register).then(() => {
          setRegister({
            fullName: "",
            phone: "",
            password: "",
            checkPassword: "",
          });
        });
      } else {
        return alert("check password !!!");
      }
    } else {
      return alert("please input!!");
    }
  };
  const handleRegister = () => {
    checkValidate(register);
  };
  return (
    <div className="addMember">
      <div className="nav_container">
        <div className="nav_left">
          <h4>HOTLINE</h4>
          <h2 className="text-danger">1900 6825</h2>
        </div>
        <div className="nav_search">
          <input
            type="text"
            placeholder="Hello world, Chiều nay bạn muốn tìm gì?"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="nav_exchange">
          <img src={nav_exchange_rate_logo} alt="" />
          <span>
            <p>Tỉ giá</p>
            <h2 className="text-danger">3,650đ</h2>
          </span>
        </div>
      </div>

      <div className="login">
        <div className="container">
          <div className="form_login">
            <div className="login_form_input">
              <span>
                <input
                  type="text"
                  onChange={handleInput}
                  name="fullName"
                  value={register.fullName}
                  placeholder="Họ và tên"
                />
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span>
                <input
                  type="text"
                  onChange={handleInput}
                  name="phone"
                  value={register.phone}
                  placeholder="Số điện thoại"
                />
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <span>
                <input
                  type="text"
                  onChange={handleInput}
                  name="password"
                  value={register.password}
                  placeholder="Mật khẩu..."
                />
                <i className="fa-sharp fa-solid fa-lock"></i>
              </span>
              <span style={{marginLeft: '10px', marginBottom: '10px'}}>
                  <select name="role" style={{width:'300px'}} className="form-control text-center d-flex mx-auto mt-2" onChange={handleInput} id="">
                    <option value="">Chọn vai trò</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                  </select>
              </span>
            </div>
            <div className="login_form_btn">
              <button onClick={() => handleRegister()}>Đăng Ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
