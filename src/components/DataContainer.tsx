import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./Client";

export default function DataContainer() {

  const [ rows, setRows ] = useState(new Map());

  const getData = async () => {
    const { data, error } = await supabase.from('branch_collection').select();
    if (error == null && data != null) {
      const simpleRows = new Map();
      data[0].data[0].forEach((num: number, index: number) => {
        simpleRows.set(index.toString(), num);
      })
      setRows(simpleRows);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <Box>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Row1</Th>
              <Th>Row2</Th>
              <Th>Row3</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {[...rows.keys()].map((key) => {
                return <Td key={key}>{rows.get(key)}</Td>
              })}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}