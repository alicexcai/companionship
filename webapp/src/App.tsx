import { BrowserRouter, Routes, Route } from "react-router-dom";

import Messenger from './components/Messenger';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { useState } from "react";

const options : Array<string> = [
  'Intellectual Conversation',
  'Theraputic Conversation',
  'Reflective Conversation',
  'Problem-solving Conversation',
  'Open-ended Conversation'
];

function App() {
  const [option, setOption] = useState(options[0]);

  return (
    <BrowserRouter>
       <Routes>

        <Route path="/" element={<Home setOption={setOption} options={options} />} />

        <Route path="/chat" element={<Messenger option={option} setOption={setOption} options={options} />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
