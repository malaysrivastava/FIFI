import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
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

    const handleLogout = () => {
        signout(() => {
            history.push('/');
            toast.success('Signout Successfully');
        })
    }

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
                                                    s.Category.name == m.name ? (<Dropdown.Item><Link style={{ color: 'black' }} to={`/category/${s._id}`} >{s.name} {s.view}</Link></Dropdown.Item>) : ''
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ))
                            }

                        </DropdownButton>
                        <Nav.Link ><Link style={isActive(history, '/shop')} to='/shop'> Contact Us </Link></Nav.Link>
                        <Nav.Link ><Link style={isActive(history, '/shop')} to='/shop'> Sell </Link></Nav.Link>
                        {
                            isAuth() && <Nav.Link ><Link style={isActive(history, '/user/dashboard')} to='/user/dashboard'> Dashboard </Link></Nav.Link>
                        }
                        {
                            !isAuth() &&
                            <Fragment>
                                <Nav.Link ><Link style={isActive(history, '/login')} to='/login'> SignIn </Link></Nav.Link>
                            </Fragment>
                        }
                        {
                            isAuth() &&
                            <Fragment>
                                <Nav.Link ><button onClick={handleLogout} className='btn btn-link p-0 m-0 pb-2 min'> Logout </button></Nav.Link>
                            </Fragment>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default withRouter(Menu);