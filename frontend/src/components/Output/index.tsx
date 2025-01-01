import { FC } from 'react'

interface OutputProps {
  output: string
}

const Output: FC<OutputProps> = ({ output }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Output.txt</h2>
      </div>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
        readOnly
        value={output}
      ></textarea>
    </div>
  )
}

export default Output
