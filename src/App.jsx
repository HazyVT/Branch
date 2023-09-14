import { useState } from 'react';
import { Box, Heading, Icon } from '@chakra-ui/react';
import { GiThunderBlade } from 'react-icons/gi'
import { BsTwitter, BsGithub, BsYoutube } from 'react-icons/bs'
import './App.css'

function App() {

  const [ load, setLoad ] = useState(false);
  const [ md, setMd ] = useState('')

  function handle_editor_change(value) {
    setMd(value);
  }
  
  return (
    <>
    	<Box>
    		<Box display='flex' justifyContent='space-around'>
    			<Icon as={GiThunderBlade} w={8} h={8} margin={2} />
    			<Box display='flex' w='24' justifyContent='space-around'>
    				<Icon as={BsTwitter} w={4} h={4} />
    				<Icon as={BsGithub} w={4} h={4}/>
    				<Icon as={BsYoutube} w={4} h={4}/>
    			</Box>
    		</Box>
    	</Box>
    </>
  )
}

export default App
