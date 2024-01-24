import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { supabase } from "../components/Client";
import User from "../models/User";
import Project from "../models/Project";
import Sidebar from "../components/InApp/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InAppContainer from "../components/InApp/InAppContainer";

export default function InApp(props: {user : User | null}) {

  const [ projects, setProjects ] = useState<Project[]>([]);


  useEffect(() => {
    // Get Projects
    supabase.from('branch_projects').select().eq('user_id', props.user?.getId()).then((response) => {
      if (response.data != null) {
        const temp_proj_arr: Project[] = [];
        response.data?.forEach((value) => {
          const temp_proj = new Project(value.id, value.name, value.created_at);
          temp_proj_arr.push(temp_proj);
        })
        setProjects(temp_proj_arr);
      }
    })
  }, [props.user])

  return (
    <Box display='flex'>
      <BrowserRouter>
        <Sidebar user={props.user} projects={projects}/>
        <Routes>
          <Route path='/' element={<InAppContainer />} />
        </Routes>
      </BrowserRouter>
    </Box>
  )
}