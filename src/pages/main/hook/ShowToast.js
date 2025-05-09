import { createRoot } from 'react-dom/client'
import Toast from "../../../components/Toast";

function ShowToast(type, msg) {
  setTimeout(() => {
    const container = document.createElement('div')
    container.classList.add('no-box')
    document.querySelector('section').appendChild(container);

    const root = createRoot(container)
    root.render(<Toast type={type} msg={msg} />)

    setTimeout(() => {
      container.style.opacity = 0;
    }, 2300);
    setTimeout(() => {
      document.querySelector('section').removeChild(container);
      root.unmount()
    }, 2500);
  }, 10);
}

export default ShowToast;