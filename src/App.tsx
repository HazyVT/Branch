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
import CollectionPage from "./pages/CollectionPage";
import Collection from "./models/Collection";

export default function App() {

  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState<User | null>(null);
  const [ collection, setCollection ] = useState(new Map());

  const getUserFromSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error == null && data.user != null && data.user.email != undefined) {
      setUser(new User(data.user.id, data.user.user_metadata.username, data.user.user_metadata.image, data.user.email, data.user.created_at));
      getUserCollections(data.user.id);
    } else {
      console.error(error);
      setUser(null);
      setLoading(false);
    }
  }

  const getUserCollections = async (id: string) => {
    const { data, error } = await supabase.from('branch_collection').select().eq('user_id', id);
    if (error == null) {
      const temp_map = new Map<string, Collection>();
      data.forEach((coll) => {
        const temp_coll = new Collection(coll.title, coll.data, coll.created_at);
        temp_map.set(coll.id.toString(), temp_coll);
      })
      setCollection(temp_map);
      setLoading(false);
    } else {
      console.error(error);
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
              <Route path='/collection' element={<CollectionPage collection={collection}/>} />
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