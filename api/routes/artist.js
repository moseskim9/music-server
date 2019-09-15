const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Artist = require("../../models/Artist");
const Release = require("../../models/Release");

// ROUTE TO GET ARTIST INFO GIVEN RELEASE TYPE (Extra Credit)
router.get("/type", async (req, res, next) => {
  try {
    const { type } = req.body;
    const releases = await Release.find({ type: type }).populate(
      "artists_id label_id"
    );
    const mapped_releases = releases.map(release => {
      const mapped_artists = release.artists_id.map(artist => {
        return {
          id: artist.id,
          name: artist.name,
          spotifyId: artist.spotifyId,
          genres: artist.genres
        };
      });
      return {
        artists: mapped_artists,
        release: {
          title: release.title,
          release_date: release.release_date,
          track_count: release.track_count,
          upc: release.upc,
          label: {
            id: release.label_id.id,
            name: release.label_id.name,
            distributor: release.label_id.distributor,
            region: release.label_id.region
          }
        }
      };
    });
    res.send(mapped_releases);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ROUTE TO GET ARTISTS GIVEN ARTIST NAME OR ID (The Original Instruction)
router.get("/", async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const artist = await Artist.findOne({ $or: [{ id: id }, { name: name }] });
    const artist_id = artist.id;

    // I decided to just do a seperate query on Artist above instead of doing a populate on 'artists_id' on Release since that would populate artist info on each release which would be redundant.
    const releases = await Release.find({
      artists: { $in: artist_id }
    }).populate("label_id");

    const { spotifyId, genres } = artist;
    const artist_name = artist.name;

    const mapped_releases = releases.map(release => {
      return {
        title: release.title,
        release_date: release.release_date,
        track_count: release.track_count,
        upc: release.upc,
        label: {
          distributor: release.label_id.distributor,
          name: release.label_id.name,
          region: release.label_id.region
        }
      };
    });

    const result = {
      name: artist_name,
      spotifyId: spotifyId,
      genres: genres,
      releases: mapped_releases
    };

    res.send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ROUTE TO POST ARTISTS
router.post("/", async (req, res, next) => {
  try {
    const { id, name, spotifyId } = req.body;
    const genres = req.body.genres;

    const artist = new Artist({
      _id: new mongoose.Types.ObjectId(),
      id: id,
      name: name,
      spotifyId: spotifyId,
      genres: genres
    });

    let saved = await artist.save();
    res.status(200).send(saved);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
