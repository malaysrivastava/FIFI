import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/cardd.css';

const Cardd = ({ product }) => {

    const ShowImage = ({ item, url }) => {

        const arr = item.photo

        return (
            <div className='ch2'>
                {arr && arr[0] && <img src={`${process.env.REACT_APP_API_URL}/post/photo/${item._id}?photoId=${arr[0]._id}`} alt={item.name} />}
            </div>
        );
    }

    return (
        <div className="ch">
            <div className="ch1">
                <Link className="ch1" to={`/product/${product._id}`}>
                    <ShowImage url="product" item={product} />
                </Link>
                <div className="ch3">
                    <h3>{product.name}</h3>
                </div>
            </div>
        </div>
    );
}

export default Cardd;