import {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'; 
import './index.scss';
// import Breadcrumb from './Breadcrumb';

import Index from './Index/index';
import Role from './Role';
import Product from './Product';
import Category from './Category';
import User from './User';
import Pie from './Charts/Pie';
import Cube from './Charts/Bar';
import Line from './Charts/Line';

export default class Content extends Component{
    render(){
        return(
            <div className='content-wrapper'>
               <Switch>
                    <Route path='/index' component={Index}></Route> 
                    <Route path='/user' component={User}></Route> 
                    <Route path='/role' component={Role}></Route> 
                    <Route path='/product' component={Product}></Route> 
                    <Route path='/category' component={Category}></Route> 
                    <Route path='/charts/pie' component={Pie}></Route> 
                    <Route path='/charts/bar' component={Cube}></Route> 
                    <Route path='/charts/line' component={Line}></Route> 
                    <Redirect to='/index'></Redirect>
                </Switch>
            </div>
        )
    }
}
