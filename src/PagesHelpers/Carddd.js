import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../Styles/carddd.css';

const Cardd = ({ product,
    showAtToCart = true, }) => {
        
    const {_id, name, description, price, quantity} = product;

    const [proo, setProo] = useState({
        _id,
        name,
        price,
        description,
        quantity
    })


    const ShowImage = ({ item, url }) => {

        const arr = item.photo

        return (
            <div className='chh2'>
            {
              arr && arr[0] && <img src={`${process.env.REACT_APP_API_URL}/${url}/photo/${item._id}?photoId=${arr[0]._id}`} alt={item.name} />
            }
            </div>
        );
    }

    return (
        <div className="chh">
            <div className="chh1">
                <Link className="chh1" to={`/product/${product._id}`}>
                    <ShowImage url="product" item={product} />
                </Link>
                <div className="chh3">
                    <h3>{product.name.substring(0, 15)}</h3>
                    <h4><i className="fa fa-inr"></i>{product.price}</h4>
                    <div className="chh4">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cardd;