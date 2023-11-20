import { Box, Icon, Heading, Text, Divider, List, ListItem, UnorderedList } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { IoText } from "react-icons/io5";
import { RiGitBranchFill } from "react-icons/ri";
import { FaHeading, FaL, FaList } from "react-icons/fa6";
import { GoChevronDown, GoChevronUp } from "react-icons/go";


export default function Editor() {

  const [ components, setComponents ] = useState([
    {id: 0, type: Heading, data: "Large Heading"},
    {id: 1, type: Text, data: "Lorem Ipsum"},
    {id: 2, type: UnorderedList, data: ["Item 1", "Item 2"]}
  ]);
  const [ compCount, setCompCount ] = useState(components.length);
  const [ count, setCount ] = useState(0);

  const findComponent = (id) => {
    let ind;
    components.forEach((component, index) => {
      if (component.id == id) {
        ind = index;
      }
    })
    return ind;
  }

  function EditButton({id}) {

    const length = components.length;
    const index = findComponent(id);
    const [ bottom, setBottom ] = useState(true);
    const [ top, setTop ] = useState(true);
    
    useEffect(() => {
      if (index == 0) {setTop(false)};
      if (index+1 == length) {setBottom(false)};
    }, [])

    const array_move = (arr, old_index, new_index) => {
      if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
              arr.push(undefined);
          }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
  };

    const moveDown = () => {
      console.log("Moving down...")
      const index = findComponent(id);
      setComponents(array_move(components, index,index+1));
      setCount(prev => prev + 1);
    }

    const moveUp = () => {
      console.log("Moving up...")
      const index = findComponent(id);
      setComponents(array_move(components, index,index-1));
      setCount(prev => prev - 1);
    }

    // Allows for editing the component that it is on
    return (
      <Box opacity={0} _hover={{opacity: 1}} display='flex' flexDir='column'>
        <Icon display={top === true ? 'block' : 'none'} as={GoChevronUp} onClick={moveUp}/>
        <Icon display={bottom === true ? 'block' : 'none'} as={GoChevronDown} onClick={moveDown} />
      </Box>
    )
  }

  
  function Sidebar() {

    const addText = () => {
      var newComps = components.slice();
      newComps.push({id: compCount, type: Text, data: "Sample string to test"})
      setComponents(newComps);
      setCompCount(compCount+1);
    }

    const addHeading = () => {
      var newComps = components.slice();
      newComps.push({id: compCount, type: Heading, data: "Sample string to test"})
      setComponents(newComps);
      setCompCount(compCount+1);
    }

    const addList = () => {
      var newComps = components.slice();
      newComps.push({id: compCount, type: UnorderedList, data: ["Item 1", "Item 2"]})
      setComponents(newComps);
      setCompCount(compCount+1);
    }

    return (
      <Box display='flex' flexDir='column' alignItems='center' padding={4} marginTop={4} marginLeft={4} h='96vh' left='0'  bgColor='blackAlpha.200' borderRadius={'40px'}>
        <Icon as={RiGitBranchFill} w={6} h={6}/>
        <Divider marginTop={2} marginBottom={2} borderColor='blackAlpha.500' borderWidth={'2px'} borderRadius='20px' />
        <Icon as={FaHeading} w={6} h={5} cursor={'pointer'} onClick={addHeading}/>
        <Icon as={IoText} cursor={'pointer'} w={6} h={6} marginTop={2} onClick={addText} />
        <Icon as={FaList} cursor={'pointer'} w={6} h={5} marginTop={2} onClick={addList}/>
      </Box>
    )
  }

  

  const handleChange = (e) => {
    const req_comp_id = e.target.id;
    const index = findComponent(req_comp_id);
    const req_comp_type = components[index].type.displayName;

    switch (req_comp_type) {
      case "Text":
        components[req_comp_id].data = e.target.innerHTML;
        break;
      case "Heading":
        components[req_comp_id].data = e.target.innerHTML;
        break;
      case "UnorderedList":
        console.log("List item edit");
        components[req_comp_id].data[e.target.classList[0]] = e.target.innerHTML;
        console.log(components[req_comp_id]);
        break;
    }
  }

  const handleKeyPress = (e) => {
    const req_comp_id = e.target.id;
    const index = findComponent(req_comp_id);
    const item_index = e.target.classList[0];
    const key = e.key;
    if (key == "Enter") {
      e.preventDefault();
      console.log("Add")
      components[index].data.push("");
      setCount(prev => prev + 1);
      console.log(components);
      const next_component = document.getElementById(req_comp_id).children[item_index+1];
      console.log(next_component);
    } if (key == "Backspace" && e.target.innerHTML == '') {
      console.log(key);
      components[index].data.splice(e.target.classList[0],1);
      setCount(prev => prev - 1);
    }
  }

  return (
    <Box display='flex'>
      <Sidebar />
      <Box id='components' padding={12}>
        {components.map((value, index) => {
          switch (value.type.displayName) {
            case "Text":
              return <Box key={value.id} display='flex' alignItems='center'>
                <EditButton id={value.id} />
                <value.type id={value.id} textOverflow={'wrap'} contentEditable suppressContentEditableWarning onBlur={handleChange} _focus={{outline: 'none'}} spellCheck={false} padding={2}>
                  {value.data}
                </value.type>
              </Box>
            case "Heading":
              return <Box key={value.id} display='flex' alignItems='center'>
                <EditButton id={value.id} />
                <value.type id={value.id} contentEditable suppressContentEditableWarning onBlur={handleChange} _focus={{outline: 'none'}} spellCheck={false} padding={2}>
                  {value.data}
                </value.type>
              </Box>
            case "UnorderedList":
              return <Box key={value.id} display='flex' alignItems='center'>
                <EditButton id={value.id} />
                <value.type id={value.id}>
                  {value.data.map((item, index) => {
                    return <ListItem key={index} id={value.id} className={index} contentEditable suppressContentEditableWarning onBlur={handleChange} _focus={{outline: 'none'}} spellCheck={false} onKeyDown={handleKeyPress}>{item}</ListItem>
                  })}
                </value.type> 
                </Box>
          }
        })}
      </Box>
    </Box>
  )
}