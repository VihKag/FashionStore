import './App.css';
import { Route,Routes} from "react-router-dom";
import AdminRouter from "./routes/Admin";
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
function App() {
  return (
    <>
    <Routes>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
      

    </>
  );
}

export default App;
