import { useState, useRef, MutableRefObject } from 'react';
import { Input, Box, Select } from '@chakra-ui/react';

function App() {
  const [ loaded, setLoaded ] = useState(false);
  const [ data, setData ] = useState<Map<string, string[]>>(new Map())
  
  const fileref = useRef() as MutableRefObject<HTMLInputElement>;

  const handleFileChange = (e) => {
    if (fileref.current.files != null) {
        const file = fileref.current.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (evt) {
          if (evt.target != null && evt.target.result != null) {
            const content = evt.target.result.toString();
            const lines = content.split('\n');
            const columns = lines[0].split(",");

            for (let col = 0; col < columns.length; col++) {
              const tempDataArr = [];
              for (let i = 1; i < lines.length; i++) {
                const dline = lines[i].split(',');
                tempDataArr.push(dline[col]);
              }

              setData(data.set(columns[col], tempDataArr));
            }
            setLoaded(true);
          }
        }
    }
  }

  function Dataset(props: {name: string, data: string[]}) {
    return (
      <Box>

      </Box>
    )
  }


  return (
    <>
      <Input display={!loaded ? 'block' : 'none'} onChange={handleFileChange} ref={fileref} type='file' />
      <Box display={loaded ? 'flex' : 'none'} justifyContent='center'>
        <Select>
          {[...data.keys()].map((key) => {
            return <option key={key}>{key}</option>
          })}
        </Select>
      </Box>
    </>
  )
}

export default App
