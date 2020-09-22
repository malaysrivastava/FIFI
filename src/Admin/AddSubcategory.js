import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth, getCookie } from '../helpers/auth';
import { toast, ToastContainer } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddCategory = () => {

    const [category, setCategory] = useState([]);

    const [namee, setName] = useState({
        name: '',
        Category: ''
    });

    const {name, Category} = namee

    const token = getCookie('token');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
            .then(res => {
                setCategory(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = nameee => (e) => {
        e.preventDefault()
        setName({...namee, [nameee]:e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault()
        console.log(token)
        if (name) {
            axios
                .post(`${process.env.REACT_APP_API_URL}/sub/category/create/${isAuth()._id}`,
                    {
                        name,
                        Category
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
            <h1>Add Subcategory</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Control type="text" placeholder="Name"  onChange={handleChange('name')} value={name} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Choose Category </Form.Label><br />
                    <select onChange={handleChange('Category')} >
                        <option>Please Select</option>
                        {category && category.map((f, i) =>
                            (<option key={i} value={f._id}>
                                {f.name}
                            </option>)
                        )}
                    </select>
                </Form.Group>
                <Button variant="danger" type="submit">
                    Create SubCategory
                </Button>
            </Form>
        </Layout>
    );
}

export default AddCategory;