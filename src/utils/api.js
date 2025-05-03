import axios from 'axios';
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
    const data = response?.data?.data ? response?.data?.data : response?.data
    if (data.token) {
      localStorage.setItem('accessToken', data.token)
      const originalRequest = response.config;
      originalRequest.headers.Authorization = `Bearer ${data.token}`
      return api(originalRequest);
    }
    if (data.length === 0) {
      return null;
    }
    return data
  },
  (error) => {
    if (error.response?.data?.errors?.length > 0) {
      useToast("error", error.response?.data?.errors[0]);
    } else if (error.status === 500) {
      useToast("error", '서버와의 통신에 실패했습니다.');
    } else if (error.status === 404) {
      useToast("error", "해당하는 정보를 찾을 수 없습니다.")
    } else if (error.status === 401) {
      useToast("error", "로그인 정보가 확인되지 않습니다.")
    } else if (error.status === 400 || 405) {
      useToast("error", "잘못된 요청입니다.")
    } else {
      useToast("error", error.code)
    }
    return null;
  }
);

export default api;