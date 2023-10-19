/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { supabase, signInWithDiscord } from "./SupaClient";
import { Box, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { AiOutlineSearch } from 'react-icons/ai';
import { useRef } from "react";

export default function Navbar({session}) {

  const inputRef = useRef();

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href="http://localhost:5174/"
  }

  async function userSearch(e) {
    if (e.key == "Enter") {
      await supabase
      .from('profiles')
      .select('full_name')
      .eq('full_name', inputRef.current.value).then((response) => {
        if (response.data.length > 0) {
          window.location.href = 'http://localhost:5174/user/' + response.data[0].full_name;
        }
      })
    }
  }

  return (
    <div className='navbar-container'>
      <div className="navbar">
        <Link to={'/'} className="home">Branch</Link>
        <Box>
          <InputGroup>
            <InputLeftElement><Icon as={AiOutlineSearch} color='gray.500' /></InputLeftElement>
            <Input ref={inputRef} w={'200pt'} placeholder='username' backgroundColor='white' color='black' onKeyPress={userSearch}/>
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