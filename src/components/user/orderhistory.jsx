import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import API_URL from "../url";
import { getHeader } from "../authentication/session";

export default function OrderHistory({ match }) {
  const [orders, setOrders] = useState([]);

  let active = Number(match.params.page);
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        href={"/orderhistory/" + number}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    getOrderHistory(active);
  }, []);

  useEffect(() => {
    console.log("the orders are :", orders);
  }, [orders]);

  async function getOrderHistory(active) {
    try {
      let url = `${API_URL}/user/getorderhistory?page=${active}&&limit=10`;
      let response = await fetch(url, {
        headers: getHeader(),
      });
      setOrders(await response.json());
    } catch (err) {
      console.log(err);
    }
  }

  if (orders.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div className="container">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Ammount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.values.map((value) => (
                <>
                  <tr>
                    <th scope="row">{value._id}</th>
                    <td>{value.package ? value.package.name : "Deleted"}</td>
                    <td>{value.package ? value.package.price : "Deleted"}</td>
                    <td>{value.status}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container">
        <div>
          <Pagination>{items}</Pagination>
        </div>
      </div>
    </>
  );
}
