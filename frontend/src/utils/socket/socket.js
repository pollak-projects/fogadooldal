import { io } from 'socket.io-client';

const socket = io('http://localhost:3300'); // A backend szerver címe
export default socket;