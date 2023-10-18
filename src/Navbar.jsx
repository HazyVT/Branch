/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { supabase, signInWithDiscord } from "./SupaClient";
import { Box, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { AiOutlineSearch } from 'react-icons/ai';

export default function Navbar({session}) {

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href="http://localhost:5174/"
  }

  return (
    <div className='navbar-container'>
      <div className="navbar">
        <Link to={'/'} className="home">Branch</Link>
        <Box>
          <InputGroup>
            <InputLeftElement><Icon as={AiOutlineSearch} color='gray.500' /></InputLeftElement>
            <Input w={'200pt'} placeholder='username' backgroundColor='white' color='black'/>
          </InputGroup>
        </Box>
        <Link className="profile" to={session ? '/account' : ''} onClick={session ? () => {console.log('auth')} : () => {signInWithDiscord()}}>{session ? <img className="pfp" src={session.user.user_metadata.avatar_url} /> : 'Login'}</Link>
        <Box display={session ? 'flex' : 'none'}>
          <Link onClick={signOut}>Sign Out</Link>
        </Box>
      </div>
    </div>
    
  )
}