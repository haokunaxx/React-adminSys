import store from 'store';

const USER_INFO = 'userInfo';
let userInfo = store.get(USER_INFO) || null;

const saveUser = (data) => {
        store.set(USER_INFO,data);
        userInfo = data;
    }, 
    removeUser = () => {
        store.remove(USER_INFO);
        userInfo = null;
    },
    getUser = () => {
        return store.get(USER_INFO);
    };

export {
    saveUser,
    removeUser,
    getUser
}

export default userInfo;