import { Box, Button, Heading, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <Box display='flex' flexDir='column' alignItems='center' marginTop={12}>
            <Heading size='3xl'>Welcome To <Heading as='span' size='3xl' color='secondary.400'>Branch</Heading></Heading>
            <Text marginTop={8} fontSize={18} fontWeight={500} w='30%' textAlign='center'>
                Branch is an online platform dedicated to making your saving a little easier. Allows you to track your spending and track your subscriptions.
            </Text>
            <Box marginTop={8}>
                <Button size='lg' marginRight={4} bgColor='primary.500' color='white' _hover={{bgColor: 'primary.600'}}>Get Started</Button>
            </Box>
        </Box>
    )
}