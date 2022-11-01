import {react,useState} from "react";
import "./register.scss";
import logo_login from "../../../assets/public/img/logo_login.png";
import background_login from "../../../assets/public/img/image-background-login.png";
import { Register } from "../../../api/auth";
import { Link } from "react-router-dom";

export default function RegisterUser() {
  const [register,setRegister]=useState({
    fullName:"",
    username:"",
    phone:"",
    password:"",
    checkPassword:""
  })
  console.log(register)
  const handleInput=(e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setRegister({...register,[name]:value})
  }
  const checkValidate = (n) => {
    //create
        if (
            n.fullName !== '' &&
            n.phone &&
            n.password !== '' &&
            n.checkPassword !== ''
        ) {
            if(n.password===n.checkPassword){
              Register(register)
              .then(()=>{
                setRegister({
                  fullName:'',
                  phone:"",
                  password:"",
                  checkPassword:""
                })
              })
            }
            else{
              return alert('check password !!!')
            }
        }
        else {
            return alert("please input!!");
        }
  };
  const handleRegister=()=>{
    checkValidate(register)
  }
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
          <div className="form_login">
            <div className="login_form_input">
              <span>
                <input type="text" onChange={handleInput} name="fullName"  value={register.fullName} placeholder="Họ và tên" />
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span>
                <input type="text"onChange={handleInput} name="phone" value={register.phone} placeholder="Số điện thoại" />
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <span>
                <input type="text"onChange={handleInput} name="password" value={register.password} placeholder="Mật khẩu..." />
                <i className="fa-sharp fa-solid fa-lock"></i>
              </span>
              <span>
                <input type="text"onChange={handleInput} name="checkPassword" value={register.checkPassword} placeholder="Nhập lại mật khẩu..." />
                <i className="fa-sharp fa-solid fa-lock"></i>
              </span>
              <div className="duy_tri">
                <input type="checkbox" />
                <p>Duy trì đăng nhập</p>
              </div>
            </div>
            <div className="login_form_btn">
              <button onClick={()=>handleRegister()}>Đăng Ký</button>
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
