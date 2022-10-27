import React, { useEffect, useState } from 'react';
import './OrderDetailGroceries.scss'
import {useLocation} from 'react-router-dom'
import { deltailOrder } from '../../../../api/orderApi';

export default function OrderDetailGroceries() {
  const location = useLocation();
  console.log('ss', location.state.id);
  const [list, setList] = useState({})
  const [item, setItem] = useState(list.orderItem)
  const getDetail = async() => {
    const res = await deltailOrder(location.state.id);
    return res;
  }
  useEffect(()=>{
    getDetail().then((res)=>{
      console.log(res);
      setList(res.data.data)
    })
  }, [])
  console.log('list', list.orderItem);
  console.log('item', item);
  return (
    <div className='OrderDetailGroceries'>
        <h1>Order Detail Groceries</h1>
        <div>
          Mã đơn hàng: 
        </div>
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
          {/* <tbody>
            {list.orderItem.map((li, i) => {
              return (
                <tr>
                  <th scope="row"> {li._id} </th>
                  <td> {li._id} </td>
                  <td> {li.product_name} </td>
                  <td> {li.product_name} </td>
                  <td> {li.product_name}</td>
                  <td> {li.product_name} </td>
                  <td> {li.product_name} </td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
    </div>
  )
}
