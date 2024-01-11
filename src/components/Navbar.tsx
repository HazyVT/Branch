import { Avatar, Box, Heading, Icon } from "@chakra-ui/react";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";



export default function Navbar() {
  return (
    <Box w='100vw' h='10vh' pos='fixed' bottom='0' display='flex' alignItems='center' justifyContent='space-around' padding={4} paddingTop={0} boxShadow={'0px -3px 3px rgba(0,0,0,0.1)'}>
      <Icon as={IoChatboxEllipses} w={8} h={8} color='red.300'/>
      <Icon as={FaUserFriends} w={8} h={8} color='red.300' />
      <Avatar size='sm' bgColor='red.300' />
    </Box>
  )
}