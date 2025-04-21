import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Main = lazy(() => import('./main/page/Main'));
const Search = lazy(() => import('./search/page/Search'));
const Shorts = lazy(() => import('./shorts/page/Shorts'));

function Routing() {

  let AudioContext;
  let audioContext;

  window.onload = function () {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    })
  }

  return (
    <section>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/search/' element={<Search />} />
            <Route path='/shorts/' element={<Shorts />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </section>
  );
}

export default Routing;