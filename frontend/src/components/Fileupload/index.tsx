
import { FC } from 'react'

interface FileUploadProps {
  setCode: (code: string) => void
  setSelectedLanguage: (language: string) => void
  setMode: (mode: string) => void
  socket?: {
    emit: (event: string, data: string, callback?: () => void) => void
  }
}

const FileUpload: FC<FileUploadProps> = ({
  setCode,
  setSelectedLanguage,
  setMode,
  socket,
}) => {
  let fileReader: FileReader

  /**
   * Handles the file read event and updates the code content.
   * @param e - The file read event.
   */
  const handleFileRead = (): void => {
    const content = fileReader.result as string
    console.log(content)
    setCode(content)
  }

  /**
   * Handles the chosen file, sets language and mode based on file extension,
   * and reads the file content.
   * @param file - The selected file.
   */
  const handleFileChosen = (file: File): void => {
    const extension = file.name.split('.').pop()?.toLowerCase()
    console.log(extension)

    switch (extension) {
      case 'cpp':
        setSelectedLanguage('cpp')
        setMode('c_cpp')
        socket?.emit('sendLang', 'C++', () =>
          console.log('Language change socket event triggered')
        )
        break
      case 'c':
        setSelectedLanguage('cpp')
        setMode('c_cpp')
        socket?.emit('sendLang', 'C', () =>
          console.log('Language change socket event triggered')
        )
        break
      case 'java':
        setSelectedLanguage('java')
        setMode('java')
        socket?.emit('sendLang', 'Java', () =>
          console.log('Language change socket event triggered')
        )
        break
      case 'py':
        setSelectedLanguage('python')
        setMode('python')
        socket?.emit('sendLang', 'Python', () =>
          console.log('Language change socket event triggered')
        )
        break
      default:
        alert('Upload a file with a correct extension')
        return
    }

    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <input
      type="file"
      className=" text-sm rounded-lg px-3 py-2 border w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) handleFileChosen(file)
      }}
    />
  )
}

export default FileUpload
