import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Messenger from './components/Messenger';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { useState } from "react";

function App() {
  const options : Array<string> = [
    'Intellectual Conversation',
    'Theraputic Conversation',
    'Reflective Conversation',
    'Problem-solving Conversation',
    'Open-ended Conversation'
  ];
  const [option, setOption] = useState(options[0]);

  return (
    <BrowserRouter>
       <Routes>

        <Route path="/" element={<Home option={option} setOption={setOption} options={options} />} />

        <Route path="/chat" element={<Messenger option={option} setOption={setOption} options={options} />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
