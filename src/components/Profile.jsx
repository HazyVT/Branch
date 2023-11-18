import { Box, Heading, Avatar, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { auth } from "./Client";
import { onAuthStateChanged } from "@firebase/auth";
import { Spinner } from "@chakra-ui/spinner";

export default function Profile() {

  const [ loading, setLoading ] = useState(true);
  const [ name, setName ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ photo, setPhoto ] = useState(null);
  const [ creation, setCreation ] = useState(null)

  useEffect(() => {
    const user = auth.currentUser;
    if (user != null) {
      // Get user information
      setName(user.displayName);
      setEmail(user.email);
      setPhoto(user.photoURL);
      setCreation(user.metadata.creationTime);
      setLoading(false);
    }
  }, [])

  const updateImage = () => {
    
  }

  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        <Box 
          display={loading === false ? 'flex' : 'none'} 
          flexDir='column' 
          bgColor='white' 
          padding={4} 
          w='50%' 
          borderRadius={'20px'} 
          boxShadow='0px 4px 4px rgba(0,0,0,0,25)'
        >
          <Box display='flex' alignItems='center' justifyContent='space-around' w='100%'>
            <Avatar src={photo} w={16} h={16}/>
            <Heading>{name}</Heading>
          </Box>
          <Box padding={4}>
            <Text>Email: {email}</Text>
            <Text>Joined at: {creation}</Text>
          </Box>
        </Box>
      </Box>
      <Box display={loading === true ? 'flex' : 'none'} justifyContent='center'>
        <Spinner />
      </Box>
    </Box>
  )
}