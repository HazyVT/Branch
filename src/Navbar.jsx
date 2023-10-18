import { Link } from "react-router-dom";
import { supabase, signInWithDiscord} from "./SupaClient";
import { Box } from "@mui/material";

export default function Navbar({session}) {

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    window.location.href="http://localhost:5174/"
  }

  return (
    <div className="navbar">
      <Link to={'/'} className="home">Branch</Link>
      <Link className="profile" to={session ? '/account' : ''} onClick={session ? () => {window.location.href='http://localhost:5174/account'} : () => {signInWithDiscord()}}>{session ? <img className="pfp" src={session.user.user_metadata.avatar_url} /> : 'Login'}</Link>
      <Box display={session ? 'flex' : 'none'}>
        <Link onClick={signOut}>Sign Out</Link>
      </Box>
    </div>
  )
}