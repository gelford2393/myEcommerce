import React, { Component } from 'react'
import { withRouter  } from 'react-router-dom'
import Authwrapper from '../authwrapper/Authwrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { auth } from '../../firebase/utils'
const initialState = { 
    email: "",
    errors: []
}
class EmailPassword extends Component {
    constructor (props) {
        super(props)
        this.state = {
            ...initialState
        }
    }
    handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const {email} = this.state
            const config = {
                url: 'http://localhost:3000/login'
            }
            await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                this.props.history.push('/login')
            })
            .catch(() => {
                const err = ['Email not found. Please try again']
                this.setState({
                    errors:err
                })
            })
        } catch (error) {
            // console.log(error);
        }
    }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }
    render () {
        const configAuthWrapper = {
            headline: 'Email Password'
        }
        const {email, errors} = this.state;
        return (
            <Authwrapper {...configAuthWrapper}>
                <div className="formWrap">
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
                    <form onSubmit={this.handleSubmit}>
                    <FormInput
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={this.handleChange}
                    />
                    <Button>Confirm</Button>
                    </form>
                </div>
                
               
            </Authwrapper>
        )
    }
    
}

export default withRouter(EmailPassword)
