const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({ receiver: userId }).populate('sender', 'name');
  res.json(messages);
};

