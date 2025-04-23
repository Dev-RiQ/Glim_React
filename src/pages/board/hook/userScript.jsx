import { useEffect, useState } from "react";

function useScript(src) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let script = document.querySelector(`script[src="${src}"]`);

    //script가 없을시 실행하여 중복돼서 생기지 않도록 함
    if (!script) {
      script = document.createElement("script"); //script태그를 추가해준다.
      script.src = src; //script의 실행 src
      script.async = true; //다운로드 완료 즉시 실행
    }

    const handleLoad = () => setLoading(false);
    const handleError = (error) => setError(error);

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, [src]);

  return [loading, error];
}

export default useScript;
