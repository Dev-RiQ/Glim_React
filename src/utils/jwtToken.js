const jwtToken = () => {
  const accessToken = localStorage.getItem("accessToken")
  let hasToken = true;
  if (!accessToken) {
    hasToken = false;
  }
  return hasToken;
}

export default jwtToken;