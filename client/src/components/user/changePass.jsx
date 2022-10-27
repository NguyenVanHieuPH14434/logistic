import React from "react";
import "./changePass.scss";
import nav_exchange_rate_logo from "../../../src/assets/public/img/nav_exchange_groceris.png";
import { useState } from "react";

export default function ChangePass() {

    const [input, setInput] = useState({
        active_password: "",
        new_password: "",
        re_password: "",
    })

    const handleOnChangeInput = (e) => {
        const {name, value} = e.target;
        // const name = [e.target.name];
        // const value = e.target.value;
        setInput((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(input)
    }
  return (
    <div className="change_pass">
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

      <div className="container change_password_content">
        <h1>THAY ĐỔI MẬT KHẨU</h1>
        <form action="">
          <div className="form_content">
              <div className="label_column">
                <label htmlFor="">Mật khẩu hiện tại <span>*</span></label>
                <label htmlFor="">Mật khẩu mới<span>*</span></label>
                <label htmlFor="">Nhập lại mật khẩu mới<span>*</span></label>
              </div>
              <div className="input_column">
                <input type="text" name="active_password" onChange={(e) => handleOnChangeInput(e)} />
                <input type="text" name="new_password" onChange={(e) => handleOnChangeInput(e)} />
                <input type="text" name="re_password" onChange={(e) => handleOnChangeInput(e)} />
              </div>
          </div>
          <button onClick={(e) => handleOnSubmit(e)} type="submit">Lưu thay đổi</button>
        </form>
      </div>
    </div>
  );
}
