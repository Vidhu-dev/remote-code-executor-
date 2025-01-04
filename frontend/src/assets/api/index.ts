// const baseURL = 'http://localhost:4000'
const baseURL = 'http://3.110.153.2:4000'

// const baseURL = 'https://remote-code-executor.onrender.com'
interface OutputData {
  stdout?: string
  stderr?: string
  err?: string
}

interface Socket {
  emit(event: string, data: string, callback?: () => void): void
}

/**
 * Updates the output state and emits the output to the socket if available.
 * @param d - The output data containing stdout, stderr, or err.
 * @param setOutput - A function to update the output state.
 * @param socket - The socket instance to emit events.
 */
const outputChange = (
  d: OutputData,
  setOutput: (output: string) => void,
  socket?: Socket
): void => {
  console.log('Output change triggered')
  const output = d.stdout || d.stderr || d.err

  if (output) {
    setOutput(output)

    if (socket) {
      socket.emit('sendOutput', output, () => {
        console.log('Output change socket event triggered')
      })
    }
  }
}

/**
 * Handles the code execution request by sending the code, input, and selected language to the server.
 * @param code - The source code to execute.
 * @param input - The input data for the code.
 * @param selectedLanguage - The programming language of the code.
 * @param setOutput - A function to update the output state.
 * @param socket - The socket instance to emit events.
 */
function handleCode(
  code: string,
  input: string,
  selectedLanguage: string,
  setOutput: (output: string) => void,
  socket?: Socket
): void {
  fetch(`${baseURL}/code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // credentials: "include", 
    body: JSON.stringify({
      code,
      input,
      lang: selectedLanguage,
    }),
  })
    .then((res) => {
      if (res.ok) {
        console.log('Code execution was successful')
      } else {
        console.error('Error during code execution')
      }
      return res.json()
    })
    .then((d: OutputData) => {
      console.log('The output is', d)
      if (d.stdout || d.stderr || d.err) {
        outputChange(d, setOutput, socket)
      }
    })
    .catch((err) => {
      console.error('Fetch error:', err)
    })
}

export default handleCode
