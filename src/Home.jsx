import { Box, Button } from "@mui/material";

export default function Home({session}) {
  return (
    <div className="container">
      <div className="inner-container">
        <h1>Branch</h1>
        <Box display={session ? 'none' : 'block'}>
          <p>A study hub for students. <br />Login to get started.</p>
        </Box>
      </div>
      <Button variant="contained" className="btn" onClick={session ? () => {console.log('To Branch')} : () => {}}>{session ? 'Go To Branch' : 'Get started with discord'}</Button>
    </div>
  )
}