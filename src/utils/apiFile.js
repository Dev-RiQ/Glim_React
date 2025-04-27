import axios from 'axios';
import useToast from '../pages/main/hook/ShowToast';

let API_KEY = localStorage.getItem('accessToken');
if (!API_KEY && (!window.location.pathname.includes('/login') && !window.location.pathname !== '/join')) {
  window.alert('로그인 정보가 확인되지 않습니다.\n다시 로그인 해주세요.')
  window.location.href = '/login'
}
let header = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${API_KEY}`,
}
if (window.location.pathname === '/login' || window.location.pathname === '/join') {
  header = {
    "Content-Type": "multipart/form-data",
  }
}
// Axios 인스턴스 생성
const apiFile = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  headers: header,
});
apiFile.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_BAD_RESPONSE') {
      useToast("error", '로그인 정보가 정확하지 않습니다.');
      setTimeout(() => {
        window.location.href = "/login"
      }, 500);
    } else {
      useToast("error", error.response?.data?.errors[0]);
    }
  }
);

export default apiFile;