import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardList from './board/page/BoardList';

function Routing() {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BoardList />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default Routing;