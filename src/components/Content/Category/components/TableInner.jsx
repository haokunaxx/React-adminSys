import { Button } from 'antd';
const TableInner = (props) => {
    const {parentId, category, showModal, showSubCateList} = props;
    return(
        <div>
            <Button 
                onClick={showModal}
                style={{paddingLeft:0}} 
                type="link">
                    编辑分类名
            </Button>
            {parentId === '0' ? <Button 
                style={{paddingLeft:0}} 
                type="link" 
                onClick={()=>{showSubCateList(category)}}>
                    查看子分类
            </Button> : null}
        </div>
    )
}
export default TableInner