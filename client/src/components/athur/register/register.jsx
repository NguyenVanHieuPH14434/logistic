import {react,useEffect,useState} from "react";
import "./register.scss";
import logo_login from "../../../assets/public/img/logo_login.png";
import background_login from "../../../assets/public/img/image-background-login.png";
import { Register } from "../../../api/auth";
import { Link } from "react-router-dom";
import { toastifyError, toastifySuccess } from "../../../lib/toastify";
import { changeStyleInputPassword, handleOnClickPass, isVietnamesePhoneNumber } from "../../../lib/shipFee";

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
          if (isVietnamesePhoneNumber(n.phone) === false) {
            return toastifyError("Số điện thoại không đúng định dạng!");
          } else if(n.password===n.checkPassword){
              Register(register)
              .then((res)=>{
               if(res.data.success){
                setRegister({
                  fullName:'',
                  phone:"",
                  password:"",
                  checkPassword:""
                })
                toastifySuccess('Tạo tài khoản thành công!')
              }else {
                toastifyError(res.data.message)
              }
              })
              .catch((err)=>{
                toastifyError(err.message)
              })
            }
            else{
              return toastifyError('Xác nhận mật khẩu không đúng!')
            }
        }
        else {
            return toastifyError("Vui lòng nhập đầy đủ thông tin!");
        }
  };
  const handleRegister=()=>{
    checkValidate(register)
  }

  
  const [type, setType] = useState('none')
  const [type1, setType1] = useState('none')
  const [pass, setPass] = useState(false)
  // const [passConfim, setPassConfim] = useState(false)

  useEffect(() =>{
    changeStyleInputPassword(register.password, setType)
    changeStyleInputPassword(register.checkPassword, setType1)
  }, [register.password, register.checkPassword])

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
              <span className="d-flex mx-auto password_input">
                <input type="text" onChange={handleInput} name="fullName"  value={register.fullName} placeholder="Họ và tên" />
                <i className="fa-solid fa-circle-user"></i>
              </span>
              <span className="d-flex mx-auto password_input">
                <input type="text"onChange={handleInput} name="phone" value={register.phone} placeholder="Số điện thoại" />
                <i className="fa-solid fa-mobile-screen-button"></i>
              </span>
              <span className="d-flex mx-auto password_input">
                <input className="icon_password" type={pass ? 'text' : 'password' } onChange={handleInput} name="password" value={register.password} placeholder="Mật khẩu..." />
                {/* <i className="fa-sharp fa-solid fa-lock"></i> */}
                  <i onClick={(e) => handleOnClickPass(setPass, pass)} class={`eye_icon fa-solid fa-eye-slash d-${type}`}></i>
              </span>
              <span className="d-flex mx-auto password_input">
                <input className="icon_password" type={pass ? 'text' : 'password' } onChange={handleInput} name="checkPassword" value={register.checkPassword} placeholder="Nhập lại mật khẩu..." />
                {/* <i className="fa-sharp fa-solid fa-lock"></i> */}
                  <i onClick={(e) => handleOnClickPass(setPass, pass)} class={`eye_icon fa-solid fa-eye-slash d-${type1}`}></i>
              </span>
             
            </div>
            <div className="login_form_btn mt-2">
              <button onClick={()=>handleRegister()}>Đăng Ký</button>
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
          </div>
        </div>
      </div>
    </>
  );
}
