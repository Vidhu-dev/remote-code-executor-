// Define the User and Room interfaces
interface User {
  socketId: string;
  username: string;
}

interface Room {
  roomName: string;
  users: User[];
}

// Rooms array to hold the active chat rooms
const rooms: Room[] = [];

/**
 * Adds a user to a room, creating the room if it does not exist.
 * @param params - The user's details including socketId, username, and room.
 * @returns The name of the room the user was added to.
 */
const userJoin = (params: { socketId: string; username: string; room: string }): string => {
  const { socketId, username, room } = params;
  console.log("userJoin triggered", room);

  const user: User = { socketId, username };

  const existingRoom = rooms.find((ele) => ele.roomName === room);
  if (existingRoom) {
    existingRoom.users.push(user);
    console.log("existing room and user pushed");
  } else {
    console.log("non existing room and user pushed");
    rooms.push({ roomName: room, users: [user] });
  }
  return room;
};

/**
 * Removes a user from a room. Deletes the room if it becomes empty.
 * @param socketId - The socket ID of the user to be removed.
 * @returns The user object of the removed user, or undefined if no user was found.
 */
const userLeave = (socketId: string): User | undefined => {
  let leaveUser: User | undefined;

  rooms.forEach((room, roomIndex) => {
    const userIndex = room.users.findIndex((user) => user.socketId === socketId);
    if (userIndex !== -1) {
      leaveUser = room.users[userIndex];
      room.users.splice(userIndex, 1); // Remove the user
      if (room.users.length === 0) {
        rooms.splice(roomIndex, 1); // Remove the room if empty
      }
    }
  });

  return leaveUser;
};

/**
 * Retrieves the users in a specific room.
 * @param roomId - The name of the room.
 * @returns An array of users in the room, or undefined if the room does not exist.
 */
const getRoomUsers = (roomId: string): User[] | undefined => {
  const room = rooms.find((room) => room.roomName === roomId);
  return room?.users;
};

/**
 * Retrieves the name of the room a user is currently in.
 * @param socketId - The socket ID of the user.
 * @returns The room name, or 'bogus' if the user is not found.
 */
const getUser = (socketId: string): string => {
  for (const room of rooms) {
    const user = room.users.find((user) => user.socketId === socketId);
    if (user) {
      return room.roomName;
    }
  }
  return "bogus";
};

// Export the functions for external usage
export { getUser, getRoomUsers, userJoin, userLeave };
