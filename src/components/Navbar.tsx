import { Avatar, Box, Icon, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { LuGitBranchPlus } from "react-icons/lu";
import { User } from "../models/user";
import { useNavigate } from "react-router-dom";
import { signOut } from "../models/supabase";


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
                    display={user == null ? 'block' : 'none'}
                    cursor={"pointer"} 
                    onClick={() => {nav('/login')}}
                />
                <Menu>
                    <MenuButton>
                        <Avatar 
                            size='sm'
                            bgColor='primary.main'
                            w={9} h={9}
                            display={user != null ? 'block' : 'none'}
                            src={user?.getData().image}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={signOut}
                        >Sign Out</MenuItem>
                    </MenuList>
                </Menu>
                

            </Box>
        </Box>
    )
}