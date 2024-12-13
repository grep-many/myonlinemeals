import { assets } from '../../assets/assets';
import './Add.css';
import axios from 'axios';
import React, { useState } from 'react';
import { url } from '../../config/config';
import { toast } from 'react-toastify';

const Add = () => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad'
  });

  const hadleOnChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Loop through the data object and append each key-value pair to formData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === 'price' ? Number(value) : value); // Convert price to number
    });

    // Add the image file to the FormData
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Tell the server that you're uploading files
        },
      });

      if (response.data.success) {
        setImage(null); // Clear the image state after submission
        toast.success(response.data.message)
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad',
        });
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(response.data.message)
    }
  };


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleOnSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={((e) => setImage(e.target.files[0]))} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={hadleOnChange} type="text" name='name' value={data.name} placeholder='Type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={hadleOnChange} name="description" value={data.description} rows={6} placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={hadleOnChange} name="category" value={data.category} required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            $<input onChange={hadleOnChange} type='Number' name='price' value={data.price} placeholder='20' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
}

export default Add;
