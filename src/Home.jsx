import { Box, Button } from "@chakra-ui/react";
import { signInWithDiscord } from "./SupaClient";

export default function Home({session}) {
  return (
    <div className="container">
      <div className="inner-container">
        <h1>Branch</h1>
        <Box display={session ? 'none' : 'block'}>
          <p>A study hub for students. <br />Login to get started.</p>
        </Box>
      </div>
      <Button colorScheme="teal" marginTop='24pt' onClick={session ? () => {console.log("Go to branch")} : () => {signInWithDiscord()}}>{session ? 'Go to branch' : 'Get started with discord'}</Button>
    </div>
  )
}