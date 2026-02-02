
// const Channel = require("../models/Channel");
// const axios = require("axios");

// /* ================= GET ALL CHANNELS ================= */
// exports.getChannels = async (req, res) => {
//   const channels = await Channel.find().sort({ createdAt: -1 });
//   res.json(channels);
// };

// /* ================= GET SINGLE CHANNEL ================= */
// exports.getChannel = async (req, res) => {
//   const channel = await Channel.findById(req.params.id);
//   res.json(channel);
// };

// /* ================= GET CATEGORIES ================= */
// exports.getCategories = async (req, res) => {
//   const categories = await Channel.distinct("category");
//   res.json(categories);
// };

// /* ================= CREATE ================= */
// exports.createChannel = async (req, res) => {
//   const channel = await Channel.create(req.body);
//   res.status(201).json(channel);
// };

// /* ================= UPDATE ================= */
// exports.updateChannel = async (req, res) => {
//   const channel = await Channel.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(channel);
// };

// /* ================= DELETE ================= */
// exports.deleteChannel = async (req, res) => {
//   await Channel.findByIdAndDelete(req.params.id);
//   res.json({ message: "Channel deleted" });
// };

// /* ================= VIEW TRACK ================= */
// exports.trackView = async (req, res) => {
//   const { action } = req.body;
//   const channel = await Channel.findById(req.params.id);

//   if (action === "start") channel.viewers += 1;
//   if (action === "end" && channel.viewers > 0) channel.viewers -= 1;

//   await channel.save();
//   res.json({ viewers: channel.viewers });
// };

// /* ================= 🔥 HLS PROXY (IMPORTANT) ================= */
// exports.getStream = async (req, res) => {
//   try {
//     const channel = await Channel.findById(req.params.id);
//     if (!channel) {
//       return res.status(404).json({ message: "Channel not found" });
//     }

//     const response = await axios.get(channel.streamUrl, {
//       responseType: "stream",
//     });

//     res.setHeader(
//       "Content-Type",
//       "application/vnd.apple.mpegurl"
//     );

//     response.data.pipe(res);
//   } catch (err) {
//     console.error("HLS Proxy Error:", err.message);
//     res.status(500).json({ message: "Stream proxy failed" });
//   }
// };
const Channel = require("../models/Channel");
const Category = require("../models/Category");
const axios = require("axios");

/* ================= GET ALL CHANNELS ================= */
exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ isActive: true })
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE CHANNEL ================= */
exports.getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("category", "name");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE ================= */
exports.createChannel = async (req, res) => {
  try {
    const channel = await Channel.create(req.body);
    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findByIdAndDelete(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json({ message: "Channel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= VIEW TRACK ================= */
exports.trackView = async (req, res) => {
  try {
    const { action } = req.body;
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (action === "start") channel.viewers += 1;
    if (action === "end" && channel.viewers > 0) channel.viewers -= 1;

    await channel.save();
    res.json({ viewers: channel.viewers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= 🔥 HLS STREAM PROXY ================= */
exports.getStream = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const response = await axios.get(channel.streamUrl, {
      responseType: "stream"
    });

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    response.data.pipe(res);
  } catch (err) {
    console.error("HLS Proxy Error:", err.message);
    res.status(500).json({ message: "Stream proxy failed" });
  }
};
