import axios from 'axios';
import useToast from '../pages/main/hook/ShowToast';

let API_KEY = localStorage.getItem('accessToken');
if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/find') && !window.location.pathname.includes('join')) {
  if (!API_KEY) {
    window.alert('로그인 정보가 확인되지 않습니다.\n다시 로그인 해주세요.')
    window.location.href = '/login'
  }
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
  baseURL: "/api/v1",
  // baseURL: "http://192.168.10.89:8081/api/v1",
  // baseURL: "http://192.168.0.2:8081/api/v1",
  headers: header,
});
apiFile.interceptors.response.use(
  (response) => {
    const data = response?.data?.data ? response?.data?.data : response?.data
    if (data.length === 1) {
      return data[0]
    }
    return data;
  },
  (error) => {
    if (error.response?.data?.errors[0]) {
      useToast("error", error.response?.data?.errors[0]);
    } else {
      useToast("error", error.response?.data?.errors);
    }
  }
);

export default apiFile;