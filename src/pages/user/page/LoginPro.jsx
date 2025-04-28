import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoginPro = () => {
  const token = useParams().accessToken;
  const noPhone = useParams().noPhone;
  const navigate = useNavigate();
  useEffect(() => {
    if (token.length > 100) {
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
