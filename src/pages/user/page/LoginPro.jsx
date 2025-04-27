import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoginPro = () => {
  const token = useParams().accessToken;
  const noPhone = useParams().noPhone;
  const navigate = useNavigate();
  useEffect(() => {
    if (token.startsWith('eyJhbGciOiJIUzI1NiJ9.') && token.includes('wiZXhwIjoxNzQ1N')) {
      localStorage.setItem("accessToken", token);
      if (noPhone) {
        navigate('/socialJoin', { state: { accessToken: token } })
      } else {
        localStorage.setItem("accessToken", token);
        navigate('/')
      }
    } else {
      navigate('/login')
    }
  }, [])
}

export default LoginPro;
