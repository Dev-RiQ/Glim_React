import { useState, useEffect } from 'react';
import axios, { formToJSON } from 'axios';

function useAxios(method, uri, body) {
  const url = 'http://localhost:8081/api/v1' + uri;
  const [data, setData] = useState([]);
  let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTc0NTQxNDgzMCwiZXhwIjoxNzQ1NDE4NDMwfQ.Q3uGClmb_ZfA3v6bjoQppe7-OFGv0tF1jUsCGAEKRNA'
  token = null;
  if (!token && window.location.pathname !== '/login') {
    window.alert('로그인 정보가 확인되지 않습니다.\n다시 로그인 해주세요.')
    window.location.href = '/login'
  }
  function setContent() {
    return (
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: body,
      }
    );
  }


  useEffect(() => {
    const fetchData = async () => {
      let res;
      switch (method) {
        case 'get': res = await axios.get(url, setContent()); break;
        case 'post': res = await axios.post(url, setContent()); break;
        case 'put': res = await axios.put(url, setContent()); break;
        case 'patch': res = await axios.patch(url, setContent()); break;
        case 'delete': res = await axios.delete(url, setContent()); break;
        default: return null;
      }
      return res.data;
    }
    fetchData().then(res => setData(res));
  }, []);

  return data;
}

export default useAxios;