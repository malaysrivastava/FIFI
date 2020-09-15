import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar, Nav } from 'react-bootstrap';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: "blue" };
    }
}


const Menu = ({ history }) => {
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
                        <Nav.Link ><Link style={isActive(history, '/shop')} to='/shop'> Categories </Link></Nav.Link>
                        <Nav.Link ><Link style={isActive(history, '/shop')} to='/shop'> Contact Us </Link></Nav.Link>
                        <Nav.Link ><Link style={isActive(history, '/shop')} to='/shop'> Sell </Link></Nav.Link>
                        {
                            isAuth() && isAuth().role === 0 && <Nav.Link ><Link style={isActive(history, '/user/dashboard')} to='/user/dashboard'> Dashboard </Link></Nav.Link>
                        }
                        {
                            isAuth() && isAuth().role === 1 && <Nav.Link ><Link style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>Admin Dashboard </Link>
                                                               <Link style={isActive(history, '/user/dashboard')} to='/user/dashboard'>Edit Profile</Link>
                            </Nav.Link>
                            
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