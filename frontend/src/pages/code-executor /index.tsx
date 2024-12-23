import { useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/ext-language_tools'
import { useDropzone } from 'react-dropzone'
import Button from '../../components/Button'
import { Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

enum Language {
  C = 'c_cpp',
  CPP = 'c_cpp',
  Python = 'python',
  Java = 'java',
}

const CodeExecutor = () => {
  const [code, setCode] = useState<string>('// You can enter your code here...')
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [language, setLanguage] = useState<Language>(Language.CPP)
  const navigate = useNavigate()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setInput(e.target.result as string)
        }
      }

      reader.readAsText(file)
    },
    maxSize: 5000000,
    accept: {
      'text/x-python': ['.py'],
      'text/x-c++src': ['.cpp'],
      'text/x-csrc': ['.c'],
      'text/x-java-source': ['.java'],
    },
    onDropRejected: () => {
      alert(
        'File not accepted. Please ensure the file is of type .py, .cpp, .c, or .java and does not exceed 5 MB.'
      )
    },
  })

  const runCode = () => {
    setOutput('Displaying the results here after execution.')
  }

  return (
    <div
      className="min-h-screen text-gray-200"
      style={{
        backgroundColor: 'hsla(223,43%,13%,1)',
        backgroundImage: `
                    radial-gradient(at 0px 0px, hsla(140,50%,75%,0.5) 0px, transparent 50%),
                    url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.51"%3E%3Cdefs%3E%3Cfilter id="nnnoise-filter" x="-20%25" y="-20%25" width="140%25" height="140%25" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"%3E%3CfeTurbulence type="turbulence" baseFrequency="0.067" numOctaves="4" seed="15" stitchTiles="stitch" x="0%25" y="0%25" width="100%25" height="100%25" result="turbulence"%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale="7" specularConstant="0.9" specularExponent="20" lighting-color="%235b19b6" x="0%25" y="0%25" width="100%25" height="100%25" in="turbulence" result="specularLighting"%3E%3CfeDistantLight azimuth="3" elevation="103"%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3C/filter%3E%3C/defs%3E%3Crect width="700" height="700" fill="%231e0f0fff"%3E%3C/rect%3E%3Crect width="700" height="700" fill="%235b19b6" filter="url(%23nnnoise-filter)"%3E%3C/rect%3E%3C/svg%3E')
                `,
        mixBlendMode: 'overlay',
      }}
    >
      <div className="py-2 px-8 backdrop-blur-3xl flex justify-between items-center">
        <h1
          className="text-lg font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          CoExe
        </h1>
        <div className="flex">
          <label className="mr-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer text-sm">
            Choose File
            <input {...getInputProps()} type="file" className="hidden" />
          </label>
          <select
            className="mr-2 bg-gray-700 border border-gray-600 rounded p-2 text-sm"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <option value={Language.C}>C</option>
            <option value={Language.CPP}>C++</option>
            <option value={Language.Python}>Python</option>
            <option value={Language.Java}>Java</option>
          </select>
          <Button type="secondary" className="mr-2">
            Create Room
          </Button>
          <Button className="mr-2">Join Room</Button>
          <Button
            className="flex items-center gap-1 mr-2"
            onClick={runCode}
            type="primary"
          >
            <Play size={16} strokeWidth={4} /> Run
          </Button>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm">
          Sign Up
        </button>
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div className="w-2/3 p-4 border-r border-gray-700">
          <AceEditor
            mode={language}
            theme="monokai"
            name="codeEditor"
            onChange={setCode}
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            style={{ width: '100%', height: 'calc(100vh - 100px)' }}
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col space-y-4">
          <textarea
            className="h-1/3 bg-gray-800 border border-gray-700 p-3 rounded resize-none"
            placeholder="Enter your input here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <textarea
            className="flex-grow bg-gray-800 border border-gray-700 p-3 rounded resize-none"
            placeholder="Press the run button to see the output"
            value={output}
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default CodeExecutor
