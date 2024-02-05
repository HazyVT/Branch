import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home';
import Navigation from './components/Navigation';

function App() {

  return (
    <>
      <Box w='100vw' h='100vh' padding={'2rem'} userSelect={"none"}>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </Box>
    </>
  )
}

export default App
