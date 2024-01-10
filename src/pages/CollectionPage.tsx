import { Box, Heading, ScaleFade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Collection from "../models/Collection";


export default function CollectionPage(props: {collection: Map<string, Collection>}) {


  const collection = props.collection;
  const [ loading ] = useState(true)

  useEffect(() => {
  }, [])

  return (
    <Box display='flex' flexDir='column' alignItems='center' marginTop={12}>
      <Heading>Collection</Heading>

      {[...collection.keys()].map((key) => {
        return (
          <ScaleFade key={key} in={loading} initialScale={0.9}>
            <Box 
              minW='20vw' 
              w='fit-content' 
              cursor={"pointer"} 
              _hover={{bgColor: 'red.400'}} 
              textAlign='center' 
              padding={4} 
              borderRadius='4px' 
              bgColor='red.300' 
              color='white' 
              marginTop={8} 
              display='flex' 
              alignItems='center' 
              justifyContent='center'
              transition={'background-color 200ms linear'}
            >
              <Heading size='sm'>{collection.get(key)?.getData().title}</Heading>
            </Box>
          </ScaleFade>
        )
      })}
    </Box>
  )
}