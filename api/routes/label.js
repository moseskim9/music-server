const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Label = require("../../models/Label");

// ROUTE TO GET LABEL INFO GIVEN LABEL ID IN BODY
router.get("/id", async (req, res, next) => {
  try {
    const { id } = req.body;
    const labels = await Label.find({ id: id });
    res.send(labels);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ROUTE TO GET ALL THE LABELS
router.get("/", async (req, res, next) => {
  try {
    const labels = await Label.find();
    res.send(labels);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ROUTE TO POST NEW LABEL
router.post("/", async (req, res, next) => {
  try {
    const { id, name, distributor, region } = req.body;

    const label = new Label({
      _id: new mongoose.Types.ObjectId(),
      id: id,
      name: name,
      distributor: distributor,
      region: region
    });

    let saved = await label.save();
    res.status(200).send(saved);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
