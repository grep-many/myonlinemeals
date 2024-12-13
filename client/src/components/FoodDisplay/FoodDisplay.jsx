import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'
import React, { useContext } from 'react';

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">

                {!food_list.length ?
                    <p style={{ display: 'flex', justifyContent: 'center', color: 'red', fontWeight: '500' }}>No dishes to display</p>
                    :
                    food_list.map((item, index) => {
                        if (category === 'All' || category === item.category) {
                            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        }
                    })}
            </div>
        </div>
    );
}

export default FoodDisplay;
