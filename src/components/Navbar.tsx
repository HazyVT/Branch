import { Avatar, Box, Heading, Icon } from "@chakra-ui/react";
import { LuGitBranchPlus } from "react-icons/lu";


export default function Navbar() {
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'> 
            <Icon as={LuGitBranchPlus} w={8} h={8} color='primary.main'/>
            <Box>
                <Avatar size='sm' bgColor='primary.main'/>
            </Box>
        </Box>
    )
}