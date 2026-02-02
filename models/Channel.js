// const mongoose = require("mongoose");

// const channelSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: String,
//     category: { type: String, required: true },
//     streamUrl: { type: String, required: true },
//     thumbnail: String,
//     viewers: { type: Number, default: 0 },
//     isActive: { type: Boolean, default: true }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Channel", channelSchema);
const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",     // 🔥 RELATION
      required: true
    },

    streamUrl: {
      type: String,
      required: true
    },

    thumbnail: {
      type: String
    },

    viewers: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Channel", channelSchema);
