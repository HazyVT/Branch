/* eslint-disable react/prop-types */
import { Box, Text, Image, Input, Button, useToast } from "@chakra-ui/react";
import { getSession, supabase } from "./SupaClient";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as Filter from 'bad-words';
import { Editor } from "@monaco-editor/react";

var filter = new Filter();
filter.addWords('bullshit', 'shitcreek', 'zipperhead', 'wetback', 'cocktease', 'niglet', 'niga', 'bitchass', 'poofter')

export function Room() {
  const [ status, setStatus ] = useState('');
  const [ msgArray ] = useState([]);
  const [ showChat, setShowChat ] = useState(true);
  const [ showMusic, setShowMusic ] = useState(false);
  const [ showNotes, setShowNotes ] = useState(false);
  const [ defval, setDefval ] = useState('Take notes here in markdown...');
  const [ session, setSession ] = useState(null);
  const inputRef = useRef();
  const msgBoxRef = useRef();
  const notesRef = useRef();
  const toast = useToast();
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

    // Get notes from database
    getNotes();

  }, [])

  function scrollToBottom() {
    window.setTimeout(() => {
      msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
    }, 200);
  }

  async function getNotes() {
    const {data, error} = await supabase.auth.refreshSession();
    const { user, session } = data;
    await supabase.from('notes').select('note').eq('id', user.id).then((response) => {
      if (response.data.length > 0) {
        let n = response.data[0].note;
        notesRef.current.setValue(n);
        toast({
          title: "Notes Loaded",
          description: "Your notes have been loaded",
          "status": "success",
          duration: 2000,
          isClosable: true
        })
      }
    })
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
          message: filter.clean(inputRef.current.value),
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
      setShowNotes(false);
    }
  
    function toggleMusic() {
      setShowChat(false);
      setShowNotes(false);
      setShowMusic(true);
    }

    function toggleNotes() {
      setShowChat(false);
      setShowMusic(false);
      setShowNotes(true);
    }

    function handleEditorMount(editor, monaco) {
      notesRef.current = editor;
    }

    async function handleEditorSave() {
      console.log("Saving...");
      let note = notesRef.current.getValue();

      const {data, error} = await supabase.auth.refreshSession();
      const { user, session } = data;

      supabase
      .from('notes')
      .select('id')
      .eq('id', user.id).then((response) => {
        let data = response.data;
        if (data.length == 0) {
          supabase.from('notes').insert({id: session.user.id, note: note}).then(() => {toast({title: 'Notes saved', description: 'The notes have been saved.', status: "success", duration: 2000, isClosable: true})})
          return;
        } else if (data.length == 1) {
          supabase.from('notes').update({note: note}).eq('id', session.user.id).then(() => {toast({title: 'Notes saved', description: 'The notes have been saved.', status: "success", duration: 2000, isClosable: true})})
          return;
        }
      })
    }

  
  return (
    <Box display='flex' flexDir='column' alignItems='center' marginTop='20pt' >
      <Box marginBottom='20pt' w='200pt' display='flex' justifyContent='space-around'>
        <Button colorScheme="purple" onClick={toggleChat}>Chat</Button>
        <Button colorScheme="purple" onClick={toggleMusic}>Music</Button>
        <Button colorScheme="purple" onClick={toggleNotes}>Notes</Button>
      </Box>
      <Box id='chat' w={'400pt'} height='550pt' backgroundColor='#242424' boxShadow='0px 0px 40px black' pos='relative' borderRadius='20px' display={showChat ? 'block' : 'none'}>
        <Box overflowY='scroll' maxHeight='480pt' ref={msgBoxRef}>
          {msgArray}
        </Box>
        <Input ref={inputRef} autoFocus placeholder='' w='350pt' onKeyPress={handleKeyPress} pos='absolute' bottom='5' left='25pt' backgroundColor='#323232' border='none'/>
      </Box>
      <Box id='music' display={showMusic ? 'block' : 'none'} w='400pt' height='550pt' backgroundColor='#242424' boxShadow='0px 0px 40px black' borderRadius='20px'>
        <Box display='flex' flexDir='column' alignItems='center' marginTop='20pt'>
          {/*
          <iframe className="video" src='https://www.youtube.com/embed/jfKfPfyJRdk' />
          <iframe className='video' src='https://www.youtube.com/embed/M48IEH2cYgA' />
          <iframe className="video" src='https://www.youtube.com/embed/4xDzrJKXOOY' />
          <iframe className="video" src='https://www.youtube.com/embed/xl0NMRAnqbA' />
          */}
        </Box>
      </Box>
      <Box id='notes' display={showNotes ? 'block' : 'none'} w='400pt' height='550pt' pos='relative' backgroundColor='#242424' boxShadow='0px 0px 40px black' borderRadius='20px'>
        <Editor defaultLanguage="markdown" defaultValue={defval} theme="vs-dark" onMount={handleEditorMount} onChange={() => {console.log(notesRef.current.getValue())}}/>
        <Button pos='absolute' top='0' left='-20' colorScheme="purple" onClick={handleEditorSave}>Save</Button>
      </Box> 
    </Box>
  )
}