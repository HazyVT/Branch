import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <Box textAlign={'center'}>
            <Heading size='3xl' marginTop={2}>Welcome to <Heading size='3xl' as='span' color='red.300'>Branch</Heading></Heading>
            <Text marginTop={2} fontWeight={600}>Simple manga reader</Text>
            <Button marginTop={4} bgColor='red.300' _hover={{bgColor: 'red.400'}} color='white'>Get Started</Button>
        </Box>
    )
}