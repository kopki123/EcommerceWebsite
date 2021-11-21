import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

const OrderDetail = () => {
  const { payment_id } = useParams();
  const value = useGlobalContext();
  const [history] = value.UserAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    if (payment_id) {
      history.forEach((item) => {
        if (item._id === payment_id) {
          setOrderDetail(item);
        }
      });
    }
  }, [payment_id, history]);

  if (orderDetail.length === 0) {
    return null;
  }

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>標題</th>
            <th>地址</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.address.recipient_name}</td>
            <td>
              {orderDetail.address.linel + " - " + orderDetail.address.city}
            </td>
            <td>{orderDetail.address.postal_code}</td>
            <td>{orderDetail.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: "2rem 0" }}>
        <thead>
          <tr>
            <th></th>
            <th>商品</th>
            <th>數量</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.cart.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img src={item.images.url} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price * item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
