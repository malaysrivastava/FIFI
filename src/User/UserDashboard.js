import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { Link } from 'react-router-dom';
import axios from "axios";

const UserDashboard = () => {

    const { name, email, _id } = isAuth();
    const token = getCookie('token');
    const [values, setValues] = useState([])
    const { photo, phone, pincode, state, street, city } = values;
    const [len1, serLen1] = useState();
    const [len2, serLen2] = useState();
 
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
    }, [])

    return (
        <div>
            <Layout title='User Dashboard' description={`hello ${name}`}>
                <div>
                    <ul>
                        <li><Link to={`/profile/${isAuth()._id}`}>Update Profile</Link></li>
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
                </div>
            </Layout>
        </div>
    );
}

export default UserDashboard;
