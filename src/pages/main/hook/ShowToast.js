import { render } from "@testing-library/react";
import Toast from "../../../components/Toast";

function ShowToast(type, msg) {
  setTimeout(() => {
    const apiErrorToast = render(<Toast type={type} msg={msg} />).container.firstChild;
    document.querySelector('section').appendChild(apiErrorToast);
    setTimeout(() => {
      document.querySelector('section').removeChild(apiErrorToast);
    }, 1500);
  }, 10);
}

export default ShowToast;