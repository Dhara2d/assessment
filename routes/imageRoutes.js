const express = require("express");
const Image = require("../models/imageModel");

const imageRouter = express.Router();

imageRouter.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ images, message: "GET all images" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

imageRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.status(200).json({ image, message: "GET all images" });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

imageRouter.post("/", async (req, res) => {
  try {
    const { name, description, mimeType, mediaMetadata } = req.body;
    console.log({ name, description, mimeType, mediaMetadata });
    const image = new Image(req.body);
    await image.save();
    res.status(200).json({ message: "Image saved successfully", image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

imageRouter.put("/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (image == null) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Image updated successfully", image });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", err: err.message });
  }
});

imageRouter.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (image == null) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Image deleted successfully", image });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", err: err.message });
  }
});

module.exports = imageRouter;
