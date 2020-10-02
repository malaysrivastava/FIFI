import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth } from '../helpers/auth';
import { ToastContainer } from 'react-toastify';
import { Navbar, Nav, Dropdown, DropdownButton, Button, ButtonGroup } from 'react-bootstrap';
import axios from "axios";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: "blue" };
    }
}


const Menu = ({ history }) => {

    const [categories, setCategory] = useState([]);
    const [subcategories, setSubcategory] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
            .then(res => {
                setCategory(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`${process.env.REACT_APP_API_URL}/sub/category`)
            .then(res => {
                setSubcategory(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    return (
        <div>
            <ToastContainer />
            <Navbar expand="lg">
                <Navbar.Brand ><Link to='/'>JIJI</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">

                        <Nav.Link ><Link style={isActive(history, '/')} to='/'> Home </Link></Nav.Link>
                        <DropdownButton id="dropdown-basic-button" title="Category">
                            {
                                categories && categories.map((m, i) => (
                                    <Dropdown as={ButtonGroup} key={i}>
                                        <Button>
                                            <Link style={{ color: 'white' }} to={`/category/${m._id}`} >{m.name} {m.view}</Link>
                                        </Button>
                                        <Dropdown.Toggle split id="dropdown-split-basic" />
                                        <Dropdown.Menu>
                                            {
                                                subcategories.map((s, i) => (
                                                    s.Category.name === m.name ? (<Dropdown.Item><Link style={{ color: 'black' }} to={`/category/${s._id}`} >{s.name} {s.view}</Link></Dropdown.Item>) : ''
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ))
                            }

                        </DropdownButton>
                        <Nav.Link ><Link style={isActive(history, '/shop')} to='/shop'> Contact Us </Link></Nav.Link>
                        {
                            isAuth() && <Nav.Link ><Link style={isActive(history, '/user/dashboard')} to='/user/dashboard'> {isAuth().name} </Link></Nav.Link>
                        }
                        {
                            !isAuth() &&
                            <Fragment>
                                <Nav.Link ><Link style={isActive(history, '/login')} to='/login'> SignIn </Link></Nav.Link>
                            </Fragment>
                        }
                        <Nav.Link ><Link style={isActive(history, '/shopp')} to='/shopp'> Sell </Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Menu);