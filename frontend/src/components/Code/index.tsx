import { FC } from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-cobalt'
import 'ace-builds/src-noconflict/ext-language_tools'

interface CodeProps {
  code: string
  setCode: (newCode: string) => void
  mode: string
  socket?: {
    emit: (event: string, data: string, callback?: () => void) => void
  }
}

const Code: FC<CodeProps> = ({ code, setCode, mode, socket }) => {
  /**
   * Handles changes in the AceEditor content and updates the state.
   * @param newVal - The updated code from the editor.
   */
  const handleChange = (newVal: string): void => {
    setCode(newVal)
    console.log('newVal: ' + newVal)
    console.log('code: ' + code)

    if (socket) {
      socket.emit('sendCode', newVal, () =>
        console.log('Code sent to the server')
      )
    }
  }

  return (
    <div
      id="editor"
      className="h-full w-full border border-gray-300 rounded-lg shadow-md bg-gray-50"
    >
      <AceEditor
        mode={mode}
        width="100%"
        height="100%"
        value={code}
        fontSize="17px"
        theme="monokai"
        showPrintMargin={false}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    </div>
  )
}

export default Code
