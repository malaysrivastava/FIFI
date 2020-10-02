import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/cardd.css';

const Cardd = ({ product }) => {

    const ShowImage = ({ item, url }) => {

        const arr = item.photo

        return (
            <div className='ch2'>
                {arr && arr[0] && <img src={`${process.env.REACT_APP_API_URL}/post/photo/${item._id}?photoId=${arr[0]._id}`} alt={item.name} style={{'border-radius':'17px','height':'100%','width':'100%'}} />}
            </div>
        );
    }

    return (<>
                <div className="col-sm-2 m-2 p-1 mobile" style={{'border-radius':'17px','box-shadow':'3px 3px 3px 3px grey',cursor:'pointer'}}>
                     
                <Link className="ch1" to={`/product/${product._id}`}>
                <ShowImage url="product" item={product} />
                </Link>
                <div className="ch3 text-center m-1">
                {product.name.substring(0, 20)}
                </div>
                 </div>
                  
                 
        </>    
    );
}

export default Cardd;