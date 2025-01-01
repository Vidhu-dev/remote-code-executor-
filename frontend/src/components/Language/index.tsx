import React, { FC } from 'react'

interface LanguageProps {
  setSelectedLanguage: (language: string) => void
  setMode: (mode: string) => void
  socket?: {
    emit: (event: string, data: string, callback?: () => void) => void
  }
}

const Language: FC<LanguageProps> = ({
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
    const selectedLanguage = e.target.value

    switch (selectedLanguage) {
      case 'C++':
        setSelectedLanguage('cpp')
        setMode('c_cpp')
        socket?.emit('sendLang', 'cpp', () =>
          console.log('Language change socket event triggered')
        )
        break
      case 'C':
        setSelectedLanguage('cpp')
        setMode('c_cpp')
        socket?.emit('sendLang', selectedLanguage, () =>
          console.log('Language change socket event triggered')
        )
        break
      case 'Java':
        setSelectedLanguage('java')
        setMode('java')
        socket?.emit('sendLang', selectedLanguage, () =>
          console.log('Language change socket event triggered')
        )
        break
      case 'Python':
        setSelectedLanguage('python')
        setMode('python')
        socket?.emit('sendLang', selectedLanguage, () =>
          console.log('Language change socket event triggered')
        )
        break
      default:
        console.warn('Unsupported language selected')
        break
    }
  }

  return (
    <select
      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={onLanguageChange}
    >
      <option value="C++">C++</option>
      <option value="C">C</option>
      <option value="Java">Java</option>
      <option value="Python">Python</option>
    </select>
  )
}

export default Language
