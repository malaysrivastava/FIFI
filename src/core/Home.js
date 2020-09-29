import React, { useState, useEffect } from 'react';
import axios from 'axios'
import queryString from 'query-string'
import Cardd from '../PagesHelpers/Cardd';

const Home = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })
    const [mostView, setMostView] = useState([]);
    const [damcat, setDamcat] = useState([]);
    const [x, setx] = useState(0)

    const { categories, category, searched, search, results } = data

    const getCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/categories`)
            .then(res => {
                const { data } = res;
                setData({ ...data, categories: data });
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getMostViewAds = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/mostView`)
            .then(res => {
                const { data } = res;
                setMostView(data);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getMostViewCategory = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/popular/categories`)
            .then(res => {
                const { data } = res;
                setDamcat(data);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        getCategories()
        getMostViewAds()
        getMostViewCategory()
    }, [])

    const handleChange = name => e => {
        setData({
            ...data, [name]: e.target.value, searched: false
        })
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const loadProductBySell = (params) => {
        const query = queryString.stringify(params)
        console.log(query)
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts/search?${query}`)
            .then(res => {
                let response = res.data
                setData({ ...data, results: response, searched: true })
                setx(1);
                console.log(response)
            })
            .catch(err => {
                console.log(`Server Error`, err.response.data.error);
            })
    }

    const searchData = () => {
        //console.log(search, category)
        if (search) {
            loadProductBySell({ search: search || undefined, category: category })
        }

    }

    const Sexa = () => {
        if (x === 1) {
            return (
                <div>
                    <h2>{searchMessage(searched, results)}</h2>
                    {results.map((r, i) => (
                        <Cardd key={i} product={r} />
                    ))}
                </div>
            )
        }
        else {
            return <h2>Please search the products</h2>
        }
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        else {
            return 'no products found'
        }
    }

    return (
        <div>
            <div>
                <div>
                    <h1>Sell Faster,</h1>
                    <h2>Buy Smarter.</h2>
                    <h3>Sell your unwanted items faster on Jiji and earn extra cash</h3>
                    <p>Buy items from other people for a lower price.</p>
                </div>
                <div>
                    <form onSubmit={searchSubmit}>
                        <select onChange={handleChange('category')}>
                            <option value='All'>Pick a category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <input type='search' onChange={handleChange('search')}
                            placeholder='search by city'
                        />
                        <button className='btn-success'> Search</button>
                    </form>
                </div>
            </div>
            <Sexa />
            <div>
                <div>
                    <h4>Popular Categories</h4>
                    <p>Most popular categories of items that users buy and sell.</p>
                </div>
                {
                    JSON.stringify(damcat)
                }
            </div>
            <div>
                <div>
                    <h4>Trending Products</h4>
                    <p>Most Trending products on the Jiji marketplace</p>
                </div>
                {
                    mostView.map((p, i) => (
                        <Cardd key={i} product={p} />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;