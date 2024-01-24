import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/breadcrumb";
import { Icon } from "@chakra-ui/icon";
import { Box, Heading } from "@chakra-ui/layout";
import { MdFolder } from "react-icons/md";
import { Link } from "react-router-dom";
import Project from "../../../models/Project";
import InAppProjectTab from "./InAppProjectTab";

export default function InAppContainer(props: {projects: Project[]}) {
  return (
    <Box padding={8}>
      <Box display='flex' alignItems='center'>
        <Icon as={MdFolder} />
        <Breadcrumb marginLeft={2}>
          <BreadcrumbItem>
            <Link to='/'>Projects</Link>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Heading marginTop={4} size='2xl' fontWeight={400}>Projects</Heading>
    </Box>
  )
}