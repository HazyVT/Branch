import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/breadcrumb";
import { Icon } from "@chakra-ui/icon";
import { Heading, Box, Text} from "@chakra-ui/layout";
import { MdFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import Project from "../../../models/Project";

export default function InAppProjectHeader(props: {project: Project | undefined, hours: number, minutes: number, date: Date}) {

  return (
    <>
    <Box display='flex' alignItems='center' padding={7} paddingBottom={0}>
        <Icon as={MdFolder} />
        <Breadcrumb marginLeft={2} separator='>'>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to='/'>Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={'/projects/'+props.project?.getId()}>{props.project?.getName()}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box marginTop={8} marginLeft={4} borderRadius={'10px'} padding={4} w='50vw' shadow='md'>
        <Box display='flex' alignItems='end' justifyContent={'space-between'}>
          <Box display='flex' alignItems='center'>
            <Icon as={props.project?.getMeta().shape} color={props.project?.getMeta().color} w={4} h={4} marginRight={4}/>
            <Heading size='xl' fontWeight={300}>{props.project?.getName()}</Heading>
          </Box>
          <Box display='flex' alignItems='center'>
            <Box marginLeft={24}>
              <Text color='gray.400' fontSize={12}>CREATED</Text>
              <Text>{props.date.toLocaleDateString('en', {'dateStyle': 'long'})}</Text>
            </Box>
            <Box marginLeft={8}>
              <Text color='gray.400' fontSize={12}>TRACKED</Text>
              <Box display='flex'>
                <Text display={props.hours > 0 ? 'block' : 'none'} marginRight={2}>{props.hours} Hours</Text>
                <Text display={props.minutes > 0 ? 'block' : 'none'} marginRight={2}>{props.minutes} Minutes</Text>  
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
    
  )
  
}