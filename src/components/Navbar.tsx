import { Avatar, Box, Icon } from "@chakra-ui/react";
import { LuGitBranchPlus } from "react-icons/lu";
import { User } from "../models/user";
import { useNavigate } from "react-router-dom";


export default function Navbar(props: {user: User | null}) {

    const user = props.user;
    const nav = useNavigate();

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'> 
            <Icon 
                as={LuGitBranchPlus} 
                w={8} h={8} 
                color='primary.main'
                cursor={"pointer"}
                onClick={() => nav('/')}
            />
            <Box>
                <Avatar 
                    size='sm' 
                    bgColor='primary.main' 
                    w={9} h={9} 
                    cursor={"pointer"} 
                    onClick={user === null ? 
                        () => nav('/login')
                    : 
                        () => console.log("user is " + user.getData().name)
                    }
                    src={user != null ? user.getData().image : ''}
                    />
            </Box>
        </Box>
    )
}