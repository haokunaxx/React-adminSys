import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './index.scss';
import {Breadcrumb as ElBreadcrumb} from 'antd';


class Breadcrumb extends Component{
    render(){
        console.log(this.props);
        return(
            <ElBreadcrumb className='breadcrumb-wrapper' separator=">">
                <ElBreadcrumb.Item>Home</ElBreadcrumb.Item>
                <ElBreadcrumb.Item>Application Center</ElBreadcrumb.Item>
                <ElBreadcrumb.Item>Application List</ElBreadcrumb.Item>
                <ElBreadcrumb.Item>An Application</ElBreadcrumb.Item>
            </ElBreadcrumb>
        )
    }
}

export default withRouter(Breadcrumb);
