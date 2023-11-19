import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import Auth from './components/Auth';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Editor from './components/Editor';


function App() {
  const [count, setCount] = useState(0)
  const [ arr, setArr ] = useState([]);

  return (
    <Box>
      <Router>
        <Box>
          <Routes>
            <Route path='/' element={<Editor />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Box>
      </Router>
    </Box>
  )
}

export default App
