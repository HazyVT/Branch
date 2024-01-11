import { Avatar, Box, Icon } from "@chakra-ui/react";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import User from "../models/User";
import { useState } from "react";
import { selfChannel } from "../models/Client";
import { Link } from "react-router-dom";



export default function Navbar(props: {user: User | null}) {

  const [ image, setImage ] = useState(props.user?.getData().image);

  const handleImageChange = (payload: { [x: string]: unknown; type?: "broadcast"; event?: string; payload?: {image: string} }) => {
    setImage(payload.payload?.image);
  }
  
  selfChannel.on('broadcast', {event: 'image'}, (payload) => handleImageChange(payload))

  return (
    <Box w='100vw' h='10vh' pos='fixed' bottom='0' display='flex' alignItems='center' justifyContent='space-around' padding={4} paddingTop={0} boxShadow={'0px -3px 3px rgba(0,0,0,0.1)'}>
      <Icon as={IoChatboxEllipses} w={8} h={8}/>
      <Icon as={FaUserFriends} w={8} h={8}/>
      <Link to='/account'><Avatar size='sm' src={image} bgColor='black' /></Link>
    </Box>
  )
}