import { Box } from "@chakra-ui/layout";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from "./components/navigation/Navbar";
import { Spinner, useMediaQuery } from '@chakra-ui/react'
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { supabase } from "./components/Client";
import User from "./models/User";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const [onDesktop]  = useMediaQuery('(min-width: 600px)');
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const data = response.data.session?.user;
      if (data != undefined) {
        setUser(new User(data?.id, data?.user_metadata.username, data?.user_metadata.image));
        setLoading(false);
      } else {
        setLoading(false);
      }
    })
  }, [])

  return (
    <Box padding={12} w='100vw' h='100vh'>
      {loading ? 
        <Box w='100vw' h='90vh' display='flex' justifyContent='center' alignItems='center'>
          <Spinner w='64px' h='64px' color='red.300' thickness="4px" emptyColor="gray.200"/>
        </Box>
      :
      <Router>
        <Navbar onDesktop={onDesktop} user={user}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      }
      
      </Box>
  )
}

export default App
