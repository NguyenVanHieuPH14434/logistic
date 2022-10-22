import React, { useContext } from "react";
import "./login.scss";
import logo_login from "../../../assets/public/img/logo_login.png";
import background_login from "../../../assets/public/img/image-background-login.png";
import { useState } from "react";
import { login } from "../../../api/auth";
import {useNavigate} from 'react-router-dom';
import { AppContext } from "../../../contexts/AppContextProvider";

export default function Login() {
  const {loadUser}=useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const setHandleOnChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };  

  const handleOnClickLoginBtn = async (e) => {
    e.preventDefault();
    if(data.username === '' ||  data.password === ''){
    return alert('Vui lòng nhập đầy đủ thông tin!')
    }
      try {
        const res = await login(data);
        if(res.data.status){
          navigate('/app/deposit');
          await loadUser(res);
        }else {
           alert(res.data.message);
        }
      } catch (error) {
        console.log(error);
        
         alert(error)
      }
  };
  return (
    <>
      <div className="bg_login">
        <img src={background_login} alt="" />
      </div>
      <div className="login">
        <div className="login_img">
          <img src={logo_login} alt="" />
        </div>
        <div className="container">
          <h2>
            <span className="login_title">Đăng nhập</span>
            <span> | </span>
            <span className="register_title">
              <a href="/register">Đăng ký</a>
            </span>
          </h2>
          <div className="form_login">
            <div className="login_form_input">
              <span>
                <input
                  type="text"
                  placeholder="Số điện thoại hoặc Email"
                  name="username"
                  onChange={(e) => setHandleOnChangeInput(e)}
                />
                <i class="fa-solid fa-circle-user"></i>
              </span>
              <span>
                <input
                  type="text"
                  placeholder="Mật khẩu..."
                  name="password"
                  onChange={(e) => setHandleOnChangeInput(e)}
                />
                <i class="fa-sharp fa-solid fa-lock"></i>
              </span>
              <div className="duy_tri">
                <input type="checkbox" />
                <p>Duy trì đăng nhập</p>
              </div>
            </div>
            <div className="login_form_btn">
              <button onClick={(e) => handleOnClickLoginBtn(e)}>Đăng nhập</button>
            </div>
            <div className="facebook_login">
              <a href="/">
                <i class="fa-brands fa-facebook"></i>
                <p>Đăng nhập bằng Facebook</p>
              </a>
            </div>
            <div className="google_login">
              <a href="/">
                <i class="fa-brands fa-square-google-plus"></i>
                <p>Đăng nhập bằng Facebook</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
