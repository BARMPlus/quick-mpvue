/**
 * Created by Administrator on 2017/12/11.
 */


import localStorage from './storage'


export let TokenKey='Authorization';
export function getToken(){
   return localStorage.getItem(TokenKey);
}
export function setToken(token){
  localStorage.setItem(TokenKey,token);
}
export function removeToken(){
  localStorage.removeItem(TokenKey);
}







