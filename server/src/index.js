require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const { socketAuth } = require('./middleware/socketAuth');
const attachSocketHandlers = require('./sockets/handlers');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Chat API running 🚀'));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: true, credentials: true } });

io.use(socketAuth);
io.on('connection', (socket) => attachSocketHandlers(io, socket));

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ MongoDB connected');
  const port = process.env.PORT || 5000;
  server.listen(port, () => console.log(`🚀 Server running on ${port}`));
}
start();

