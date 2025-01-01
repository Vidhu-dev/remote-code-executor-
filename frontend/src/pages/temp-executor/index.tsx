import React, { useState, useEffect, useRef, FC } from 'react'
import Navbar from '../../components/Navbar'
import handleCode from '../../assets/api'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import Code from '../../components/Code'
import Output from '../../components/Output'
import Input from '../../components/Input'
import Language from '../../components/Language'
import Fileupload from '../../components/Fileupload'
import JoinRoomModal from '../../components/JoinRoomModal'

const ENDPOINT = 'http://localhost:4000'

const CodeExecution: FC = () => {
  const [code, setCode] = useState<string>('//you can enter your code here')
  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>(
    'Press the run button to see the output'
  )
  const [selectedLanguage, setSelectedLanguage] = useState<string>('cpp')
  const [mode, setMode] = useState<string>('c_cpp')
  const [room, setRoom] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [socket, setSocket] = useState<any>(null)
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const roomInput = useRef<HTMLInputElement | null>(null)
  let newUser = true

  useEffect(() => {
    if (room && userName) {
      setIsSocketConnected(true)
      setSocket(io(ENDPOINT))
    }
  }, [room, userName])

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', { userName, room }, () => {
        console.log(userName, room)
      })
      socket.on('joinRoom', (message: string) => {
        console.log('Join room listen ', message, code)
      })
      socket.on('sendCode', (message: string) => {
        console.log(message)
        setCode(message)
      })
      socket.on('sendInput', (message: string) => {
        console.log(message)
        setInput(message)
      })
      socket.on('sendLang', (message: string) => {
        console.log(message)
        setSelectedLanguage(message)
      })
      socket.on('sendOutput', (message: string) => {
        console.log(message)
        setOutput(message)
      })
    }
  }, [socket])

  const toggleModal = () => setModal(!modal)

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomInput.current?.value && roomInput.current.value.length === 10) {
      setRoom(roomInput.current.value)
      setUserName(nanoid(15))
    } else {
      console.log('Invalid room ID')
    }
    toggleModal()
  }

  const leaveRoom = () => {
    socket.emit('leaveRoom', { userName, room }, () => {
      console.log(userName, room)
    })
    socket.off('joinRoom')
    socket.off('sendCode')
    socket.off('sendInput')
    socket.off('sendOutput')
    socket.off('sendLang')
    socket.disconnect()
    setIsSocketConnected(false)
    setSocket(null)
    setRoom('')
    setUserName('')
  }

  const runCode = (e: React.FormEvent) => {
    e.preventDefault()
    handleCode(code, input, selectedLanguage, setOutput, socket)
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {JoinRoomModal(roomInput, joinRoom)}
        </div>
      )}
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-4">
        <section className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <button
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={runCode}
            >
              Run
            </button>
            <Fileupload
              setCode={setCode}
              setSelectedLanguage={setSelectedLanguage}
              setMode={setMode}
            />
            <Language
              selectedLanguage={selectedLanguage}
              socket={socket}
              setMode={setMode}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
          {isSocketConnected ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Room ID:</span>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg"
                  value={room}
                  readOnly
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => navigator.clipboard.writeText(room)}
                >
                  Copy
                </button>
              </div>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={leaveRoom}
              >
                Leave Room
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => {
                  setUserName(nanoid(15))
                  setRoom(nanoid(10))
                  newUser = false
                }}
              >
                Create Room
              </button>
              <button
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={toggleModal}
              >
                Join Room
              </button>
            </div>
          )}
          <Code mode={mode} code={code} socket={socket} setCode={setCode} />
        </section>
        <section className="flex flex-col gap-4 flex-1">
          <Input input={input} setInput={setInput} socket={socket} />
          <Output output={output} />
        </section>
      </div>
    </div>
  )
}

export default CodeExecution

