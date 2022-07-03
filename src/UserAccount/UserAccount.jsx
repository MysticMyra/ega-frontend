import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Store";
import profilePhoto from "./profilePhoto.jpg";
import "./UserAccount.css";

function UserAccount(props) {
  const [state, dispatch] = useContext(Context);

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [transactionFlag, setTransactionFlag] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  var srNo = 1;

  const UserAPI = `http://localhost:9091/api/users/find?loginName=${state.users.loginName}`;
  const AccountAPI = `http://localhost:9091/api/account/${state.users.accountNumber}`;
  const TransactionAPI = `http://localhost:9091/api/account/${state.users.accountNumber}/transactions`;

  const fetchUserDetails = API => {
    axios
      .get(API)
      .then(response => {
        //--> changed for context setData(response.data);
        dispatch({ type: "SET_USERS", payload: response.data });
      })
      .catch(err => {
        // changed for context setError(true);
        dispatch({ type: "SET_ERROR", payload: error });
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
        // changed fro context setAccountData(response.data);
        dispatch({ type: "SET_USER_ACCOUNT", payload: response.data });
      })
      .catch(err => {
        // chnaged for context setError(true);
        dispatch({ type: "SET_ERROR", payload: error });
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

  const fetchTransactionDetails = TransactionAPI => {
    axios
      .get(TransactionAPI)
      .then(response => {
        // changed for context setTransactionData(response.data);
        dispatch({ type: "SET_TRANSACTIONS", payload: response.data });
      })
      .catch(err => {
        //changed for context setError(true);
        dispatch({ type: "SET_ERROR", payload: error });

        console.log("transactionData ->catch", error);
        if (err.response) {
          console.log(" Error in Response", error.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log(" Transaction Error Message: " + error);
        }
      })
      .finally(() => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUserDetails(UserAPI);
    fetchAccountDetails(AccountAPI);
    fetchTransactionDetails(TransactionAPI);
  }, [UserAPI, AccountAPI, TransactionAPI]);

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
                            value={
                              state.users.firstName + " " + state.users.lastName
                            }
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
                            value={state.users.accountNumber}
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
                            value={"AED " + state.account.currentBalance}
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
          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Transfer Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionFlag && state.transactions
                  ? state.transactions.map(data => (
                      <tr key={data.transactionId}>
                        <td>{srNo++}</td>
                        <td>25-06-2022</td>
                        <td>{data.transactionDescription}</td>
                        <td>{data.transferType}</td>
                        <td>AED {data.account.currentBalance}</td>
                      </tr>
                    ))
                  : ""}{" "}
              </tbody>
            </Table>

            {/* {transactionFlag && transactionData
              ? transactionData.map(data => (
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Transfer Type</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={data.transactionId}>
                        <td>{srNo++}</td>
                        <td>25-06-2022</td>
                        <td>{data.transactionDescription}</td>
                        <td>{data.transferType}</td>
                        <td>AED {data.account.currentBalance}</td>
                      </tr>
                    </tbody>
                  </Table>
                ))
              : ""} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
