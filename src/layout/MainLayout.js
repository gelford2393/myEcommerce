import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
const MainLayout = (props) => {
    return (
        <div className="fullHeight">
             <Header {...props}/>
                {props.children}
            <Footer/>
        </div>
    )
}

export default MainLayout
