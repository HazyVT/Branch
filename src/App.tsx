import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navigation/Navbar";
import User from "./models/User";
import { useEffect, useState } from "react";
import { supabase } from "./components/Client";
import Account from "./pages/Account";
import Login from "./pages/Login";

export default function App() {

  const [ user, setUser ] = useState<User | null>(null);

  const getUserFromSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error == null && data.user != null) {
      setUser(new User(data.user.id, '', ''));
    } else {
      console.error(error);
      setUser(null);
    }
  }
  
  useEffect(() => {
    getUserFromSession();
  }, [])

  return (
    <Box userSelect={'none'}>
      <Router>
        <Navbar user={user}/>
        <Routes>
          <Route path='/' element={<Home  user={user}/>} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </Box>
  )
}