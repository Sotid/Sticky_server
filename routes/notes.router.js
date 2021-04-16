const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Note = require("../models/note.model");

router.get("/", (req, res) => {
  Note.find()
    .then((foundNotes) => {
      res.status(200).json(foundNotes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/add", (req, res) => {
  const { title, content } = req.body;
  Note.create({ title, content })
    .then((response) => {
      res.status(201).json(response);
    })

    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/edit/:id", (req, res, next) => {

  const { id } = req.params;
  const { title, content } = req.body;

  Note.findByIdAndUpdate(id, { title, content }, { new: true })
    .then((updated) => {
      res.json(updated);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res //  Bad Request
      .json({ message: "Specified id is not valid" });
    return;
  }

  Note.findById(id)
    .then((foundNote) => {
      res.status(200).json(foundNote);
    })
    .catch((err) => {
      res.res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Note.findByIdAndRemove(id)
    .then(() => {
      res
        .status(202)
        .json({ message: `Project with ${id} was removed successfully.` });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/add/:id/tag", (req, res) => {
  console.log("he");
  const { id } = req.params;

  const { tags } = req.body;
  console.log(req.body);
  Note.findByIdAndUpdate( id, { $push: { tag: tags }}, {new:true})

    .then((response) => {
      console.log(response);
      res.status(201).json(response)
    })
   

    .catch((err) => {
      res.status(500).json(err);
    });
});


module.exports = router;

