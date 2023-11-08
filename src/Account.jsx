/* eslint-disable react/prop-types */
import { Box, Spinner, Text, Input, Avatar, useToast } from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import { supabase } from "./SupaClient";

export function Account() {

  const [ session, setSession ] = useState(null);
  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState('');
  const [ timeStudied, setTimeStudied ] = useState('');
  const [ favSubject, setFavSubject ] = useState('');
  const [ loading, setLoading ]  = useState(true);
  const favsubref = useRef();
  const toast = useToast();

  async function getData() {
    // Get session and user metadata
    let id;
    await supabase.auth.getSession().then((response) => {
      // Check if response has been gotten
      if (response.data.session != null) {
        const session = response.data.session;
        setSession(session);
        id = session.user.id;
        setName(session.user.user_metadata.full_name)
        setPic(session.user.user_metadata.avatar_url);

        // Get data that cant be gotten from user metadata
        supabase.from('profiles').select().eq('id', id).then((response) => {
        // If user has been found
          if (response.data.length > 0) {
            const data = response.data[0];

            // Get joined date
            const date = new Date(data.time_created);
            setJoined(date.toUTCString()); 

            // Get time spent studying
            const minutes = Math.floor(data.time_spent_studying / 60);
            const seconds = data.time_spent_studying - minutes * 60;
            const hours = Math.floor(data.time_spent_studying / 3600);
            setTimeStudied("Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds)
            setFavSubject(data.favorite_subject);
            setLoading(false);
          }
        })
      }
    })
  }

  const handleUpdate = async (e) => {
    if (e.key === "Enter") {
      const { data, error } = await supabase.from('profiles').update({favorite_subject: favsubref.current.value}).eq('id', session.user.id).then(() => {
        toast({
          title: "Favorite subject updated",
          description: "Your favorite subject has been updated",
          duration: 5000,
          isClosable: true,
          status: "success"
        })
      });
    }
  }

  useEffect(() => {
    getData();
  }, [])
  



  return (
    <div className="container">
      <Box display={loading ? 'none' : 'flex'} justifyContent='center'>
        <Box padding={4}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Avatar size='lg' src={pic} />
            <Text fontWeight={800} fontSize='24pt'>{name}</Text>
          </Box>
          <Box marginTop={4}>
            <Text>Joined at: {joined}</Text>
            <Text>Study Time: {timeStudied}</Text>
          </Box>
          <Input ref={favsubref} variant='filled' boxShadow={'0px 0px 4px'} defaultValue={favSubject} placeholder='Favorite Subject' marginTop={4} onKeyPress={handleUpdate}/>
        </Box>
      </Box>
      <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
        <Spinner />
      </Box>
    </div>
  )
}