import { Box, Button, Heading, Image, Text, useMediaQuery } from "@chakra-ui/react";

export default function Home() {

  const [ isDesktop ] = useMediaQuery('(min-width: 800px)');

  return (
    <>
    <Box display='flex' flexDir='column' alignItems='center' margin={4} backgroundImage={isDesktop ? '/study.png' : 'none'} backgroundSize='contain' backgroundRepeat='no-repeat' backgroundPosition='55vw'> 
      <Heading size='4xl' textAlign='center' marginBottom={'6'}>Welcome to <br /><span className="accent">Branch</span></Heading>
      <Text textAlign='center' fontWeight={600}>A study hub for students <br />to get work done efficently</Text>
      <Button marginTop={4} colorScheme="purple">Get Started</Button>
    </Box>
    </>
  )
}