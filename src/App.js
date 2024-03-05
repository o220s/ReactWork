
import { BrowserRouter, Routes, Route, Link } from'react-router-dom';
import Home from './component/Home';
import openholy from './asset/open-holy.jpeg';
import Bbslist from './bbs/Bbslist';
import Bbswrite from './bbs/Bbswrite';
import Login from './member/Login';
import Bbsdetail from './bbs/Bbsdetail';
import Regi from './member/Regi';
import Bbsupdate from './bbs/Bbsupdate';
import Bbsanswer from './bbs/Bbsanswer';
import Pdslist from './pds/Pdslist';
import Pdswrite from './pds/Pdswrite';
import Pdsdetail from './pds/Pdsdetail';
import Imageview from './component/Imageview';
import Calendar from './component/Calendar';
import Summernote from './component/Summernote';


function App() {
  return (
    <div>
      <header className='py-4'>
        <div className='container text-center'>
          <img src={openholy} width='960' height='150' alt="no" />
        </div>
      </header>

      <BrowserRouter>

      <nav className='navbar navbar-expand-md navbar-dark bg-info sticky-top'>
        <div className='container'>
          <div className="collapse navbar-collapse" id="navbar-content">
            <ul className="navbar-nav mr-auto">

              <li className='nav-item'>
                <Link className='nav-link' to="/">Home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/bbslist">게시판</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/pdslist">자료실</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/imageview">이미지미리보기</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/calendar">fullcalendar</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to="/summernote">summernote</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      <main>
      <div className='py-4'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>}/>

            <Route path='/bbslist' element={<Bbslist/>}/>
            <Route path='/bbswrite' element={<Bbswrite/>}/>
            <Route path='/bbsdetail/:seq' element={<Bbsdetail/>}/>
            <Route path='/bbsupdate/:seq' element={<Bbsupdate/>}/>
            <Route path='/bbsanswer/:seq' element={<Bbsanswer/>}/>

            <Route path='/pdslist' element={<Pdslist/>}/>
            <Route path='/pdswrite' element={<Pdswrite/>}/>
            <Route path='/pdsdetail/:seq' element={<Pdsdetail/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route path='/regi' element={<Regi/>}/>

            <Route path='/imageview' element={<Imageview/>}/>
            <Route path='/calendar' element={<Calendar/>}/>
            <Route path='/summernote' element={<Summernote/>}/>
      
          </Routes>

      </div>
        </div>
      </main>

      </BrowserRouter>
      <footer className="py-4 bg-info text-light">
        <div className="container text-center">
          <ul className="nav justify-content-center mb-3">

            <li className='nav-item'>
              <a className='nav-link' href='/'>Top</a>
            </li>

          </ul>
          <p>
            <small>Copyright &copy;Graphic Arts</small>
          </p>
        </div>  
      </footer>
    </div>
  );
}

export default App;
