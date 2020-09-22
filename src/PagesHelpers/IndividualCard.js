import React from 'react';
import ShowImage from './ShowImage';
import '../Styles/card copy.css';
import { Container, Row, Col } from 'react-bootstrap';

const Card = ({ product }) => {


    return (
        <div className="card">
            <div className="card1">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={5}>
                            <ShowImage item={product} url="product" />
                        </Col>
                        <Col sm={12} md={7}>
                            <div className="card2">
                                <h2>{product.name} </h2>
                                <h3><i className="fa fa-inr"></i>{product.price}</h3>
                                <p>{product.description}</p>
                                <p>{product.views}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Card;