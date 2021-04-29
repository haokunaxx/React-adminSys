import axios from 'axios';
import {message} from 'antd';
const BASE  = '';
export default function ajax(url,data={},type='GET'){
    let baseUrl = BASE + url,
        promise;
    return new Promise((resolve,reject)=>{
        if(type === 'GET'){
            promise = axios.get(baseUrl,{
                params:data
            })
        }else{
            promise = axios.post(baseUrl,data);
        }
        promise.then(response => {
            resolve(response.data);
        }).catch(reason => {
            message.error(reason.message);
        })
    })

    
}