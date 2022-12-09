import React, { useEffect, useState } from "react";
import "./addMember.scss";
import nav_exchange_rate_logo from "../../../assets/public/img/nav_exchange_groceris.png";
import { Link } from "react-router-dom";
import logo_login from "../../../assets/public/img/logo_login.png";
import { Register } from "../../../api/auth";
import {
  changeStyleInputPassword,
  handleOnClickPass,
  isVietnamesePhoneNumber,
} from "../../../lib/shipFee";
import { toastifyError, toastifySuccess } from "../../../lib/toastify";

export default function AddMember() {
  const [register, setRegister] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    checkPassword: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegister({ ...register, [name]: value });
  };
  const checkValidate = (n) => {
    //create
    if (n.fullName !== "" && n.phone && n.password !== "") {
      if (isVietnamesePhoneNumber(n.phone) === false) {
        return toastifyError("Số điện thoại không đúng định dạng!");
      } else if (n.password) {
        Register(register).then(() => {
          toastifySuccess('Tạo tài khoản thành công!')
          setRegister({
            fullName: "",
            phone: "",
            password: "",
          });
        });
      } 
    } else {
      return toastifyError("Vui lòng nhập đầy đủ thông tin!");
    }
  };
  const handleRegister = (e) => {
    e.preventDefault()
    checkValidate(register);
  };

  const [type, setType] = useState("none");
  const [pass, setPass] = useState(false);

  useEffect(() => {
    changeStyleInputPassword(register.password, setType);
  }, [register.password, register.checkPassword]);

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

      <form className="login">
        <div className="container">
          <div className="form_login">
            <div className="login_form_input">
              <span className="d-flex mx-auto">
                <input
                  type="text"
                  onChange={handleInput}
                  name="fullName"
                  value={register.fullName}
                  placeholder="Họ và tên"
                />
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span className="d-flex mx-auto">
                <input
                  type="text"
                  onChange={handleInput}
                  name="phone"
                  value={register.phone}
                  placeholder="Số điện thoại"
                />
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <span className="d-flex mx-auto">
                <input
                  type={pass ? "text" : "password"}
                  onChange={handleInput}
                  name="password"
                  value={register.password}
                  placeholder="Mật khẩu..."
                />
                <i
                  onClick={(e) => handleOnClickPass(setPass, pass)}
                  class={`eye_icon fa-solid fa-eye-slash d-${type}`}
                ></i>
              </span>
              <span style={{ marginBottom: "10px" }}>
                <select
                  name="role"
                  style={{ width: "300px" }}
                  className="form-control d-flex mx-auto text-center mt-2"
                  onChange={handleInput}
                  id=""
                >
                  <option value="">Chọn vai trò</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </span>
            </div>
            <div className="login_form_btn">
              <button onClick={(e) => handleRegister(e)}>Đăng Ký</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
