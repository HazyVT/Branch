/* eslint-disable react/prop-types */
import { Box, Spinner, Text, Input, InputGroup, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./SupaClient";

export function Account({session}) {

  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState('');
  const [ timeStudied, setTimeStudied ] = useState('');
  const toast = useToast();
  const [ favSubject, setFavSubject ] = useState('Enter Subject');
  const [ loading, setLoading ]  = useState(true);

  async function getData() {
    await supabase
    .from('profiles')
    .select()
    .eq('full_name', session.user.user_metadata.full_name)
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
      if (user.favorite_subject != null) {
        setFavSubject(user.favorite_subject);
      }
      setLoading(false);
    })
  }

  async function setFavoriteSubject(subject) {
    await supabase
    .from('profiles')
    .update({favorite_subject: subject})
    .eq('id', session.user.id).then(() => {
      toast({
        title: 'Information updated',
        description: 'User information has been updated',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    })
  }

  function handleKeyPress(e) {
    let key = e.key;
    if (key == "Enter") {
      if (e.target.value != "") {
        setFavoriteSubject(e.target.value);
      } else {
        toast({
          title: 'Incorrect input',
          description: 'Input has been left blank',
          status: 'error',
          duration: 2000,
          isClosable: true
        })
      }
    }
  }

  useEffect(() => {
    getData();
  }, [])
  



  return (
    <div className="container">
      <Box display={loading ? 'none' : 'block'} className="account-container">
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}> 
          <img src={pic} />
          <h1>{name}</h1>
        </Box>
        <Text marginTop='15pt' display={loading ? 'none' : 'block'}>Joined at: {joined}</Text>
        <Text display={loading ? 'none' : 'block'}>Time spent studying: {timeStudied}</Text>
        <InputGroup marginTop='15pt' display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
          <Text>Favorite Subject: </Text>
          <Input variant='flushed' placeholder={favSubject} w={'120pt'} onKeyPress={handleKeyPress}/>
        </InputGroup>
      </Box>
      <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
        <Spinner />
      </Box>
    </div>
  )
}