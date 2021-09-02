import React from 'react'
import './authwrapper.scss'

const Authwrapper = ({headline, children}) => {
    return (
        <div className="authWrapper">
            <div className="wrap">
                {headline && <h2>{headline}</h2>}
                <div className="children">
                    {children && children}
                </div>
              
            </div>
        </div>
    )
}

export default Authwrapper
