import { Avatar, Box, Button, Icon, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { FaHome, FaSearch, FaBook, FaSun, FaMoon} from "react-icons/fa";


export default function Navigation() {

    const { colorMode, toggleColorMode } = useColorMode();
    const [ active, setActive ] = useState("home");
    
    return (
        <Box w='100vw' h='10vh' boxShadow={'0px -4px 12px rgba(0,0,0,0.1)'} pos='fixed' bottom='0' left='0' display='flex' justifyContent='space-between' alignItems='center' padding={8}>
            <Icon onClick={() => {setActive("home")}} color={active === "home" ? 'red.300' : ''} as={FaHome} w={6} h={6} />
            <Icon onClick={() => {setActive("search")}} color={active === "search" ? 'red.300' : ''} as={FaSearch} w={5} h={5}/>
            <Icon onClick={() => {setActive("book")}} color={active === "book" ? 'red.300' : ''} as={FaBook} w={5} h={5} />
            <Icon as={colorMode === "light" ? FaMoon : FaSun} onClick={toggleColorMode} w={5} h={5} />
        </Box>
    )
}