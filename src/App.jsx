import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import Auth from './components/Auth';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';


function App() {
  const [count, setCount] = useState(0)
  const [ arr, setArr ] = useState([]);

  return (
    <Box>
      <Router>
        <Box padding={4}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </Box>
      </Router>
    </Box>
  )
}

export default App
