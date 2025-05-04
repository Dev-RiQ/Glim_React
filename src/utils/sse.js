import { EventSourcePolyfill } from "event-source-polyfill";

function sseEvent(uri) {
  let API_KEY = localStorage.getItem('accessToken');
  if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/find') && !window.location.pathname.includes('join') && !API_KEY) {
    window.alert('로그인 정보가 확인되지 않습니다.\n다시 로그인 해주세요.')
    window.location.href = '/login'
    return null;
  }
  let header = {
    Authorization: `Bearer ${API_KEY}`,
  }

  const action = new EventSourcePolyfill('http://localhost:8081/api/v1' + uri, {
    headers: header
  })

  return action;
}

export default sseEvent;