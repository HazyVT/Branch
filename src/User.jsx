import { useParams } from "react-router-dom"
import { supabase } from "./SupaClient";
import { useEffect, useState } from "react";
import {Box, Text, Spinner, Avatar, Input} from '@chakra-ui/react'

export function User() {
  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState('');
  const [ timeStudied, setTimeStudied ] = useState('');
  const [ favSubject, setFavSubject ] = useState('');
  const [ loading, setLoading ] = useState(true);
  
  let params = useParams();

  async function getUserData() {
    await supabase.from('profiles').select().eq('full_name', params.username).then((response) => {
      if (response.data != null) {
        const data = response.data[0];
        console.log(data);
        setName(data.full_name);
      }

      setLoading(false);
    })
  }

  useEffect(() => {
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
      <>
        <div className="container">
          <Box display={loading ? 'none' : 'flex'} justifyContent='center'>
            <Box padding={4}>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Avatar size='lg' src={pic}/>
                <Text fontWeight={800} fontSize='24pt'>{name}</Text>
              </Box>
              <Box marginTop={4}>
                <Text>Joined at: {joined}</Text>
                <Text>Study Time: {timeStudied}</Text>
                <Text>Favorite Subject: {favSubject}</Text>
              </Box>
            </Box>
          </Box>
          <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
            <Spinner/>
          </Box>
        </div>
      </>
  )
}