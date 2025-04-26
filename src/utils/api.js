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
if (window.location.pathname !== '/login' || window.location.pathname !== '/join') {
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
  (response) => response,
  (error) => {
    useToast("error", error.response?.data?.errors[0]);
  }
);

export default api;