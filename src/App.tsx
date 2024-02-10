import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Box w='100vw' h='100vh' bgColor='background.main' color='text.main' padding={12}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
        </Box>
    )
}

export default App;