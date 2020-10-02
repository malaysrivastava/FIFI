import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie,signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify'

const UserDashboard = ({history}) => {

    const { name, email, _id } = isAuth();
    const token = getCookie('token');
    const [values, setValues] = useState([])
    const { photo, phone, pincode, state, street, city } = values;
    const [len1, serLen1] = useState();
    const [len2, serLen2] = useState();
    const [ads, SetAds] = useState([])
 
    const readProfile = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => {
                setValues(res.data)
                serLen1(res.data.followers.length)
                serLen2(res.data.following.length)
            })
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        readProfile(_id)
        axios
        .get(`${process.env.REACT_APP_API_URL}/ads/by/postedBy?id=${_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            SetAds(res.data)
        })
        .catch(err => {
            console.error(err);
        });

    }, [])

    const handleLogout = () => {
        signout(() => {
            history.push('/');
            toast.success('Signout Successfully');
        })
    }

    return (
        <div>
        <ToastContainer />
            <Layout title='User Dashboard' description={`hello ${name}`}>
                <div>
                    <ul>
                        <li><Link to={`/profile/${isAuth()._id}`}>Update Profile</Link></li>
                        <li> { isAuth() && isAuth().role === 1 && <Link to='/admin/dashboard'>Admin Dashboard </Link> }</li>
                        <li>                        {
                            isAuth() &&
                                <button onClick={handleLogout} className='btn btn-link p-0 m-0 pb-2 min'> Logout </button>
                        }</li>
                    </ul>
                </div>

                <div>
                    <h3>User Info</h3>
                    <div>
                        <img src={photo} alt="name" />
                    </div>
                    <ul>
                        <li>{name}</li>
                        <li>{email}</li>
                        <li>{phone}</li>
                        <li>{pincode}</li>
                        <li>{state}</li>
                        <li>{city}</li>
                        <li>{street}</li>
                        <li>followers :- {len1}</li>
                        <li>following :- {len2}</li>
                    </ul>
                </div>
                <div>
                    <h2>Your Adds</h2>
                    {
                        JSON.stringify(ads)
                    }
                </div>
            </Layout>
        </div>
    );
}

export default UserDashboard;