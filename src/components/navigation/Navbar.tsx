import { Icon } from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";


export default function Navbar(props: {onDesktop: boolean}) {

  const nav = useNavigate();

  return (
    <Box display={props.onDesktop ? 'flex' : 'none'}  justifyContent='space-between' padding={12}>
      <Icon onClick={() => {nav('/')}} as={RiCheckDoubleFill} w={8} h={8} _hover={{color: 'red.300'}} cursor="pointer"/>
    </Box>
  )
}