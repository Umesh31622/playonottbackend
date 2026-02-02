const Channel = require("../models/Channel");

exports.getChannels = async (req, res) => {
  const channels = await Channel.find().sort({ createdAt: -1 });
  res.json(channels);
};

exports.getChannel = async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  res.json(channel);
};

exports.getCategories = async (req, res) => {
  const categories = await Channel.distinct("category");
  res.json(categories);
};

exports.createChannel = async (req, res) => {
  const channel = await Channel.create(req.body);
  res.status(201).json(channel);
};

exports.updateChannel = async (req, res) => {
  const channel = await Channel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(channel);
};

exports.deleteChannel = async (req, res) => {
  await Channel.findByIdAndDelete(req.params.id);
  res.json({ message: "Channel deleted" });
};

exports.trackView = async (req, res) => {
  const { action } = req.body;
  const channel = await Channel.findById(req.params.id);

  if (action === "start") channel.viewers += 1;
  if (action === "end" && channel.viewers > 0) channel.viewers -= 1;

  await channel.save();
  res.json({ viewers: channel.viewers });
};
