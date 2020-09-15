import React, { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt'
import '../Styles/Card.css'

const Card = () => {

    useEffect(()=>{
        VanillaTilt.init(document.querySelectorAll(".card1"),{
            max:25,
            speed:400
        })
    },[])

    return (
        <div className="card">
            <div className="card1">
                <h3 className="cardname">Product Name</h3>
                <a href="djakf" className="seeAds">See Now</a>
                <div className="circle"></div>
                <img src={"https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lim.size_75x75.jpg"} alt="ad" className="cardImg" />
            </div>
        </div>
    );
};

export default Card;