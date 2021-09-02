import React from 'react'
import './header.scss'
import {Link} from 'react-router-dom'
import Logo from '../assets/wkndr Logo (9).png'
import { auth } from '../../firebase/utils'

const Header = (props) => {
    const { currentUser } = props;
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="logo"></img>
                    </Link>
                </div>
                <div className="callToActions">
                {!currentUser && (
                        <ul>
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul> 
                )}
                { currentUser && (
                    <ul>
                        <li>
                            <span onClick={() => auth.signOut()}><a>Logout</a></span>
                        </li>
                    </ul>
                )}
                
                </div>
            </div>
        </header>
    )
}
Header.defaultProps = {
    currentUser: null
}
export default Header
