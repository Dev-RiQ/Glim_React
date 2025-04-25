import { useParams } from "react-router-dom";

const LoginPro = () => {
  const token = useParams().accessToken;
  if (token.startsWith('eyJhbGciOiJIUzI1NiJ9.') && token.includes('wiZXhwIjoxNzQ1N')) {
    localStorage.setItem("accessToken", token);
    window.location.href = "/";
  } else {
    window.location.href = "/login";
  }
}

export default LoginPro;
