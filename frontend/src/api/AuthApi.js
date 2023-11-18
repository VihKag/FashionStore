import axios from 'axios';
const API_LOGIN = 'http://localhost:8080/api/auth/signin';
const ROLE_USER = ['admin', 'manager', 'staff', 'warehouse','customer'];
const login = async ({username, password})=>{
    try{
        const response = await axios.post(API_LOGIN,{username, password});
        const { token, role} = response.data;
        localStorage.setItem('token',token);
        localStorage.setItem('role',JSON.stringify(role));
        return true;
    }catch (error){
        console.log("Login failed",error);
        return false;
    }
}
const logout = () => {
  localStorage.removeItem('token');
};

const getToken = ({prop}) => {
  return localStorage.getItem({prop});
};

const checkRole = async ()=>{
  try{
      const {role } = getToken('role');
      const isAdmin = role.some(r => r.authority === ROLE_USER[0]);
      if(isAdmin){
        return true;
      }
      
  }catch (error){
      return false;
  }
}

export { login, logout, getToken , checkRole};


