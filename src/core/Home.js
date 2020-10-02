import React, { useState, useEffect } from 'react';
import axios from 'axios'
import queryString from 'query-string'
import Cardd from '../PagesHelpers/Cardd';
import illust from '../Assests/home.svg';
import mobile from '../Assests/category.svg';
import productclock from '../Assests/product.svg';

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
            return <h6 className="text-success m-1">or Browse the categories</h6>
        }
    }

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        else {
            return <h7 className="text-danger">no products found</h7>
        }
    }

    return (
        <>
            <div className="container mt-1 p-1">
                <div className="row m-auto text-center">

                <div className="col-sm-6 m-2 text-left">
                    <h1>Sell Faster,</h1>
                    <h1>Buy Smarter.</h1>
                    <p className="m-0 mt-4">Sell your unwanted items faster on Jiji and earn extra cash</p>
                    <p className="m-0 mb-4">Buy items from other people for a lower price.</p>

                    <form className="form mt-1" onSubmit={searchSubmit}>
                    <select className="mr-3 btn" style={{border:'none'},{'border-radius':'20px','padding':'3px','background-color':'#A3A3A3'}} onChange={handleChange('category')}>
                        <option style={{border:'none'},{'border-radius':'20px','padding':'3px','background-color':'#A3A3A3'}} value='All'>Pick a category</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                    <input className="btn mr-2" style={{border:'none'},{'border-radius':'20px','padding':'3px','background-color':'#A3A3A3'}} type='search' onChange={handleChange('search')}
                        placeholder='search by city'
                    />
                    <button className='btn-success m-1 btn' style={{border:'none'},{'border-radius':'15px','padding':'0px 5px'}}> Search</button>
                </form>
                <Sexa />
                </div>
                <div className="col-sm-5 text-sm-right offset-sm-2 m-2">
                    <img src={illust} style={{width:'80%'}}/>
                </div>
                </div>
            </div>
            
            <div className="container mt-1 p-1">
            <div className="row m-auto">
                <div className="col-sm-12 p-1">
                 <h3 className="m-2">Popular Categories</h3>
                    <p className="m-2">Most popular categories of items that users buy and sell.</p>
                </div>
                <div className="col-sm-12 p-1 m-1">
                
                    <div className="row m-auto">
                    
                  {
                      damcat.map((cat, ca) => (
                        <div className="col-sm-2 m-2 p-1 mobile" style={{ 'border-radius': '17px', 'box-shadow': '3px 3px 3px 3px grey', cursor: 'pointer' }} key={ca}>
                           
                            <img src={`${process.env.REACT_APP_API_URL}/category/photo/${cat._id}?photoId=${cat._id}`} style={{ width: '100%','border-radius': '17px' }} />
                            <div className="row m-auto m-1 text-center">
                            <div className="col-sm-6">{cat.name}</div>
                            <div className="col-sm-6">({cat.view} ads))</div>
                            
                            </div>
                                                   
                            </div>
                      ))
                      }
                 </div>

                    <div className="col-sm-6 m-2 text-left">
                        <h1>Sell Faster,</h1>
                        <h1>Buy Smarter.</h1>
                        <p className="m-0 mt-4">Sell your unwanted items faster on Jiji and earn extra cash</p>
                        <p className="m-0 mb-4">Buy items from other people for a lower price.</p>

                        <form className="form mt-1" onSubmit={searchSubmit}>
                            <select className="mr-3 btn" style={{ border: 'none' }, { 'border-radius': '20px', 'padding': '3px', 'background-color': '#A3A3A3' }} onChange={handleChange('category')}>
                                <option style={{ border: 'none' }, { 'border-radius': '20px', 'padding': '3px', 'background-color': '#A3A3A3' }} value='All'>Pick a category</option>
                                {categories.map((c, i) => (
                                    <option key={i} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                            <input className="btn mr-2" style={{ border: 'none' }, { 'border-radius': '20px', 'padding': '3px', 'background-color': '#A3A3A3' }} type='search' onChange={handleChange('search')}
                                placeholder='search by city'
                            />
                            <button className='btn-success m-1 btn' style={{ border: 'none' }, { 'border-radius': '15px', 'padding': '0px 5px' }}> Search</button>
                        </form>
                        <Sexa />
                    </div>
                    <div className="col-sm-5 text-sm-right offset-sm-2 m-2">
                        <img src={illust} style={{ width: '80%' }} />
                    </div>
                </div>
            </div>

            <div className="container mt-1 p-1">
                <div className="row m-auto">
                    <div className="col-sm-12 p-1">
                        <h3 className="m-2">Popular Categories</h3>
                        <p className="m-2">Most popular categories of items that users buy and sell.</p>
                    </div>
                    <div className="col-sm-12 p-1 m-1">

                        <div className="row m-auto">
                            {
                                damcat.map((cat, ca) => (
                                    <div className="col-sm-2 m-2 p-3 mobile" style={{ 'border-radius': '17px', 'box-shadow': '3px 3px 3px 3px grey', cursor: 'pointer' }} key={ca}>
                                        <div>{cat.name}</div>
                                        <div>({cat.view} ads))</div>
                                        <img src={`${process.env.REACT_APP_API_URL}/category/photo/${cat._id}?photoId=${cat._id}`} style={{ width: '100%' }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>

            <div className="container mt-1 p-1">
                <div className="row m-auto">

                
                 {
                    mostView.map((p, i) => (
                        <Cardd key={i} product={p}/>
                     ))
                }
                 </div>
                 </div>
                
                  <div className="col-sm-12 text-center mt-5">
                  <button className="btn text-success" style={{'border-radius':'20px','border-color':'Green'}}>Learn more</button>
                  </div>

                 </div>

                    <div className="col-sm-12 p-1">
                        <h3 className="m-2">Trending Products</h3>
                        <p className="m-2">Most Trending products on the Jiji marketplace</p>
                    </div>
                    <div className="col-sm-12 p-1 m-1">
                        <div className="row m-auto">
                            {
                                mostView.map((p, i) => (
                                    <div className="col-sm-2 m-2 mobile" style={{ 'border-radius': '17px', 'box-shadow': '3px 3px 3px 3px grey', cursor: 'pointer' }}>
                                        <Cardd key={i} product={p} style={{ width: '100%' }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="col-sm-12 text-center mt-5">
                        <button className="btn text-success" style={{ 'border-radius': '20px', 'border-color': 'Green' }}>Learn more</button>
                    </div>

                </div>

            </div>

        </>

    );
};

export default Home;