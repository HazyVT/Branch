import { Box, Button, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ArcElement, BarElement, Chart, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Chart as CharJS} from 'chart.js';
import { Bar } from "react-chartjs-2";

export default function Home() {

  const [ columns, setColumn ] = useState([
    "Sample 1", 
    "Sample 2"
  ]);
  const [ rows, setRows ] = useState([
    {id: 0, content: [0, 12]}
  ]);
  const [ count, setCount ] = useState(columns.length + 1);
  const [ rowCount, setRowCount ] = useState(rows.length);

  CharJS.register(ArcElement, Tooltip, Legend, BarElement)
  
  useEffect(() => {

  }, [])

  function Sidebar() {

    const addColumn = () => {
      // Add the columns
      setColumn(current => [...current, "Sample " + count]);
      setCount(prev => prev + 1);

      for (var x = 0; x < rows.length; x++) {
        let row = rows[x];
        let content = row.content.slice();
        content.push("");
        rows[x].content = content;
        console.log(content);
      }
    }

    const addRow = () => {
      var content = []
      columns.forEach(() => {
        content.push("")
      });
      var newRows = rows.slice();
      newRows.push({id: rowCount, content: content});
      setRows(newRows);
      setRowCount(prev => prev + 1);
    }

    return (
      <Box display='flex' padding={4}>
        <Button onClick={addColumn}>Add Column</Button>
        <Button marginLeft={4} onClick={addRow}>Add Row</Button>
      </Box>
    )
  }

  const handleColumnChange = (e) => {
    var text = e.target.innerHTML.replace(/&nbsp;/g, '');
    var index = e.target.id;
    columns[index] = text
    console.log(columns);
  }

  const handleRowChange = (e) => {
    var text = e.target.innerHTML.replace(/&nbsp;/g, '');
    var id = e.target.id;
    var index = e.target.cellIndex;
    rows[id].content[index] = text;
    console.log(rows);
  }

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  return (
    <Box>
      <Sidebar />
      <TableContainer boxShadow={'0px 4px 4px rgba(0,0,0,0.25)'}>
        <Table variant='striped' >
          <TableCaption contentEditable suppressContentEditableWarning={true}>Default Table</TableCaption>
          <Thead>
            <Tr>
              {columns.map((col, index) => {
                return <Th key={index} id={index} contentEditable suppressContentEditableWarning onInput={handleColumnChange}>{col}</Th>
              })}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => {
              return (
                <Tr key={row.id}>
                  {row.content.map((cont, index) => {
                    return <Td id={row.id} className={index} key={index} contentEditable suppressContentEditableWarning onInput={handleRowChange}>{cont}</Td>
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box>
      </Box>
    </Box>
  )
}