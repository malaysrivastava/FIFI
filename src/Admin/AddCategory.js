import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddCategory = () => {

    const [name, setName] = useState('');

    const token = getCookie('token');

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log(token)
        if (name) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/category/create/${isAuth()._id}`,
                {
                    name
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                )
                .then(res => {
                    setName({
                        name: ''
                    });
                    toast.success(res.data.message);
                })
                .catch(err => {
                    toast.error(err.response.data.error);
                });

        }
        else {
            toast.error('Please fill the name');
        }
    }

    return (
        <Layout title='category' description='enter category name' >
            <ToastContainer />
            <h1>Add category</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Control type="text" placeholder="Name" onChange={handleChange} value={name} />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Create Category
                </Button>
            </Form>
        </Layout>
    );
}

export default AddCategory;