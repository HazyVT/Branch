import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Account({session}) {

  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ loading, setLoading ]  = useState(true);


  useEffect(() => {
    if (loading) {
      setPic(session.user.user_metadata.avatar_url);
      let string = session.user.user_metadata.full_name
      let nn = string.charAt(0).toUpperCase() + string.slice(1);
      setName(nn);
      setLoading(false);
    }
  }, [loading, session.user])
  



  return (
    <div className="container">
      <Box className="account-container" display={loading ? 'none' : 'flex'}>
        <img src={pic} />
        <h1>{name}</h1>
      </Box>
      <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
        <Spinner />
      </Box>
    </div>
  )
}