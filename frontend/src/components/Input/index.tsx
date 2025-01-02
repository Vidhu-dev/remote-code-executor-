import React, { FC } from 'react'

interface InputProps {
  input: string
  setInput: (value: string) => void
  socket?: {
    emit: (event: string, data: string, callback?: () => void) => void
  }
}

const Input: FC<InputProps> = ({ input, setInput, socket }) => {
  /**
   * Handles changes in the input textarea and emits the input change event to the socket if available.
   * @param e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value
    setInput(newValue)

    if (socket) {
      socket.emit('sendInput', newValue, () =>
        console.log('Input change socket event triggered')
      )
    }
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md flex flex-col">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Input.txt</h2>
      </div>
      <textarea
        className="w-full p-3  grow border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
        placeholder="Enter your input here"
        value={input}
        onChange={handleChange}
      ></textarea>
    </div>
  )
}

export default Input
