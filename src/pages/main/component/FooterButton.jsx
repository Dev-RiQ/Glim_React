import { React } from 'react';

function FooterButton(props) {
  return (
    <div className="footer-btn">
      <button>
        <p>{props.icon}</p>
        <p>{props.title}</p>
      </button>
    </div>
  )
};

export default FooterButton;
