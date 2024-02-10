import { Box, Spinner } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import Login from "./pages/Login";
import { getUser } from "./models/supabase";

function App() {

    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        getUser().then((response) => {
            if (response != undefined && response.user != undefined && response.user.email != undefined) {
                setUser(new User(response.user.user_metadata.full_name, response.user.id, response.user.email, response.user.user_metadata.avatar_url));
                setLoading(false);
            }
        })
    }, [])

    return (
        <Box>
            {loading === false ? 
                <Box w='100vw' h='100vh' bgColor='background.main' color='text.main' padding={12}>
                    <Router>
                        <Navbar user={user}/>
                        <Routes>
                            <Route path='/' element={<Home user={user}/>} />
                            <Route path='/login' element={<Login />} />
                        </Routes>
                    </Router>
                </Box>
            :
                <Box display='flex' justifyContent='center' w='100vw' h='100vh' alignItems='center'>
                    <Spinner w={24} h={24} thickness="4px" color='secondary.400' emptyColor="gray.200"/>
                </Box>
            }
        </Box>
        
    )
}

export default App;