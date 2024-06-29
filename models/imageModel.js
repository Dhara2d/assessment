const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaMetadataSchema = new Schema({
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
});
const imageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
      max: 20,
    },
    description: {
      type: String,
      required: [true, "Name field is required"],
    },
    mimeType: {
      type: Number,
    },
    mediaMetadata: mediaMetadataSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imageSchema);
