import React from 'react'
import Shopmen from './../assets/shopmen.jpg'
import Shopwomen from './../assets/shopwomen.jpg'
import './directory.scss'
const Directory = (props) => {
    return (
        <div className="directory">
            <div className="wrap">
                <div className="item"
                style={{
                    backgroundImage: `url(${Shopmen})`
                }}>
                    <a href="W">
                        Shop Mens
                    </a>
                </div>
                <div className="item"
                style={{
                    backgroundImage: `url(${Shopwomen})`
                }}>
                    <a href="S">
                        Shop Womens
                    </a>
                </div>
            </div>            
        </div>
    )
}

export default Directory
