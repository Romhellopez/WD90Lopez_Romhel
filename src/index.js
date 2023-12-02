import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login,Navbar, Register,Record } from './components';
import Footer from './components/Footer';
import ProfileBox from './components/ProfileBox';
import MovieList from './components/MovieList';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/navbar' element={<Navbar/>}/>     
      <Route path='/movieList' element={<MovieList/>}/>
      <Route path='/profileBox' element={<ProfileBox/>}/>
      <Route path='/record' element={<Record/>}/>
      <Route path='/footer' element={<Footer/>}/>
    </Routes>
    </Router>,
document.getElementById("root")
);
reportWebVitals();