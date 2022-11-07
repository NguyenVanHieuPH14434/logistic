import React from "react";
import "./changePass.scss";
import nav_exchange_rate_logo from "../../../src/assets/public/img/nav_exchange_groceris.png";
import { useState } from "react";
import { ChangePassword } from "../../api/auth";
import { toastifyError, toastifySuccess } from "../../lib/toastify";

export default function ChangePass() {

    const [input, setInput] = useState({
        phone:'',
        password: "",
    })

    const handleOnChangeInput = (e) => {
        const {name, value} = e.target;
        setInput((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault()
        if(input.phone == '' || input.password == ''){
            return toastifyError('Vui lòng nhập đầy đủ thông tin!')
        }else {
        const res = await ChangePassword(input.phone, input);
        try {
           if(!res.data.success){
            return toastifyError(res.data.message)
           }
           setInput({
            phone:'',
            password: "",
        })
           toastifySuccess(res.data.message)
        } catch (error) {
          return toastifyError(error.message)
        }
      }
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
        <form action="" onSubmit={(e)=>handleOnSubmit(e)}>
          <div className="form_content">
              <div className="label_column">
                <label htmlFor="">Số điện thoại<span>*</span></label>
                <label htmlFor="">Mật khẩu mới<span>*</span></label>
              </div>
              <div className="input_column">
                <input type="text" name="phone" placeholder="Số điện thoại" value={input.phone} onChange={(e) => handleOnChangeInput(e)} />
                <input type="text" name="password" placeholder="Mật khẩu mới" value={input.password} onChange={(e) => handleOnChangeInput(e)} />
              </div>
          </div>
          <button type="submit">Lưu thay đổi</button>
          <button onClick={(e) => handleOnSubmit(e)} type="submit">Lưu thay đổi</button>
        </form>
      </div>
    </div>
  );
}