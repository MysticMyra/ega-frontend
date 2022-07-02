import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../Service/UserService.js";
import axios from "axios";
import "./Register.css";

function Register(props) {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const userAPI = "http://localhost:9091/api";

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitForm = e => {
    e.preventDefault();
    createUser(data);
  };

  const createUser = user => {
    axios
      .post(`${userAPI}/addUser/`, user)
      .then(response => {
        console.log("Responsee-->", response);
        navigate("/registerSuccess");
      })
      .catch(error => {
        console.log(" Error Message: " + error);
      })
      .finally(() => {
        console.log("in finally");
      });
  };

  return (
    <div className="container register">
      <div className="registerTitle mb-3">Online Banking Registration</div>
      <br />
      <div className="row">
        <div className="col s12 yellow ">
          <div className="form-container">
            <form className="form-horizontal">
              <div className="form-group row">
                <label htmlFor="firstName" className="control-label col-sm-3">
                  First Name
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="John"
                    value={data.firstName}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="lastName" className="control-label col-sm-3">
                  Last Name
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Doe"
                    value={data.lastName}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="loginName" className="control-label col-sm-3">
                  Login Name
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="loginName"
                    placeholder="john.doe"
                    value={data.loginName}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="control-label col-sm-3">
                  Password
                </label>
                <div className="col-sm-6">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="**********"
                    value={data.password}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="control-label col-sm-3">
                  Email
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="john.doe@gmail.com"
                    value={data.email}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="contactNumber"
                  className="control-label col-sm-3"
                >
                  Contact Number
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="contactNumber"
                    placeholder="+971 789789789"
                    value={data.contactNumber}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="address" className="control-label col-sm-3">
                  Address
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Apartment number:100, Building 104, The Gardens"
                    value={data.address}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="state" className="control-label col-sm-3">
                  State
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    placeholder="Dubai"
                    value={data.state}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="country" className="control-label col-sm-3">
                  Country
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    placeholder="UAE"
                    value={data.country}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="pincode" className="control-label col-sm-3">
                  Pincode
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    placeholder="56789"
                    value={data.pincode}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary registerButton"
                type="submit"
                onClick={e => submitForm(e)}
              >
                Register
              </button>
            </form>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
