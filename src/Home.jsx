/* eslint-disable react/prop-types */
import { Box, Input, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./SupaClient";

export default function Home({session}) {

  const [ tableArr ] = useState([]);

  function handleKeyPress(e) {
    let key = e.key;
    if (key == "Enter") {
      let rk = e.target.value;
      window.location.href = 'https://branch.mosalim.site/room/'+rk;
    }
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