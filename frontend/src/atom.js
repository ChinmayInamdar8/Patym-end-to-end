import {atom} from 'recoil';
export const token = atom({
    key:"token",
    default:""
}) 

export const allUsers = atom({
    key:"allUsers",
    default:[],
});

export const sendTo = atom({
    key:"sendTo",
    default:{},
});