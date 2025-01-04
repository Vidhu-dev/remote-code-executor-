import React, { FC } from 'react'
import { Socket } from 'socket.io-client'

interface LanguageProps {
  selectedLanguage: string 
  setSelectedLanguage: (language: string) => void
  setMode: (mode: string) => void
  socket?: Socket 
}

const Language: FC<LanguageProps> = ({
  selectedLanguage, 
  setSelectedLanguage,
  setMode,
  socket,
}) => {
  /**
   * Handles language selection changes and updates the state accordingly.
   * @param e - The change event triggered by selecting a language.
   */
  const onLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault()
    const languageOption = e.target.value
    console.log('Selected option:', selectedLanguage)
    let language: string
    let modeValue: string

    switch (languageOption) {
      case 'C++':
        language = 'cpp'
        modeValue = 'c_cpp'
        break
      case 'C':
        language = 'c'
        modeValue = 'c_cpp'
        break
      case 'Java':
        language = 'java'
        modeValue = 'java'
        break
      case 'Python':
        language = 'python'
        modeValue = 'python'
        break
      default:
        console.warn('Unsupported language selected')
        return
    }

    setSelectedLanguage(language)
    setMode(modeValue)
    socket?.emit('sendLang', language, () =>
      console.log('Language change socket event triggered')
    )
  }

  return (
    <div>
      <label htmlFor="language-select" className="sr-only">
        Select Language
      </label>
      <select
        id="language-select"
        className="px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={onLanguageChange}
        value={selectedLanguage}
      >
        <option value="C++">C++</option>
        <option value="C">C</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
      </select>
    </div>
  )
}

export default Language
