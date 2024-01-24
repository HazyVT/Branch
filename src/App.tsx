import { Box } from "@chakra-ui/layout";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useMediaQuery } from '@chakra-ui/react';
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { supabase } from "./components/Client";
import User from "./models/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/navigation/Navbar";
import InApp from "./pages/InApp";

function App() {

  const [onDesktop]  = useMediaQuery('(min-width: 600px)');
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then((response) => {
      const data = response.data.session?.user;
      if (data != undefined) {
        setUser(new User(data?.id, data?.user_metadata.username, data?.user_metadata.image));
      }
    })
  }, [])

  return (
    <Box w='100vw' h='100vh' userSelect='none'>
      {user === null ?
      <Router>
        <Navbar onDesktop={onDesktop}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      :
        <InApp user={user} />
      }
      
      </Box>
  )
}

export default App
