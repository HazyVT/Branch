import { Box, Icon, Text, useColorMode } from "@chakra-ui/react";
import { CiSun, CiDark } from "react-icons/ci";
import { PiGithubLogo, PiTwitterLogo, PiYoutubeLogo } from "react-icons/pi";
import Navicon from "./Navicon";



export default function Navbar() {

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w='100vw' h='1vh' display='flex' alignItems='center' justifyContent='space-between' padding={10} boxShadow={'0px 3px 3px rgba(0,0,0,0.1)'}>
      <Text fontSize={24} fontWeight={500}>Branch</Text>
      <Box display='flex' w='10vw' justifyContent='space-around'>
        <Icon cursor={"pointer"} as={colorMode === 'light' ? CiDark : CiSun} onClick={toggleColorMode} w={6} h={6} />
        <Navicon icon={PiGithubLogo} />
        <Navicon icon={PiTwitterLogo} />
        <Navicon icon={PiYoutubeLogo} />
      </Box>
    </Box>
  )
}