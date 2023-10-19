/* eslint-disable react/prop-types */
import { Box, Text, Image, Input, Button } from "@chakra-ui/react";
import { supabase } from "./SupaClient";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function Room({session}) {
  const [ status, setStatus ] = useState('');
  const [ msgArray ] = useState([]);
  const [ showChat, setShowChat ] = useState(true);
  const [ showMusic, setShowMusic ] = useState(false);
  const inputRef = useRef();
  const msgBoxRef = useRef();
  var count = 0;

  // Get room key
  let params = useParams();

  // Set room as ref
  let room = useRef();

  useEffect(() => {
    // Set room into ref
    room.current = supabase.channel(params.roomkey, {config: {broadcast: {self: true}}}).subscribe((status) => {
      setStatus(status);
    });

    // Log when message is recieved
    room.current.on('broadcast', {event: 'test'}, (payload) => showMessage(payload));

  }, [])

  function scrollToBottom() {
    window.setTimeout(() => {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }, 200);
  }

  // Function to show messages
  function showMessage(payload) {
    let data = payload.payload;
    let tc = data.dt;
    let dn = new Date(tc).toLocaleString();
    let date = dn.substring(0,10);
    let time = dn.substring(12,)
    msgArray.push(
      <Box key={count}  display='flex' padding='10pt' justifyContent={'space-between'}>
        <Box display='flex'>
          <Image src={data.sender_avatar} borderRadius='50%' w='40pt' h='40pt' />
          <Box display='flex' flexDir='column' marginLeft='20pt'>
            <Text fontWeight='800'>{data.sender_name}</Text>
            <Text>{data.message}</Text>
          </Box>
        </Box>
        <Box>
          <Text>{date}</Text>
          <Text>{time}</Text>
        </Box>
      </Box>
    );
    count = count + 1;
    scrollToBottom();
  }

  // Function to send messages to channel
  function sendMessage() {
      if (status !== 'SUBSCRIBED') {return}
      room.current.send({
        type: 'broadcast',
        event: 'test',
        payload: { 
          sender_id: session.user.id, 
          sender_avatar: session.user.user_metadata.avatar_url, 
          sender_name: session.user.user_metadata.full_name, 
          message: inputRef.current.value,
          dt: new Date()
        },
      })
    }

    function handleKeyPress(e) {
      let key = e.key;
      if (key == "Enter") {
        sendMessage();
        inputRef.current.value = "";
      }
    }

    function toggleChat() {
      setShowChat(true);
      setShowMusic(false);
    }
  
    function toggleMusic() {
      setShowChat(false);
      setShowMusic(true);
    }

  
  return (
    <Box display='flex' flexDir='column' alignItems='center' marginTop='20pt' >
      <Box marginBottom='20pt' w='200pt' display='flex' justifyContent='space-around'>
        <Button colorScheme="purple" onClick={toggleChat}>Chat</Button>
        <Button colorScheme="purple" onClick={toggleMusic}>Music</Button>
        <Button colorScheme="purple">Notes</Button>
      </Box>
      <Box id='chat' w={'400pt'} height='550pt' backgroundColor='#242424' boxShadow='0px 0px 40px black' pos='relative' borderRadius='20px' display={showChat ? 'block' : 'none'}>
        <Box overflowY='scroll' maxHeight='500pt' ref={msgBoxRef}>
          {msgArray}
        </Box>
        <Input ref={inputRef} placeholder='' w='350pt' onKeyPress={handleKeyPress} pos='absolute' bottom='5' left='25pt' backgroundColor='#323232' border='none'/>
      </Box>
    </Box>
  )
}