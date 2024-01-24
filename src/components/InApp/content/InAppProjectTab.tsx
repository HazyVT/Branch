import { Box } from "@chakra-ui/layout";
import Project from "../../../models/Project";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InAppProjectHeader from "./InAppProjectHeader";


export default function InAppProjectTab(props: {projects: Map<string, Project>}) {

  const params = useParams();  
  const [ date, setDate ] = useState<Date>(new Date());
  const [ minutes, setMinutes ] = useState<number>(0);
  const [ hours, setHours ] = useState<number>(0)
  const project = props.projects.get(params.id ? params.id : '');

  useEffect(() => {
    if (project?.getCreatedAt() != undefined) {
      const d1 = new Date(project.getCreatedAt())
      const d2 = new Date();
      const d = d2.getTime() - d1.getTime();
      const as = (d/ 1000);
      let hours = 0;
      let minutes = Math.floor(as / 60);

      if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        minutes %= 60;
      }

      setMinutes(minutes);
      setHours(hours);
      setDate(d1);
    }
  }, [project])


  return (
    <Box padding={4}>
      <InAppProjectHeader project={project} date={date} minutes={minutes} hours={hours} />
    </Box>
  )
}