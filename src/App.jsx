import { useState } from 'react';
import './App.css';
import { Editor } from '@monaco-editor/react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Box } from '@chakra-ui/layout';
import rehypeHighlight from 'rehype-highlight/lib';
import "highlight.js/styles/github.css";
import 'katex/dist/katex.min.css'


function App() {

  const [ md, setMd ] = useState('')

  function handle_editor_change(value) {
    setMd(value);
  }
  
  return (
    <>
    <Box display='flex' justifyContent={'space-between'}>
      <Editor height='65vw' width='50vw' defaultLanguage='markdown' theme='vs-dark' onChange={handle_editor_change}/>
      <Box backgroundColor='#1e1e1e' w='50.1vw' color='white'>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} className='markdown-body' >
          {md}
        </ReactMarkdown>
      </Box>
    </Box>
    </>
  )
}

export default App
