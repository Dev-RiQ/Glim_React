import React from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loading() {
  const override = {
    margin: "auto",
  };
  return (
    <HashLoader
      color='#c47fd2'
      loading="true"
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
      speedMultiplier={1.7}
    />
  );
}

export default Loading;