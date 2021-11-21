import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
  const value = useGlobalContext();
  const [history, setHistory] = value.UserAPI.history;
  const [isAdmin] = value.UserAPI.isAdmin;
  const [token] = value.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const response = await axios.get("/api/payment", {
            headers: { authorization: token },
          });
          setHistory(response.data);
        } else {
          const response = await axios.get("/user/history", {
            headers: { authorization: token },
          });
          setHistory(response.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2>訂單紀錄</h2>
      <h4>你有 {history.length} 筆訂單</h4>
      <table>
        <thead>
          <tr>
            <th>訂單 ID</th>
            <th>購買日期</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((items) => {
            return (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
