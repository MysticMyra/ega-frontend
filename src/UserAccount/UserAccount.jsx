import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import profilePhoto from "./profilePhoto.jpg";
import { useLocation } from "react-router-dom";
import "./UserAccount.css";
import axios from "axios";
import Context1 from "../Context1";

function UserAccount(props) {
  const [data, setData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [error, setError] = useState(false);
  const [loginName, setLoginName] = useState();
  const [transactionFlag, setTransactionFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const accountNumber = useContext(Context1);
  console.log("Transa details", accountNumber);

  const UserAPI = `http://localhost:9091/api/users/find?loginName=${loginName}`;
  const AccountAPI = `http://localhost:9091/api/account/${data.accountNumber}`;

  const fetchUserDetails = API => {
    axios
      .get(API)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        setError(true);
        console.log("->catch", error);
        if (err.response) {
          console.log("Error in Response", error.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error Message: " + error);
        }
      })
      .finally(() => {
        console.log("finally", error);
      });
  };
  const fetchAccountDetails = AccountAPI => {
    axios
      .get(AccountAPI)
      .then(response => {
        setAccountData(response.data);
      })
      .catch(err => {
        setError(true);
        console.log("accountData ->catch", error);
        if (err.response) {
          console.log(" Error in Response", error.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(" Error Message: " + error);
        }
      })
      .finally(() => {
        console.log(error);
      });
  };
  useEffect(() => {
    setLoginName(location.state.loginName);
    fetchUserDetails(UserAPI);
    fetchAccountDetails(AccountAPI);
  }, [UserAPI, AccountAPI]);

  const viewTransactions = e => {
    e.preventDefault();
    setTransactionFlag(true);
  };

  const transferFunds = e => {
    e.preventDefault();
    // navigate("/transferFunds");
    navigate("/transferFunds", {
      state: { accountNumber: data.accountNumber }
    });
  };
  return (
    <div className="container login">
      <div className="loginTitle mb-3">Welcome to Emirates Global Bank</div>
      <br />

      <div className="row">
        <div className="col s12 yellow ">
          <div className="form-container"></div>

          <Card
            style={{ width: "50rem", height: "15rem" }}
            className="border-0"
          >
            <Row className="no-gutters">
              <Col md={5} lg={5}>
                <Card.Img
                  variant="top"
                  src={profilePhoto}
                  alt=""
                  className="profilePhoto"
                />
              </Col>
              <Col>
                <Card.Body>
                  <form>
                    <Card.Title>
                      <div class="form-group row">
                        <div class="col-sm-10">
                          <input
                            type="text"
                            readOnly
                            className="form-control-plaintext text-uppercase"
                            id="staticEmail"
                            value={data.firstName + " " + data.lastName}
                          />
                        </div>
                      </div>
                    </Card.Title>
                    <Card.Text>
                      <div class="form-group row">
                        <label
                          htmlFor="staticEmail"
                          class="col-sm-4 col-form-label"
                        >
                          Current Account
                        </label>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            readOnly
                            class="form-control-plaintext"
                            id="staticEmail"
                            value={data.accountNumber}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          htmlFor="staticEmail"
                          class="col-sm-4 col-form-label"
                        >
                          Available Balance
                        </label>
                        <div class="col-sm-6">
                          <input
                            type="text"
                            readOnly
                            class="form-control-plaintext"
                            id="staticEmail"
                            value={"AED " + accountData.currentBalance}
                          />
                        </div>
                      </div>
                    </Card.Text>
                  </form>
                  <Button
                    variant="primary"
                    className="userAccountButton1"
                    onClick={e => viewTransactions(e)}
                  >
                    View Transaction
                  </Button>
                  <Button
                    variant="primary"
                    className="userAccountButton2"
                    onClick={e => transferFunds(e)}
                  >
                    Transfer Funds
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <br />
          <br />
          <br />
          <br />
          {transactionFlag ? <TransactionDetails /> : ""}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
