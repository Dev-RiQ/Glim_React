import { render } from "@testing-library/react";
import Toast from "../../../components/Toast";

function ShowToast(type, msg) {
  setTimeout(() => {
    const apiErrorToast = render(<Toast type={type} msg={msg} />).container.firstChild;
    document.querySelector('section').appendChild(apiErrorToast);
    setTimeout(() => {
      apiErrorToast.style.opacity = 0;
    }, 2300);
    setTimeout(() => {
      document.querySelector('section').removeChild(apiErrorToast);
    }, 2500);
  }, 10);
}

export default ShowToast;