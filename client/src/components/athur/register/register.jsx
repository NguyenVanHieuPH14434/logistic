import React from "react";
import "./register.scss";
import logo_login from "../../../assets/public/img/logo_login.png";
import background_login from "../../../assets/public/img/image-background-login.png";

export default function Register() {
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
              <a href="/">Đăng ký</a>
            </span>
          </h2>
          <div className="form_login">
            <div className="login_form_input">
              <span>
                <input type="text" placeholder="Họ và tên" />
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span>
                <input type="text" placeholder="Tên đăng nhập" />
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span>
                <input type="text" placeholder="Số điện thoại" />
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <span>
                <input type="text" placeholder="Email" />
                <i className="fa-solid fa-envelope"></i>
              </span>
              <span>
                <input type="text" placeholder="Mật khẩu..." />
                <i className="fa-sharp fa-solid fa-lock"></i>
              </span>
              <span>
                <input type="text" placeholder="Nhập lại mật khẩu..." />
                <i className="fa-sharp fa-solid fa-lock"></i>
              </span>
              <div className="duy_tri">
                <input type="checkbox" />
                <p>Duy trì đăng nhập</p>
              </div>
            </div>
            <div className="login_form_btn">
              <button>Đăng nhập</button>
            </div>
            <div className="facebook_login">
              <a href="/">
                <i className="fa-brands fa-facebook"></i>
                <p>Đăng nhập bằng Facebook</p>
              </a>
            </div>
            <div className="google_login">
              <a href="/">
                <i className="fa-brands fa-square-google-plus"></i>
                <p>Đăng nhập bằng Facebook</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
