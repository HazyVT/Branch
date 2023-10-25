/* eslint-disable react/prop-types */
import { Box, Input, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./SupaClient";

export default function Home({session}) {

  const [ tableArr ] = useState([]);
  const toast = useToast();

  function handleKeyPress(e) {
    let key = e.key;
    if (key == "Enter") {
      let rk = e.target.value;
      window.location.href = 'https://branch.mosalim.site/room/'+rk;
    }
  }

  async function checkAvatarChanges() {
    // Gets the user information from the session
    const {data} = await supabase.auth.refreshSession();
    const { user, session } = data;

    // Get the avatar url of the database
    supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user.id).then((response) => {
      // Check if they are the same
      const oldAvatar = response.data[0].avatar_url;
      console.log(oldAvatar);
        // Update avatar if changes were made
      if (oldAvatar != user.user_metadata.avatar_url) {
        supabase.from('profiles').update({avatar_url: user.user_metadata.avatar_url}).eq('id', user.id).then(() => {
          console.log("Avatar changed")
          toast({
            title: "Avatar Updated",
            description: "Your avatar has been updated to its new fresh look",
            status: "success",
            duration: 4000,
            isClosable: true
          })
        });
      }

    })
    console.log(user);
  }

  useEffect(() => {
    // Load top 10 users for leaderboard
    supabase
    .from('profiles')
    .select('full_name , avatar_url , time_spent_studying')
    .order('time_spent_studying', {ascending: false})
    .limit(10).then((response) => {
      let data = response.data;
      for (var x = 0; x < data.length; x++ ) {
        tableArr.push(
          <Tr key={x}>
            <Td><Image src={data[x].avatar_url} w={'36px'} borderRadius='20px'/></Td>
            <Td>{data[x].full_name}</Td>
            <Td>{data[x].time_spent_studying}</Td>
          </Tr>
        )
      }
    })

    // Update profile picture if there were changes
    checkAvatarChanges();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <div className="inner-container">
        <h1>Branch</h1>
        <Box display={session ? 'none' : 'block'}>
          <p>A study hub for students. <br />Login to get started.</p>
        </Box>
      </div>
      <Input display={session ? 'block' : 'none'} w='400pt' backgroundColor='white' color='black' placeholder='Enter room key' onKeyPress={handleKeyPress}/>
      <TableContainer marginTop='100pt' color='white' display={session ? 'block' : 'none'}>
        <Table variant='simple'>
          <TableCaption color='white'>Top 10 Leaderboard</TableCaption>
          <Thead>
            <Tr>
              <Th color='white'>Avatar</Th>
              <Th color='white'>Username</Th>
              <Th color='white'>Study Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableArr}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}