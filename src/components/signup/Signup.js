import React, { Component } from 'react'
import { auth, handleUserProfile} from './../../firebase/utils'
import FormInput from '.././forms/FormInput'
import Button from '.././forms/Button'
import './signup.scss'

const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: []
}
export class Signup extends Component {
    constructor(props) {
        super(props) 
        this.state = { 
            ...initialState
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    async handleFormSubmit (e) {
        e.preventDefault(); 
        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            const err = [`Password Don't Match`];
            this.setState({
                errors: err
            })
            return
        }
        try {
           const {user} = await auth.createUserWithEmailAndPassword(email, password)
           await handleUserProfile(user, {displayName})
           this.setState({
               ...initialState
           })
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const {displayName, email, password, confirmPassword, errors} = this.state;
        return (
            <div className="signup">
                <div className="wrap">
                    <h2>Sign Up</h2>
                    {errors.length > 0 &&(
                        <ul>
                            {errors.map((err, i) => {
                              return (
                                <li key={i}>
                                 {err}
                                </li>
                              )
                            })}
                        </ul>
                    )}
                    <div className="formWrap">
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            onChange={this.handleChange}
                        />
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
                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                        />
                       <Button type="submit">Register</Button>
                    </form>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Signup
