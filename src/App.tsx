import { Box, Spinner } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import User from "./models/User";
import { supabase } from "./models/Client";

function App() {

  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    const getUser = async () => {
      const { data, error } = await supabase.auth.refreshSession();
      if (error == null) {
        if (data.user != undefined) {
          setUser(new User(data.user.id, data.user.user_metadata.username, data.user.user_metadata.image, ''));
        }
      } else {
        console.error(error);
          setLoading(false);
      }
    }
    
    getUser();
  }, [])

  return ( 
    <Box>
      {loading ? 
        <Box display='flex' w='100vw' h='100vh' justifyContent='center' alignItems='center'>
          <Spinner size='xl' thickness="4px" emptyColor="gray.200" color='red.300'/>
        </Box> 
      : 
        <Box marginTop={24}>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home user={user} />} />
            </Routes>
          </Router>
        </Box>
      }
    </Box>  
  )
}

export default App
