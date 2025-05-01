import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React } from 'react';
import "../assets/style/iconButton.css"

function IconButton(props) {
  let name = "icon-btn";
  if (props.check && props.check === 'like') {
    name += " " + props.like;
  } else if (props.check) {
    name += " " + props.check;
  }
  return (
    <div className={name}>
      <button>
        <FontAwesomeIcon icon={props.icon} />
      </button>
    </div >
  )
};

export default IconButton;
