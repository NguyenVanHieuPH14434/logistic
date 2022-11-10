import React, { useContext } from "react";
import "./login.scss";
import logo_login from "../../../assets/public/img/logo_login.png";
import background_login from "../../../assets/public/img/image-background-login.png";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContextProvider";
import { Navigate } from "react-router-dom";
import { toastifyError } from "../../../lib/toastify";
import { changeStyleInputPassword, handleOnClickPass } from "../../../lib/shipFee";

export default function Login() {
  const {
    state: { isAuthenticated, user },
    logout,
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

  const [type, setType] = useState('none')
  const [pass, setPass] = useState(false)

  useEffect(() =>{
    changeStyleInputPassword(data.password, setType)
  }, [data.password])

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
        // setInterval(() => {
        //   console.log('logout1')
        //   logout()
        // }, 10000);
      } else {
        toastifyError(res.data.message);
      }
    } catch (error) {
      toastifyError(error.message);
    }
  };
  
  if (isAuthenticated) return <Navigate to={"/app/home"} />;
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
              <Link as={Link} to="/login">
                Đăng nhập
              </Link>
            </span>
            <span> | </span>
            <span className="register_title">
              <Link as={Link} to="/register">
                Đăng ký
              </Link>
            </span>
          </h2>
          <form className="form_login">
            <div className="login_form_input">
              <span className="d-flex mx-auto">
                <input
                  type="text"
                  placeholder="Số điện thoại hoặc Email"
                  name="username"
                  onChange={(e) => setHandleOnChangeInput(e)}
                />
                <i className="icon_user fa-solid fa-circle-user"></i>
              </span>
              <span className="d-flex mx-auto">
             
                <input
                  className="password_input"
                  type={pass?'text' : 'password'}
                  placeholder="Mật khẩu..."
                  name="password"
                  onChange={(e) => setHandleOnChangeInput(e)}
                />
                <div className="icon_password">
                  {/* <i className="password_icon fa-sharp fa-solid fa-lock"></i> */}
                  <i onClick={(e) => handleOnClickPass(setPass, pass)} class={`eye_icon fa-solid fa-eye-slash d-${type}`}></i>
                </div>
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
            {/* <div className="facebook_login">
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
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
}
