import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Userdetail from './Userdetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userdetail" element={<Userdetail />} />
      </Routes>
    </Router>
  );
}

export default App;
