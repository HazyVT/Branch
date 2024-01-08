import { Icon } from "@chakra-ui/react";

export default function Navicon(props: {icon: typeof Icon}) {
  return (
    <Icon as={props.icon} w={6} h={6}/>
  )
}