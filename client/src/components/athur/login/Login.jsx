import React, { useContext } from "react";
import "./login.scss";
import logo_login from "../../../assets/public/img/logo_login.png";
import background_login from "../../../assets/public/img/image-background-login.png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContextProvider";
import { Navigate } from "react-router-dom";
import { toastifyError } from "../../../lib/toastify";

export default function Login() {
  const {
    state: { isAuthenticated },
  } = useContext(AppContext);
  const { loginUser } = useContext(AppContext);
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

  const location = useLocation();

  const handleOnClickLoginBtn = async (e) => {
    e.preventDefault();
    if (data.username === "" || data.password === "") {
      return toastifyError("Vui lòng nhập đầy đủ thông tin!");
    }
    try {
      const res = await loginUser(data);

      if (res.data.success) {
        navigate("/app/deposit");
      } else {
        toastifyError(res.data.message);
      }
    } catch (error) {
      toastifyError(error.message);
    }
  };
  if (isAuthenticated) return <Navigate to={"/app/deposit"} />;
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
            <span className="login_title">
              <a href="/login">Đăng nhập</a>
            </span>
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
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span>
                <input
                  type="text"
                  placeholder="Mật khẩu..."
                  name="password"
                  onChange={(e) => setHandleOnChangeInput(e)}
                />
                <i className="fa-sharp fa-solid fa-lock"></i>
              </span>
              <div className="duy_tri">
                <input type="checkbox" />
                <p>Duy trì đăng nhập</p>
              </div>
            </div>
            <div className="login_form_btn">
              <button onClick={(e) => handleOnClickLoginBtn(e)}>
                Đăng nhập
              </button>
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
