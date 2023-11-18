import { Avatar, Box, Button, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaBook, FaChevronDown } from 'react-icons/fa'
import { auth } from "./Client";
import { onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [ user, setUser ] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    // Check for current user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
    });
  }, [])

  const logout = async () => {
    await auth.signOut().then(() => {
      setUser(null);
      nav('/');
    });
  }

  return (
    <Box display='flex' justifyContent='center' >
      <Box display='flex' justifyContent='space-between' padding={4} alignItems='center' w='50vw' h='40pt' bgColor='white' position='fixed' top='0' borderBottomRightRadius={'20px'} borderBottomLeftRadius={'20px'} boxShadow='0px 4px 4px rgba(0,0,0,0.25)'>
        <Icon onClick={() => {nav('/')}} cursor={"pointer"} as={FaBook} w={6} h={6}/>
        <Box display='flex' w='20%' justifyContent={'space-between'} alignItems='center'>
          <Link to='/auth'><Text display={user === null ? 'block' : 'none'}>Login</Text></Link>
          <Box display={user === null ? 'none' : 'block'}>
            <Menu placement="bottom">
              <MenuButton variant='unstyled' as={IconButton} icon={<FaChevronDown />} ></MenuButton>
              <MenuList display='flex' flexDir='column' alignItems='center'>
                <Avatar w={8} h={8} margin={2}/>
                <Link to='/profile' style={{width: '100%'}}><MenuItem>Profile</MenuItem></Link>
                <MenuItem onClick={() => {logout()}}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Box>  
    </Box>
    
  )
}