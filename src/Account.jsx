/* eslint-disable react/prop-types */
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./SupaClient";

export default function Account({session}) {

  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState('');
  const [ timeStudied, setTimeStudied ] = useState('');
  const [ loading, setLoading ]  = useState(true);

  async function getData() {
    await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .then((res) => {
          let string = res.data[0].full_name;
          let nn = string.charAt(0).toUpperCase() + string.slice(1);
          let tc = res.data[0].time_created;
          let date = tc.substr(0, 10);
          let joined = new Date(date).toLocaleString().substring(0, 10);
          console.log(joined);
          setPic(res.data[0].avatar_url);
          setName(nn);
          setJoined(joined);
          setTimeStudied(res.data[0].time_spent_studying);
    });
  }

  useEffect(() => {
    if (loading == true) {
      getData();
      setLoading(false);
    }
  }, [loading, session.user])
  



  return (
    <div className="container">
      <Box display={loading ? 'none' : 'block'} className="account-container">
        <Box display={'flex'} alignItems={'center'}> 
          <img src={pic} />
          <h1>{name}</h1>
        </Box>
        <Text marginTop='5pt' display={loading ? 'none' : 'block'}>Joined at: {joined}</Text>
        <Text display={loading ? 'none' : 'block'}>Time spent studying: {timeStudied}</Text>
      </Box>
      <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
        <Spinner />
      </Box>
    </div>
  )
}