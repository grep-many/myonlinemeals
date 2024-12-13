import axios from 'axios';
import './List.css'
import React, { useEffect, useState } from 'react';
import { url } from '../../config/config';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    console.log(`${url}/api/food/list`);
    const response = await axios.get(`${url}/api/food/list`);
    

    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error(response.data.message);
    }
  }

  const removeFoodClick = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    if (response.data.success) {
      fetchList();
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <b className='cross-icon' onClick={() => removeFoodClick(item._id)}>X</b>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default List;
