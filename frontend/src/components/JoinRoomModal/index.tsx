import React, { FC, FormEvent, useState, useCallback } from 'react'
import Button from '../Button'

interface JoinRoomModalProps {
  /**
   * A mutable ref object pointing to a text input.
   * Used to store or retrieve room ID
   */
  roomInputRef: React.RefObject<HTMLInputElement>

  /**
   * Handler function for joining a room
   */
  onJoinRoom: (roomId: string) => void
}

const JoinRoomModal: FC<JoinRoomModalProps> = ({
  roomInputRef,
  onJoinRoom,
}) => {
  const [error, setError] = useState<string>('')

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (!roomInputRef.current) return

      const roomId = roomInputRef.current.value.trim()
      if (!roomId) {
        setError('Room ID is required.')
        return
      }

      setError('') // Clear any prior errors
      onJoinRoom(roomId) // Pass the valid roomId to the handler
    },
    [onJoinRoom, roomInputRef] // dependencies for useCallback
  )

  return (
    <div className="bg-slate-300 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomId" className="block font-semibold mb-2">
          Enter Room ID
        </label>
        <input
          id="roomId"
          ref={roomInputRef}
          type="text"
          placeholder="e.g. 123ABC"
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-blue-500"
          required
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Button type='primary'>Join Room</Button>
      </form>
    </div>
  )
}

export default JoinRoomModal
