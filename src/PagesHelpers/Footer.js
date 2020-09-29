import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import '../Styles/Footer.css'

const Footer = () => {
    return (
        <div className="home15">
            <div className="home16">
                <Container fluid>
                    <Row>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="home17">
                                <h3>Trending Location</h3>
                                <ul>
                                    <li><a href="jdfakkl">Mumbai</a></li>
                                    <li><a href="jdfakkl">Pune</a></li>
                                    <li><a href="jdfakkl">Delhi</a></li>
                                    <li><a href="jdfakkl">Kolkata</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="home18">
                                <h3>About Us</h3>
                                <ul>
                                    <li><a href="jdfakkl">About Jiji</a></li>
                                    <li><a href="jdfakkl">Careers</a></li>
                                    <li><a href="jdfakkl">Terms and Conditions</a></li>
                                    <li><a href="jdfakkl">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="home19">
                                <h3>Help & Support</h3>
                                <ul>
                                    <li><a href="jdfakkl">Help</a></li>
                                    <li><a href="jdfakkl">Contact Support</a></li>
                                    <li><a href="jdfakkl">Contact Us</a></li>
                                    <li><a href="jdfakkl">FAQ</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={3}>
                            <div className="home20">
                                <h3>Follow Us</h3>
                                <ul>
                                    <li><a href="jdfakkl">Blog</a></li>
                                    <li><a href="jdfakkl">Products</a></li>
                                    <li><a href="jdfakkl">Services</a></li>
                                    <li><a href="jdfakkl">Contact Us</a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="home21">
                            <p>@2020, Jiji. All Rights Reserved</p>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Footer;