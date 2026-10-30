import express from "express";
import { bookmarks, isBookmark, isUpdateBookmark } from "./types";

const app = express();
const port = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Bookmark API");
});

app.get("/bookmarks", (req, res) => {
  const tag = req.query.tag;
  if (typeof tag === "string") {
    const filteredBookmarks = bookmarks.filter((b) => b.tag === tag.trim());
    res.status(200).json(filteredBookmarks);
    return;
  }

  res.json(bookmarks);
});

app.get("/bookmarks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Bad request" });
  }

  const bookmark = bookmarks.find((b) => b.id === id);

  if (!bookmark) {
    return res.status(404).json({ error: "Bookmark not found" });
  }

  return res.status(200).json(bookmark);
});

app.post("/bookmarks", (req, res) => {
  const bookmark = req.body;

  if (!bookmark.url) {
    return res.status(400).json({
      error: "Missing required field: url",
    });
  }

  if (!bookmark.title) {
    return res.status(400).json({
      error: "Missing required field: title",
    });
  }

  if (!isBookmark(bookmark)) {
    return res.status(400).json({ message: "Invalid bookmark" });
  }

  const bookmarkFound = bookmarks.find((b) => b.id === bookmark.id);

  if (bookmarkFound) {
    return res
      .status(404)
      .json({ error: `Bookmark with ID: ${bookmark.id} exists` });
  }

  bookmarks.push(bookmark);

  return res.status(201).json(bookmark);
});

app.patch("/bookmarks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Bad request" });
  }

  const index = bookmarks.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Bookmark to update not found" });
  }

  const bookmarkChanges = req.body;

  if (!isUpdateBookmark(bookmarkChanges)) {
    return res.status(400).json({ message: "Invalid bookmark" });
  }

  const updatedBookmark = { ...bookmarks[index], ...req.body, id };

  bookmarks[index] = updatedBookmark;

  return res.status(200).json(updatedBookmark);
});

app.delete("/bookmarks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Bad request" });
  }

  const index = bookmarks.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Bookmark not found" });
  }

  bookmarks.splice(index, 1);

  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
