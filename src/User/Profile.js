import React, { useEffect, useState } from 'react';
import axios from "axios";
import { isAuth, getCookie, updateUser } from '../helpers/auth';
import { Form, Button } from 'react-bootstrap'
import Layout from '../core/Layout';

const Profile = (props) => {

    const [values, setValues] = useState({
        name: '',
        password: '',
        error: '',
        email: '',
        success: false
    })

    const { name, password, email } = values

    const userId = isAuth()._id;
    const token = getCookie('token');

    const readProfile = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/user/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(res => {
                console.log(res.data)
                setValues({ ...values, name: res.data.name, email: res.data.email })
            })
            .catch(err => {
                console.error(err);
                setValues({ ...values, error: true })
            });
    }

    const updateProfile = (userId, token, user) => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/user/${userId}`,
                {
                    user
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            ).then((res) => {
                console.log(res.data)
                updateUser(res.data, () => {
                    setValues({
                        ...values,
                        name: res.data.name,
                        email: res.data.email,
                        success: true
                    })
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        readProfile();
    }, [])

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        updateProfile(userId, token, { email, password, name });
    }

    return (
        <Layout title='Profile update' description={`hey ${name} want to update your profile `}>
            <Form onSubmit={clickSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange('name')} value={name} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={handleChange('email')} value={email} placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                 </Button>
            </Form>
        </Layout>
    );
}

export default Profile;