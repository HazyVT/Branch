import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import User from "../../models/User";
import { supabase } from "../Client";
import SidebarButton from "./SidebarButton";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Project from "../../models/Project";
import { CiFolderOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";



export default function Sidebar(props: {user : User | null, projects: Project[]}) {

  const [ active, setActive ] = useState('overview');
  const nav = useNavigate()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error == null) {
      window.location.reload();
    }
  }

  return (
    <Box w='300px' h='100vh' shadow='md' padding={8}>
      <Box display='flex' alignItems='center'>
        <Avatar src={props.user ? props.user.getImage() : ''} size='sm' borderRadius={'10px'}/>
        <Text fontWeight={300} marginLeft={4} fontSize={18}>{props.user ? props.user.getName() : ''}</Text>  
      </Box>
      <Box display='flex' flexDir='column' justifyContent='space-between' h='95%'>
        <Box marginTop={8}>
          <Box 
            cursor={"pointer"} 
            bgColor={active === 'overview' ? 'gray.100' : ''} 
            padding={2} 
            borderRadius={'10px'}
            onClick={() => {setActive('overview'); nav('/')}}
          >
            <SidebarButton icon={AiOutlineHome} name={"Overview"} />
          </Box>
          <Box 
            cursor={"pointer"} 
            bgColor={active === 'projects' ? 'gray.100' : ''} 
            padding={2} 
            borderRadius={'10px'}
            marginTop={2}
            onClick={() => {setActive('projects'); nav('/projects')}}
          >
            <SidebarButton icon={CiFolderOn} name={"Projects"} />
          </Box>
        </Box>
        <Button w='100%' bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}} onClick={signOut}>Sign Out</Button>

      </Box>
    </Box>
  )
}