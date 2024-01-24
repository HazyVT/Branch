import { Icon } from "@chakra-ui/icon";
import { Box, Text } from "@chakra-ui/layout";
import { Md10Mp } from "react-icons/md";

export default function SidebarButton(props: {icon: typeof Md10Mp, name: string}) {
  return (
    <Box display='flex' alignItems='center'>
      <Icon as={props.icon} w={5} h={5}/>
      <Text marginLeft={2} fontWeight={300}>{props.name}</Text>
    </Box>
  )
}