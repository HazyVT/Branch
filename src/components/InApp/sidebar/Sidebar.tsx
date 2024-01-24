import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import User from "../../../models/User";
import { supabase } from "../../Client";
import SidebarButton from "./SidebarButton";
import { useState } from "react";
import { CiFolderOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/button";
import Project from "../../../models/Project";
import { Icon } from "@chakra-ui/icon";



export default function Sidebar(props: {user : User | null, projects: Map<string, Project>}) {

  const [ active, setActive ] = useState('projects');
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
            bgColor={active === 'projects' ? 'gray.100' : ''} 
            padding={2} 
            borderRadius={'10px'}
            marginTop={2}
            onClick={() => {setActive('projects'); nav('/')}}
          >
            <SidebarButton icon={CiFolderOn} name={"Projects"} />
          </Box>
          <Text fontWeight={300} marginTop={8}>Projects</Text>
          <Box marginTop={1}>
            {[...props.projects.keys()].map((key) => {

              return (
                <Box key={key} display='flex' alignItems='center' w='fit-content' cursor={"pointer"} onClick={() => {nav('/projects/'+props.projects.get(key)?.getId())}}>
                  <Icon as={props.projects.get(key)?.getMeta().shape} color={props.projects.get(key)?.getMeta().color}/>
                  <Text marginLeft={2}>{props.projects.get(key)?.getName()}</Text>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Button w='100%' bgColor='red.300' color='white' _hover={{bgColor: 'red.400'}} onClick={signOut}>Sign Out</Button>
      </Box>
    </Box>
  )
}