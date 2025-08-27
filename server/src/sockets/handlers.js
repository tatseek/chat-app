const Message = require('../models/Message');

module.exports = function attach(io, socket) {
  console.log('⚡ Socket connected:', socket.id);

  socket.on('sendMessage', async ({ receiver, content }) => {
    const message = await Message.create({
      sender: socket.user.id,
      receiver,
      content
    });
    io.to(receiver).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
};

