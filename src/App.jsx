import {Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

export default class App extends Component{
    render(){
        return(
            <div className='container'>
                <Switch>
                    <Route path='/Login' component={Login}></Route>
                    <Route path='/' component={Home}></Route>
                </Switch>
            </div>
        ) 
    }
}