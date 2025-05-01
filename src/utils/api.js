import axios from 'axios';
import Toast from '../components/Toast';
import { render } from '@testing-library/react';
import useToast from '../pages/main/hook/ShowToast';

let API_KEY = localStorage.getItem('accessToken');
if (!API_KEY && (!window.location.pathname.includes('/login') && !window.location.pathname !== '/join')) {
  window.alert('로그인 정보가 확인되지 않습니다.\n다시 로그인 해주세요.')
  window.location.href = '/login'
}
let header = {
  Accept: "application/json",
  Authorization: `Bearer ${API_KEY}`,
}
if (window.location.pathname === '/login' || window.location.pathname === '/join') {
  header = {
    Accept: "application/json",
  }
}
// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  headers: header,
});
api.interceptors.response.use(
  (response) => {
    console.log(response)
    // 토큰 재요청 있는지 없는지 확인해서 있으면 로컬스토리지 다시저장 추가
    return response?.data?.data ? response?.data?.data : response?.data
  },
  (error) => {
    console.log(error)
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_BAD_RESPONSE') {
      useToast("error", '로그인 정보가 정확하지 않습니다.');
      setTimeout(() => {
        // window.location.href = "/login"
      }, 500);
      return null;
    } else {
      useToast("error", error.response?.data?.errors[0]);
      return null;
    }
  }
);

export default api;