import { Avatar } from "@chakra-ui/avatar";
import { Icon } from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { RiCheckDoubleFill } from "react-icons/ri";
import User from "../../models/User";
import { useNavigate } from "react-router-dom";


export default function Navbar(props: {onDesktop: boolean, user: User | null}) {

  const nav = useNavigate();

  return (
    <Box display={props.onDesktop ? 'flex' : 'none'}  justifyContent='space-between'>
      <Icon onClick={() => {nav('/')}} as={RiCheckDoubleFill} w={8} h={8} _hover={{color: 'red.300'}} cursor="pointer"/>
      <Avatar src={props.user ? props.user.getImage() : ''} onClick={() => {props.user ? nav('/account') : nav('/login')}} bgColor={'black'} size='sm' cursor={"pointer"}/>
    </Box>
  )
}