import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../assets/styles/main/App.css';
import App from '../App';

function Routing() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;