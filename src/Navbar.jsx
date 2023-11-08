import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Heading, Icon, Menu, MenuButton, MenuItem, MenuList, Input, InputGroup, InputLeftElement, useMediaQuery } from "@chakra-ui/react";
import { BsBookFill } from 'react-icons/bs';
import { RiSearch2Fill } from 'react-icons/ri'
import { signInWithDiscord, supabase } from './SupaClient';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  
  const [ avatar, setAvatar ] = useState('');
  const [ session, setSession ] = useState(null);
  const usernameref = useRef();
  const nav = useNavigate();

  useEffect(() => {
    // Get user session
    supabase.auth.getSession().then((response) => {
      if (response.data.session != null) {
        const session = response.data.session;
        setSession(session);
        setAvatar(session.user.user_metadata.avatar_url);
      }
    })
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    nav('/');
    window.location.reload()
  }

  const handleSearch = async (e) => {
    // On enter press
    if (e.key == "Enter") {
      // Check if user exisrs in profiles
      await supabase.from('profiles').select().eq('full_name', usernameref.current.value).then((response) => {
        if (response.error == null && response.data.length > 0) {
          // A match has been found
          nav('/user/'+response.data[0].full_name);
        }
      })
    }
  }

  return (
    <>
      <Box display='flex' justifyContent='space-between' padding={6}>
        <Link to='/'>
        <Box display='flex' alignItems='center'>
          <Icon as={BsBookFill} w={6} h={6} marginRight={2}/>
          <Heading size='lg'>Branch</Heading>
        </Box>
        </Link>
        <InputGroup w='300pt'>
          <InputLeftElement>
            <RiSearch2Fill />
          </InputLeftElement>
          <Input ref={usernameref} boxShadow={'0px 0px 4px black'} variant='filled' type='text' placeholder='User Search' onKeyPress={handleSearch}/>
        </InputGroup>
        <Box display={session ? 'none' : 'flex'} cursor='pointer' onClick={signInWithDiscord}>
          Login
        </Box>
        <Box display={session ? 'flex' : 'none'}>
          <Menu>
            <MenuButton>
              <Avatar size='sm' src={avatar}/>
            </MenuButton>
            <MenuList>
              <Link to='/account'><MenuItem>Profile</MenuItem></Link>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  )
}

Navbar.propTypes = {
  session: PropTypes.object
}