import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import '../style/loading.css'

function Loading(props) {
  const override = {
    margin: "auto",
  };

  return (
    <div className='loading-box'>
      <HashLoader
        color='#c47fd2'
        loading="true"
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={1.7}
      />
    </div>
  );
}

export default Loading;