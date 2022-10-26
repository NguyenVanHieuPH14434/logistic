import React from 'react';
import './OrderDetailGroceries.scss'

export default function OrderDetailGroceries() {
  return (
    <div className='OrderDetailGroceries'>
        <h1>Order Detail Groceries</h1>
        <table className="table text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Tên đầy đủ</th>
              <th scope="col">Số Điện Thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Đơn Hàng</th>
            </tr>
          </thead>
          <tbody>
            {/* {listt.map((li, i) => {
              return (
                <tr>
                  <th scope="row"> {li._id} </th>
                  <td> {li.user_id} </td>
                  <td> {li.full_name} </td>
                  <td> {li.phone} </td>
                  <td> {li.address} </td>
                  <td> {li.status} </td>
                  <td> {li.status} </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
    </div>
  )
}
