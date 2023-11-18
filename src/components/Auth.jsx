import { 
  Box, 
  Button, 
  useToast, 
  Heading, 
  Input, 
  Text 
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "@firebase/auth";
import { auth } from "./Client";
import { useNavigate } from "react-router";

export default function Auth() {

  const [ state, setState ] = useState('login');
  const signInEmail = useRef();
  const signInPass = useRef();
  const signUpEmail = useRef();
  const signUpUsername = useRef();
  const signUpPass = useRef();
  const nav = useNavigate();
  const toast = useToast();

  function Login() {

    const handleLogin = () => {
      if (signInEmail.current.value == '' || signInPass.current.value == '') {
        toast({
          title: "Blank Input",
          description: "Input cannot be left empty",
          duration: 5000,
          isClosable: true,
          status: 'error'
        })
      } else {
        signInWithEmailAndPassword(auth, signInEmail.current.value, signInPass.current.value).then(() => {
          // Redirect to home
          nav('/')
        }).catch((reason) => {
          const msg = reason.message;
          if (msg.includes("invalid-email")) {
            toast({
              title: "Invalid Email",
              description: "Your email is invalid",
              duration: 5000,
              isClosable: true,
              status: 'error'
            })
          } else {
            toast({
              title: "Login error: " + reason.error,
              description: reason.message,
              duration: 5000,
              isClosable: true,
              status: 'error'
            })
          }
        })
      }
    }

    const handleKeyPress = (event) => {
      const key = event.key;
      if (key == "Enter") {
        // Login
        handleLogin();
      }
    }

    return (
      <Box display='flex' flexDirection='column' alignItems='center' paddingTop={12} justifyContent='center'>
        <Heading size='2xl'>Sign into your account</Heading>
        <Box display='flex' flexDir='column' w='250pt' h='fit-content' bgColor='white' borderRadius='20px' boxShadow='0px 4px 4px rgba(0,0,0,0.25)' marginTop='8'>
            <Box padding={8}>
                <Text fontWeight='500' padding={1}>Email address</Text>
                <Input ref={signInEmail} onKeyPress={handleKeyPress} />
            </Box>
            <Box padding={8} paddingTop={0}>
                <Text fontWeight='500' padding={1}>Password</Text>
                <Input ref={signInPass} type='password' onKeyPress={handleKeyPress}/>
            </Box>
            <Button marginLeft={8} marginRight={8} bgColor='#CDBDDB' _hover={{bgColor: '#c0add2'}} onClick={() => {handleLogin()}}>Sign In</Button>
            <Text padding={8} textAlign='center'>Don't have an account? <a style={{color: '#a468d9', cursor: "pointer"}} onClick={() => {setState('register')}}>Register</a></Text>    
        </Box>
      </Box>
    )
  }

  function Register() {

    const handleRegister = () => {

      // Checks
      if (signUpEmail.current.value == '' || signUpPass.current.value == '' || signUpUsername.current.value == '') {
        toast({
          title: "Empty Input",
          description: "Inputs cannot be blank",
          duration: 5000,
          isClosable: true,
          status: 'error'
        })
      } else {
        createUserWithEmailAndPassword(auth, signUpEmail.current.value, signUpPass.current.value).then((userInfo) => {
          console.log(userInfo);
          updateProfile(auth.currentUser, {displayName: signUpUsername.current.value}).then(() => {
            nav('/')
          });
  
        }).catch((reason) => {
          const msg = reason.message;
          if (msg.includes("invalid-email")) {
            toast({
              title: "Invalid Email",
              description: "Your email is invalid",
              duration: 5000,
              isClosable: true,
              status: 'error'
            })
          } else {
            toast({
              title: "Login error: " + reason.error,
              description: reason.message,
              duration: 5000,
              isClosable: true,
              status: 'error'
            })
          }
        })
      }
    }

    const handleKeyPress = (event) => {
      const key = event.key;
      if (key == "Enter") {
        handleRegister();
      }
    }
    
    return (
      <Box display='flex' flexDirection='column' alignItems='center' paddingTop={12} justifyContent='center'>
        <Heading size='2xl'>Register your account</Heading>
        <Box display='flex' flexDir='column' w='250pt' h='fit-content' bgColor='white' borderRadius='20px' boxShadow='0px 4px 4px rgba(0,0,0,0.25)' marginTop='8'>
            <Box padding={8}>
              <Text fontWeight='500' padding={1}>Username</Text>
              <Input ref={signUpUsername}/>
            </Box>
            <Box padding={8} paddingTop={0}>
                <Text fontWeight='500' padding={1}>Email address</Text>
                <Input ref={signUpEmail}/>
            </Box>
            <Box padding={8} paddingTop={0}>
                <Text fontWeight='500' padding={1}>Password</Text>
                <Input ref={signUpPass} type="password"/>
            </Box>
            <Button marginLeft={8} marginRight={8} bgColor='#CDBDDB' _hover={{bgColor: '#c0add2'}} onClick={() => {handleRegister()}}>Sign Up</Button>
            <Text padding={8} textAlign='center'>Already have an account? <a style={{color: '#a468d9', cursor: "pointer"}} onClick={() => {setState('login')}}>Sign In</a></Text>    
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Box display={state === 'login' ? 'block' : 'none'}>
        <Login />
      </Box>
      <Box display={state === 'register' ? 'block' : 'none'}>
        <Register />
      </Box>
    </Box>
  )
}

