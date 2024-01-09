import { Box, Spinner } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navigation/Navbar";
import User from "./models/User";
import { useEffect, useState } from "react";
import { supabase } from "./models/Client";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {

  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState<User | null>(null);

  const getUserFromSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error == null && data.user != null && data.user.email != undefined) {
      setUser(new User(data.user.id, data.user.user_metadata.username, data.user.user_metadata.image, data.user.email, data.user.created_at));
      setLoading(false);
    } else {
      console.error(error);
      setUser(null);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getUserFromSession();
  }, [])

  return (
    <>
      {!loading ? 
        <Box userSelect={'none'}>
          <Router>
            <Navbar user={user}/>
            <Routes>
              <Route path='/' element={<Home  user={user}/>} />
              <Route path='/account' element={<Account user={user} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </Router>
        </Box>
      :
        <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
          <Spinner size='xl' thickness="4px" emptyColor="gray.200" color='red.300'/>
        </Box>
      }
    </>
  )
}