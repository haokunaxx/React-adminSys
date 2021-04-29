import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';

const CardTitle = (props) => {
    const {parentId, parentName,showFirstLevelCateList} = props;
    return(
        <Breadcrumb className='breadcrumb-wrapper' separator=">">
            {
                parentId === 0 ? (
                    <Breadcrumb.Item>
                        品类管理
                    </Breadcrumb.Item>
                ) : (
                    <>
                        <Breadcrumb.Item onClick ={()=>{showFirstLevelCateList()}}>
                            <Link to='#'>品类管理</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {parentName}
                        </Breadcrumb.Item>
                    </>
                )
            }
        </Breadcrumb>
    )
}

export default CardTitle;