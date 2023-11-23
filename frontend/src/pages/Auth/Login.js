import  {React} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { Link,  useNavigate } from "react-router-dom";
import { login, checkRole } from '../../api/AuthApi';

const Login = () => {
  const  usenavigate = useNavigate();
  const handleSubmit = async (prop) => {
    prop.preventDefault();
    const username = prop.target.username.value;
    const password = prop.target.password.value;
    console.log("Username:", username);
    console.log("Password:", password);
  
    const success = await login({ username, password });
    const role = await checkRole({username, password});
    if (success) {
      if (role) {
        usenavigate('/admin');
      }else{
        usenavigate('/');
      }
    } else {
      usenavigate('/login');
    }
};
  return (
    <>
    <FontAwesomeIcon icon="fa-brands fa-google" />
    <form onSubmit={handleSubmit} id="form-login">
      <div className="bg-white px-14 py-16 mt-[-10px] rounded-3xl border-2 border-gray">
        <h1 className="text-5xl font-semibold text-center mb-2">Đăng Nhập</h1>
        <p className="font-medium text-lg text-gray-500 mt-4 text-center">
          Xin chào! Mời bạn đăng nhập tài khoản
        </p>
        <div className="mt-2">
          <div>
            <label className="text-lg font-medium">Tài khoản</label>
            <input
              type="text"
              name="username"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 mb-1 bg-transparent"
              placeholder="Nhập tên người dùng"
            />
          </div>
          <div className="mt-2">
            <label className="text-lg font-medium">Mật khẩu</label>
            <input
              name="password"
              type="password"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 mb-1 bg-transparent"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Ghi nhớ mật khẩu
              </label>
            </div>
            <button className="font-medium text-base text-[#0dd3b7] hover:underline hover:scale-[1.03]">
              Quên mật khẩu?
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-y-4">
            <button type="submit" className="active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all py-2 rounded-xl bg-[#0dd3b7] text-white text-lg font-bold">
              Đăng nhập
            </button>
            <button className="flex justify-center items-center rounded-xl py-2 border-2 border-gray-200 gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all text-lg font-semibold">
              <FontAwesomeIcon icon={faGoogle} style={{color: "#ff0000",}} size="xl"/>
              Đăng nhập với Google
            </button>
            <button className="flex justify-center rounded-xl py-2 border-2 border-gray-200 items-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.02] ease-in-out transition-all text-lg font-semibold">
              <FontAwesomeIcon icon={faFacebook} style={{color: "#0000ff",}} size="xl"/>
              Đăng nhập với Facebook
            </button>
          </div>
          <div className="mt-6 flex justify-center items-center">
            <p className="font-medium text-base">Bạn chưa có tài khoản? </p>
            <button className="font-medium text-base text-[#0dd3b7] hover:underline hover:scale-[1.03] ml-1.5">
              <Link to="/signup">Đăng ký</Link>
            </button>
          </div>
        </div>
      </div>   
    </form> 
    </>
    
  );
};

export default Login;
