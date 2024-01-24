import { Box, Text } from "@chakra-ui/layout";
import Project from "../../models/Project";
import { AiOutlineProject } from "react-icons/ai";
import { Icon } from "@chakra-ui/icon";


export default function SidebarProjectTab(props: {project: Project}) {
  return (
    <Box display='flex' alignItems='center'>
      <Box display='flex' alignItems='center' justifyContent={'center'} w='fit-content' padding={2} borderRadius={'6px'}>
        <Icon as={AiOutlineProject} w={5} h={5}/>
      </Box>
      <Text marginLeft={4} fontWeight={300}>{props.project.getName()}</Text>
    </Box>
  )
}