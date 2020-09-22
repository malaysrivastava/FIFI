import React, { useState, useEffect } from 'react';
import Card from '../PagesHelpers/IndividualCard';
import axios from 'axios';
import Carddd from '../PagesHelpers/Carddd'
import '../Styles/product.css';
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import { Row, Col, Container } from 'react-bootstrap';

const Products = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
        relatedProductFetch(productId)
    }, [props])

    const loadSingleProduct = async productId => {
        await axios.get(`${process.env.REACT_APP_API_URL}/item?id=${productId}`)
            .then(res => {
                setProduct(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })
    }

    const relatedProductFetch = (productId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/products/related/${productId}`)
            .then(res => {
                setRelatedProduct(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }


    const state1 = {
        // galleryItems: relatedProduct && relatedProduct
        // .map((product, i) => {
        //     return (
        //         <div>
        //             <Carddd key={i} product={product} />
        //         </div>
        //     )
        // }
        // )
    }

    const responsive = {
        0: { items: 1 },
        550: { items: 2 },
        820: { items: 3 },
        1200: { items: 4 },
        1400: { items: 5 },
    }

    return (
        <div className="pro">
            <div>{
                <Card  product={product}/>
            }
            </div>
            <div>
                <div className="pro16">
                    <AliceCarousel
                        items={state1.galleryItems}
                        responsive={responsive}
                        autoPlayInterval={5000}
                        autoPlayDirection="rtl"
                        autoPlay={true}
                        fadeOutAnimation={true}
                        mouseTrackingEnabled={true}
                        playButtonEnabled={false}
                        disableAutoPlayOnAction={true}
                        dotsDisabled={true}
                    />
                </div>
            </div>
        </div >
    );
}

export default Products;