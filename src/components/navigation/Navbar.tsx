import { Avatar, Box, Icon, Text, useColorMode } from "@chakra-ui/react";
import { CiSun, CiDark } from "react-icons/ci";
import { PiGithubLogo, PiTwitterLogo, PiYoutubeLogo } from "react-icons/pi";
import Navicon from "./Navicon";
import { Link } from "react-router-dom";
import User from "../../models/User";

export default function Navbar(props: {user: User | null}) {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w='100vw' h='1vh' display='flex' alignItems='center' justifyContent='space-between' padding={12} boxShadow={'0px 3px 3px rgba(0,0,0,0.1)'}>
      <Link to='/'><Text fontSize={24} fontWeight={500}>Branch</Text></Link>
      <Box display='flex' w='10vw' justifyContent='space-around' marginLeft={-10}>
        <Icon cursor={"pointer"} as={colorMode === 'light' ? CiDark : CiSun} onClick={toggleColorMode} w={6} h={6} />
        <Navicon icon={PiGithubLogo} />
        <Navicon icon={PiTwitterLogo} />
        <Navicon icon={PiYoutubeLogo} />
      </Box>
      <Link to={props.user ? '/account' : '/login'}><Avatar size='sm' bgColor='red.300' /></Link>
    </Box>
  )
}