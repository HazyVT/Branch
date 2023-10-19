/* eslint-disable react/prop-types */
import { Box, Input } from "@chakra-ui/react";

export default function Home({session}) {

  function handleKeyPress(e) {
    let key = e.key;
    if (key == "Enter") {
      let rk = e.target.value;
      window.location.href = 'http://localhost:5174/room/'+rk;
    }
  }

  return (
    <div className="container">
      <div className="inner-container">
        <h1>Branch</h1>
        <Box display={session ? 'none' : 'block'}>
          <p>A study hub for students. <br />Login to get started.</p>
        </Box>
      </div>
      <Input w='400pt' backgroundColor='white' color='black' placeholder='Enter room key' onKeyPress={handleKeyPress}/>
    </div>
  )
}