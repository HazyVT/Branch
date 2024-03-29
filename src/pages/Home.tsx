import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { User } from "../models/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props: {user: User | null}) {

    const nav = useNavigate();
    
    useEffect(() => {
        if (props.user != null) {
            nav('/app')
        }
    })

    return (
        <Box display='flex' flexDir='column' alignItems='center' marginTop={12}>
            <Heading size='3xl'>Welcome To <Heading as='span' size='3xl' color='secondary.400'>Branch</Heading></Heading>
            <Text marginTop={8} fontSize={18} fontWeight={500} w='30%' textAlign='center'>
                Branch is an online platform dedicated to making your saving a little easier. Allows you to track your spending and track your subscriptions.
            </Text>
            <Button 
                marginTop={8} 
                size='lg' 
                bgColor='primary.500' 
                color='white' 
                _hover={{bgColor: 'primary.600'}}
                onClick={() => {nav('/login')}}
            >Get Started</Button>
        </Box>
    )
}