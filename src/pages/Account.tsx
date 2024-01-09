import { Avatar, Box, Heading, Icon, Input, Text } from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import User from "../models/User";
import { MutableRefObject, useRef, useState } from "react";

export default function Account(props: {user: User | null}) {

  const user = props.user;
  const created_at: string = user ? user.getCreated() : '';
  
  // Refrences
  const imgref = useRef() as MutableRefObject<HTMLInputElement>;

  // States
  const [ showAvatarEdit, setShowAvatarEdit ] = useState(false);
  
  const setNewImage = () => {
    //
  }
  
  return (
    <Box display='flex' flexDir='column' alignItems='center'>
      <Box bgColor='red.300' w='100vw' h='30vh' display='flex' justifyContent='center' pos='relative'>
        <Icon as={FaCamera} pos='absolute' top='26vh' zIndex={3} w={12} h={12} 
          opacity={showAvatarEdit ? '50%' : '0'} 
          onMouseEnter={() => {setShowAvatarEdit(true)}} 
          onMouseLeave={() => {setShowAvatarEdit(false)}} 
          cursor={"pointer"} 
          onClick={() => {imgref.current.click()}}
        />
        <Avatar pos='absolute' size='xl' top='24vh' outline='8px solid white' bgColor='red.300' zIndex={2}/>
        <Input ref={imgref} type='file' display='none' accept=".png" onChange={setNewImage}/>
      </Box>
      <Heading marginTop={16}>{user?.getData().name}</Heading>
      <Text>Created at: {new Date(created_at).toLocaleString('en', {dateStyle: 'medium'})}</Text>
    </Box>
  )
}