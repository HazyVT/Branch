import { Alert, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Heading, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { ArcElement, LineElement, CategoryScale, Legend, Tooltip, LinearScale, PointElement, BarElement } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { Chart as CharJS } from 'chart.js';
import { Bar } from "react-chartjs-2";

export default function Home() {

  const possibleColors = ["#FAEDCB", "#C9E4DE", "#C6DEF1", "#DBCDF0", "#F2C6DE", "#F7D9C4", "#FFADAD", "#FFD6A5", "#FDFFB6", "#E4F1EE", "#D9EDF8", "#DEDAF4", "#97ECF1", "#DFFDFF", "#BDB2FF", "#FAD1FA", "#F1F7B5", "#F8F3E8", "#E6F8F6"];
  const [ columns, setColumn ] = useState([
    "Sample 1", 
    "Sample 2"
  ]);
  const [ rows, setRows ] = useState([
    {id: 0, label: 'Dataset 0', data: [0, 12], backgroundColor: possibleColors[Math.floor(Math.random() * possibleColors.length)]}
  ]);
  const [ count, setCount ] = useState(columns.length + 1);
  const [ rowCount, setRowCount ] = useState(rows.length);
  const [ charts, setCharts ] = useState([]);
  const [ chartCount, setChartCount ] = useState(0);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
    
  CharJS.register(ArcElement, Tooltip, Legend, PointElement, CategoryScale, LinearScale, LineElement, BarElement);


  function BarGraph({column, row}) {

    const [ data, setData ] = useState({
      labels: column,
      datasets: row
    })

    useEffect(() => {
      setData({
        labels: column,
        datasets: row
      })
    }, [])

    return (
      <Box w={'600pt'} >
        <Bar 
          datasetIdKey="barchart"
          data={data}
          redraw={true}
        />
      </Box>
    )
  }

  function Sidebar() {

    const addColumn = () => {
      // Add the columns
      setColumn(current => [...current, "Sample " + count]);
      setCount(prev => prev + 1);

      for (var x = 0; x < rows.length; x++) {
        let row = rows[x];
        let content = row.data.slice();
        content.push("");
        rows[x].data = content;
        console.log(content);
      }
    }

    const addRow = () => {
      var content = []
      columns.forEach(() => {
        content.push("")
      });
      var newRows = rows.slice();
      newRows.push({id: rowCount, label: 'Dataset ' + rowCount, data: content, backgroundColor: possibleColors[Math.floor(Math.random() * possibleColors.length)]});
      setRows(newRows);
      setRowCount(prev => prev + 1);
    }

    return (
      <Box display='flex' padding={4} margin={0} h='100vh' left='0' flexDir='column' bgColor='#f0f5f2' marginRight={4}>
        <Button onClick={addColumn} bgColor={'#5c638a'} _hover={{backgroundColor: '#52587a'}} color='white'>Add Column</Button>
        <Button marginTop={4} onClick={addRow} bgColor={'#5c638a'} _hover={{backgroundColor: '#52587a'}} color='white'>Add Row</Button>
      </Box>
    )
  }

  const handleColumnChange = (e) => {
    // Check for change in the first place
    var index = e.target.id;
    var oldText = columns[index];
    var newText = e.target.innerHTML.replace(/&nbsp;/g, '');
    if (oldText != newText) {
      columns[index] = newText
      console.log(columns);
      forceUpdate();
    }
  }

  const handleRowChange = (e) => {
    var id = e.target.id;
    var index = e.target.cellIndex;
    var oldText = rows[id].data[index];
    var newText = e.target.innerHTML.replace(/&nbsp;/g, '');
    if (oldText != newText) {
      rows[id].data[index] = newText
      forceUpdate();
    }
  }

  const changeColor = (element) => {
    // Dynamically change color of input
    element.target.style.backgroundColor = element.target.value;

    // Change color of chart
    const rowid = element.target.id;
    rows[rowid].backgroundColor = element.target.value;
    forceUpdate();
  }



  return (
    <Box display='flex'>  
      <Sidebar />
      <Box w={'800pt'} padding={4}>
        <TableContainer boxShadow={'0px 4px 4px rgba(0,0,0,0.25)'}>
          <Table variant='striped' >
            <TableCaption contentEditable suppressContentEditableWarning>Default Table</TableCaption>
            <Thead>
              <Tr>
                {columns.map((col, index) => {
                  return <Th key={index} id={index} contentEditable suppressContentEditableWarning onBlur={handleColumnChange}>{col}</Th>
                })}
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row, index) => {
                return (
                  <Tr key={row.id}>
                    {row.data.map((cont, index) => {
                      return <Td id={row.id} className={index} key={index} contentEditable suppressContentEditableWarning onBlur={handleRowChange} dangerouslySetInnerHTML={{__html: cont}}></Td>
                    })}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
        <Box margin={4}>
          <Heading>Color Selector</Heading>
          <Box>
            {rows.map((row, index) => {
              return <Box key={index}>
                <Text padding={1}>{row.label}</Text>
                <Select id={row.id} defaultValue={row.backgroundColor} bgColor={row.backgroundColor} onChange={changeColor}>
                  {possibleColors.map((color, ind) => {
                    return <option key={ind} value={color} style={{backgroundColor: color}} >{color}</option>
                  })}
                </Select>
              </Box>
            })}
          </Box>
          
        </Box>
        <Box marginTop={12}>
          <Center>
            <BarGraph key={chartCount} column={columns} row={rows}/>
          </Center>
        </Box>
      </Box>
    </Box>
  )
}