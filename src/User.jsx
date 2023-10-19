import { useParams } from "react-router-dom"
import { supabase } from "./SupaClient";
import { useEffect, useState } from "react";
import { Box, Text, Spinner } from '@chakra-ui/react'

export function User() {
  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState('');
  const [ timeStudied, setTimeStudied ] = useState('');
  const [ favSubject, setFavSubject ] = useState('');
  const [ loading, setLoading ] = useState(true);
  
  let params = useParams();

  async function getUserData() {
    await supabase
    .from('profiles')
    .select()
    .eq('full_name', params.username)
    .then((response) => {
      let user = response.data[0];
      console.log(user);
      setPic(user.avatar_url);
      setName(user.full_name);
      let tc = user.time_created;
      let date = tc.substr(0, 10);
      let jnd = new Date(date).toLocaleString().substring(0, 10);
      setJoined(jnd);
      setTimeStudied(user.time_spent_studying);
      setFavSubject(user.favorite_subject);
      setLoading(false);
    })
  }

  useEffect(() => {
    getUserData();
  }, [])
  
  return (
    <>
      <div className="container">
      <Box display={loading ? 'none' : 'block'} className="account-container">
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}> 
          <img src={pic} />
          <h1>{name}</h1>
        </Box>
        <Text marginTop='15pt' display={loading ? 'none' : 'block'}>Joined at: {joined}</Text>
        <Text display={loading ? 'none' : 'block'}>Time spent studying: {timeStudied}</Text>
        <Text display={loading ? 'none' : 'block'}>Favorite subject: {favSubject}</Text>
      </Box>
      <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
        <Spinner />
      </Box>
    </div>
    </>
  )
}