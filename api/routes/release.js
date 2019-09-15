const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Release = require("../../models/Release");

// ROUTE TO GET RELEASES GIVE UPC IN THE BODY
router.get("/upc", async (req, res, next) => {
  try {
    const { upc } = req.body;
    const releases = await Release.find({ upc: { $in: upc } }).populate(
      "artists_id"
    );
    res.send(releases);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ROUTE TO GET RELEASES BY TYPE OF ALBUM OR SINGLE IN THE BODY
router.get("/type", async (req, res, next) => {
  try {
    const { type } = req.body;
    const releases = await Release.find({ type: { $in: type } }).populate(
      "artists_id"
    );
    res.send(releases);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ROUTE TO GET ALL RELEASES
router.get("/", async (req, res, next) => {
  const releases = await Release.find();
  res.send(releases);
});

// ROUTE TO POST NEW RELEASE
router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      release_date,
      track_count,
      upc,
      label,
      type,
      label_id
    } = req.body;
    const artists = req.body.artists;
    const artists_id = req.body.artists_id;

    const release = new Release({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      release_date: release_date,
      track_count: track_count,
      upc: upc,
      artists: artists,
      artists_id: artists_id,
      label: label,
      label_id: label_id,
      type: type
    });

    let saved = await release.save();
    res.status(200).send(saved);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
