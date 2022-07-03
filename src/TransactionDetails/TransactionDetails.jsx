import React, { useContext, useEffect } from "react";
import { Table } from "react-bootstrap";
import Context1 from "../Context1";

const TransactionDetails = () => {
  const accountNumber = useContext(Context1);
  console.log("Transa details---->", accountNumber);
  const API = useEffect(() => {
    //    loadTransactions(accountNumber);
  });

  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>25-06-2022</td>
            <td>DEBIT CARD PURCHASE: ETISALAT DUBAI</td>
            <td>-AED 20</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionDetails;
