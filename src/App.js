import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import RegisterSuccess from "./Register/RegisterSuccess";
import Store from './Store';
import Topbar from "./Topbar/Topbar";
import TransferFunds from "./TransferFunds/TransferFunds";
import UserAccount from "./UserAccount/UserAccount";
function App() {
  const currentUser = true;
  return (
    <div>
      <Store>
        <Router>
          <Topbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/registerSuccess" element={<RegisterSuccess />}></Route>
            <Route path="/userAccoutDetails" element={<UserAccount />}></Route>
            <Route path="/transferFunds" element={<TransferFunds />}></Route>
          </Routes>
        </Router>
      </Store>

    </div>
  );
}

export default App;
