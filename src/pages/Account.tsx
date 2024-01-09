import { Avatar, Box, Heading } from "@chakra-ui/react";
import User from "../models/User";

export default function Account(props: {user: User | null}) {

  const user = props.user;


  
  return (
    <Box marginTop={12} display='flex' flexDir='column' alignItems='center'>
      <Heading textAlign='center'>Account</Heading>
      <Box marginTop={4} display='flex' alignItems='center'>
        <Avatar size='sm' src={user?.getData().image}/>
        <Box marginLeft={4}>
          <Heading size='md' contentEditable suppressContentEditableWarning>{user?.getData().name}</Heading>
        </Box>
      </Box>
    </Box>
  )
}