import { Box, Button, Input } from "@chakra-ui/react"
import { Handle, Position } from "reactflow"

export default function TextUpdaterNode({data}) {
  
  return (
    <>
      <Box height='fit-content' padding={4} border='1px solid' bgColor='white'>
        <Button onClick={() => {console.log(data)}}>Click</Button>
        <label>{data.label}</label>
      </Box>
      <Handle type='source' position={Position.Left} id="a" style={{top: '80%'}}/>
      <Handle id="b" type='target' position={Position.Left} style={{top: '20%'}} isConnectable={true}/>
    </>
  )
}