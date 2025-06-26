import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import MediaLibraryLayout from './pages/media-library/layout';
import MediaLibraryHome from './pages/media-library/home';
import './global.css'


let root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/media-library' element={<MediaLibraryLayout />}>
        <Route index element={<Navigate to={'/media-library/home'} />} />
        <Route path='home' element={<MediaLibraryHome />} />
      </Route>
    </Routes>
  </BrowserRouter>
);