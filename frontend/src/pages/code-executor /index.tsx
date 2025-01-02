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
import Button from '../../components/Button'
import { i } from 'motion/react-client'
import { Play, Section } from 'lucide-react'

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
    <div className=" flex flex-col h-screen">
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {JoinRoomModal(roomInput, joinRoom)}
        </div>
      )}
      <Navbar />

      <div className=" px-4 py-2  flex flex-wrap items-center justify-between border border-gray-300">
        <div>
          <Button
            onClick={runCode}
            type="primary"
            className="flex items-center gap-2"
          >
            <Play size={16} /> Run
          </Button>{' '}
        </div>
        <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-2">
          {isSocketConnected ? (
            <>
              <span className="font-medium">Room ID:</span>

              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg"
                value={room}
                readOnly
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                onClick={() => navigator.clipboard.writeText(room)}
                type="secondary"
              >
                Copy
              </Button>
              <Button type="warning" onClick={leaveRoom}>
                Leave Room
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setUserName(nanoid(15))
                  setRoom(nanoid(10))
                  newUser = false
                }}
                type="primary"
              >
                Create Room
              </Button>
              <Button onClick={toggleModal} type="secondary">
                Join Room
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <section className="col-span-2">
          <Code mode={mode} code={code} socket={socket} setCode={setCode} />
        </section>
        <section className="grid grid-cols-1 gap-4 col-span-1">
          <Input input={input} setInput={setInput} socket={socket} />
          <Output output={output} />
        </section>
      </div>
    </div>
  )
}

export default CodeExecution
