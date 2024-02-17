import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import NoteState from './context/notes/NoteState';
import Alart from './components/Alart';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {

  const [alart, setAlart] = useState(null)
  const showAlart = (message, type) => {
    setAlart({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlart(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alart alart={alart} />
          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home showAlart={showAlart} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlart={showAlart} />}></Route>
              <Route exact path="/signup" element={<Signup showAlart={showAlart} />}></Route>
            </Routes>
          </div>
        </Router>

      </NoteState>
    </>
  )
}

