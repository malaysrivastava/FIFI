import React from 'react';

const ShowImage = ({ item, url }) => {

    const arr = item.photo
    const change = (e) => {
        document.querySelector('.main-img').src = e.target.src
    }

    return (
        <div className="cardPic">
            <div className="cardPic2">
                {
                    arr && arr.map((element, i) => {
                        return (
                            <div className="cardPic3" onClick={change} key={i}>
                                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${item._id}?photoId=${element._id}`}
                                    alt={element.name} />
                            </div>
                        )
                    })
                }
            </div>
            <div className="cardPic1" >
                {
                    arr && <img src={`${process.env.REACT_APP_API_URL}/post/photo/${item._id}?photoId=${arr[0]._id}`}
                        alt={item.name}
                        className="main-img"
                    />
                }
            </div>
        </div>
    );
}


export default ShowImage;