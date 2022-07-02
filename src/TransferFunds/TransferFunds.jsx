import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TransferFunds.css";
import axios from "axios";
import { onceSupported } from "dom-helpers/cjs/addEventListener";

function TransferFunds(props) {
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [accountNumber, setAccountNumber] = useState();

  const [depositForm, setDepositForm] = useState();
  const [successTransaction, setSuccessTransaction] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const transAPI = `  http://localhost:9091/api/account/${accountNumber}/transactions`;

  const handleChange = e => {
    //  setData({ ...data, [e.target.name]: e.target.value });
    e.preventDefault();

    setData({ ...data, [e.target.name]: e.target.value });
  };

  const backClick = e => {
    e.preventDefault();
    navigate("/userAccoutDetails");
  };
  const continueClicked = e => {
    e.preventDefault();

    console.log("transfer funds->", data);
    insertTransaction(data);

    //if successfully insered into db , success alert a true else false.
    setSuccess(true);
  };

  const insertTransaction = transactionData => {
    axios
      .post(transAPI, transactionData)
      .then(response => {
        console.log("Responsee-->", response);
        setSuccessTransaction(true);
      })
      .catch(error => {
        console.log(" Error Message: " + error);
      })
      .finally(() => {
        console.log("in finally");
      });
  };

  useEffect(() => {
    setAccountNumber(location.state.accountNumber);
  });

  return (
    <div className="container login">
      <div className="loginTitle mb-3">Transfer Details : {accountNumber}</div>
      <br />

      <br />
      <div className="row">
        <div className="col s12 yellow ">
          <div className="form-container">
            <form className="form-horizontal">
              <div className="form-group row">
                <label htmlFor="loginName" className="control-label col-sm-3">
                  Action
                </label>
                <div className="col-sm-6">
                  <select
                    className="form-control"
                    aria-label="Default select example"
                    value={data.action}
                    onChange={e => handleChange(e)}
                    name="action"
                  >
                    <option selected>Choose an action</option>
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="amount" className="control-label col-sm-3">
                  Amount
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="amount"
                    placeholder="AED"
                    value={data.amount}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="transactionDescription"
                  className="control-label col-sm-3"
                >
                  Description
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="transactionDescription"
                    placeholder=""
                    value={data.transactionDescription}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="transferType"
                  className="control-label col-sm-3"
                >
                  Transfer Type
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="transferType"
                    placeholder=""
                    value={data.transferType}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary button1"
                type="submit"
                onClick={e => continueClicked(e)}
              >
                Continue
              </button>
              <button
                className="btn btn-primary button2"
                type="submit"
                onClick={e => backClick(e)}
              >
                Back
              </button>
              <br />
              <br />
            </form>
            {successTransaction ? (
              <div class="alert alert-success" role="alert">
                Transaction Successful!
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferFunds;
