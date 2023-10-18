import { Link } from "react-router-dom";
import { supabase, signInWithDiscord} from "./SupaClient";
import { Box } from "@chakra-ui/react";
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai'
import { PiSignOutFill } from 'react-icons/pi'

export default function Navbar({session}) {

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    window.location.href="http://localhost:5174/"
  }

  return (
    <div className='navbar-container'>
      <div className="navbar">
        <Link to={'/'} className="home">Branch</Link>
        <Link className="profile" to={session ? '/account' : ''} onClick={session ? () => {console.log('auth')} : () => {signInWithDiscord()}}>{session ? <img className="pfp" src={session.user.user_metadata.avatar_url} /> : 'Login'}</Link>
        <Box display={session ? 'flex' : 'none'}>
          <Link onClick={signOut}>Sign Out</Link>
        </Box>
      </div>
    </div>
    
  )
}