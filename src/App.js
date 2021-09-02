import React, {Component} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Registration from './components/pages/registration/Registration';
import Homepage from './components/pages/homepage/Homepage';
import Login from './components/pages/login/Login';

import { auth, handleUserProfile } from './firebase/utils'
import Recovery from './components/pages/recovery/Recovery';

const initialState = {
  currentUser: null
}

class App extends Component {
 constructor (props) {
   super(props)
   this.state = {
     ...initialState
   }
 }
 authListener = null;

 componentDidMount() {
   this.authListener = auth.onAuthStateChanged( async userAuth => {
     if (userAuth) {
       const userRef = await handleUserProfile(userAuth);
       userRef.onSnapshot(snapshot => {
         this.setState({
           currentUser: {
             id: snapshot.id,
             ...snapshot.data()
           }
         })
       })
     }
     this.setState({
       ...initialState
     })
      
   })
 }
componentWillUnmount() {
  this.authListener();
}
 render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
          <Switch>
            <MainLayout  currentUser={ currentUser }>
                <Route exact path="/" component={Homepage}/> 
                <Route path="/registration" component={Registration}/>
                {currentUser ? <Redirect to="/"/> : <Route path="/login" component={Login} />}
                <Route path="/recovery" component={Recovery}/>
            </MainLayout>    
          </Switch>
      </div>
    );
  }
}

  


export default App;
