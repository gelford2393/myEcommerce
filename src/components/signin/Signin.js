import React from 'react'
import Buttons from '../forms/Button'
import {signInWithGoogle, auth} from './../../firebase/utils'
import FormInput from '../forms/FormInput'
import Authwrapper from '../authwrapper/Authwrapper'
import { Link } from 'react-router-dom'

import './signin.scss'

const initialState = {
    email:"",
    password:""
}

class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...initialState
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState ({
            [name]: value
        })
    }
    handleSubmit =  async (e) => {
        e.preventDefault()
        const {email, password} = this.state

        try {
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({
               ...initialState
           })
        } catch (error) {
            // console.log(error); 
        }
    }
    render() {
        const {email, password} = this.state
        const configAuthWrapper = {
            headline: 'Login'
        }
        return (
            <Authwrapper {...configAuthWrapper}>
                 <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>
                        
                                <FormInput
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    />
                                <FormInput
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    />
                                <Buttons type="submit">
                                    Sign In
                                </Buttons>
                      
                    <div className="socialSignin">
                            <div className="row">
                                <h2>or</h2>
                                <Buttons onClick={signInWithGoogle}>
                                    Sign in with google
                                </Buttons>
                                </div>
                            </div>
                            <div className="links">
                                <Link to="recovery">
                                    Reset Password
                                </Link>
                            </div>
                        </form>
                    </div> 
            </Authwrapper>
        )
    }
    
}

export default Signin
