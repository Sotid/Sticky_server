const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    image: String,
    title: String,
    content: String,
    tag: { type: [String] },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
