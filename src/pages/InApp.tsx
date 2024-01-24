import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { supabase } from "../components/Client";
import User from "../models/User";
import Project from "../models/Project";
import Sidebar from "../components/InApp/sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InAppContainer from "../components/InApp/content/InAppContainer";
import { Spinner } from "@chakra-ui/spinner";
import InAppProjectTab from "../components/InApp/content/InAppProjectTab";
import { TbCircleFilled, TbSquareFilled, TbTriangleFilled } from "react-icons/tb";

export default function InApp(props: {user : User | null}) {

  const [ projects, setProjects ] = useState<Map<string, Project>>(new Map());
  const [ loading, setLoading ] = useState(true);

  


  useEffect(() => {

    const colors = [
      'red.300',
      'teal.300',
      'green.300',
      'orange.300'
    ];
  
    const shapes = [
      TbSquareFilled,
      TbCircleFilled,
      TbTriangleFilled
    ]

    // Get Projects
    supabase.from('branch_projects').select().eq('user_id', props.user?.getId()).then((response) => {
      if (response.data != null) {
        const temp_map = new Map();
        response.data?.forEach((value) => {
          const temp_proj = new Project(value.id, value.name, value.created_at);
          const colorIndex = Math.floor(Math.random() * colors.length);
          const shapeIndex = Math.floor(Math.random() * shapes.length);
          temp_proj.setMeta(colors[colorIndex], shapes[shapeIndex]);
          temp_map.set(String(value.id), temp_proj);
        })
        setLoading(false);
        setProjects(temp_map);
      }
    })
  }, [props.user])

  return (
    <Box display='flex'>
      {loading ? 
        <Box w='100vw' h='80vh' display='flex' justifyContent='center' alignItems='center'>
          <Spinner w={40} h={40} thickness="6px" color='red.300' emptyColor="gray.100" />
        </Box>
      : 
        <BrowserRouter>
          <Sidebar user={props.user} projects={projects}/>
          <Routes>
            <Route path='/' element={<InAppContainer projects={projects} />} />
            <Route path='/projects/:id' element={<InAppProjectTab projects={projects}/>} />
          </Routes>
        </BrowserRouter>
      }
      
    </Box>
  )
}