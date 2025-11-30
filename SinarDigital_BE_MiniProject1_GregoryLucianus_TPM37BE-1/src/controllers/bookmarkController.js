import fs from "fs";
import { tidyNotes, tidyTitle, validateNumber } from "../utils/helpers.js";

//to store bookmarks
let bookmarks = [];

//read data. If it doesnt exist, create empty array and file
try {
  const data = fs.readFileSync("./data/data.json", "utf-8");
  bookmarks = JSON.parse(data);
} catch (err) {
  bookmarks = [];
  if (!fs.existsSync("./data")) {
    fs.mkdirSync("./data", { recursive: true });
  }
  fs.writeFileSync("./data/data.json", "[]");
}

export default class Bookmark {
  //READ all bookmarks
  static getBookmarks(req, res) {
    return res.json(bookmarks);
  }
  //READ bookmark (specific to ID)
  static getBookmarkById(req, res) {
    const existingId = Number(req.params.id);
    const bookmark = bookmarks.find((b) => b.id === existingId);

    //If the bookmark ID doesn't exist, show this message
    if (!bookmark) {
      return res.status(404).json({ Message: "Bookmark not found" });
    }

    return res.json(bookmark);
  }
  //CREATE a bookmark
  static createBookmark(req, res) {
    console.log("=== CREATE BOOKMARK ===");
    console.log("Request body:", req.body);
    console.log("Body type:", typeof req.body);
    console.log("Is body undefined?", req.body === undefined);

    const { title, color, page, notes } = req.body;

    //create new ID
    const newId =
      bookmarks.length > 0 ? bookmarks[bookmarks.length - 1].id + 1 : 1;

    //create the object thing
    const newBookmark = {
      id: newId,
      title: tidyTitle(title),
      color: color,
      page: validateNumber(page),
      notes: tidyNotes(notes),
    };

    bookmarks.push(newBookmark);

    //write the new bookmark and stores into data
    fs.writeFile(
      "./data/data.json",
      JSON.stringify(bookmarks, null, 2),
      (err, data) => {
        if (err) {
          console.error("Write error:", err);
          return res.json(err);
        }
        console.log("Bookmark saved successfully!");
        return res.json({ Message: "Bookmark created" });
      }
    );
  }

  //UPDATE bookmark
  static editBookmark(req, res) {
    const existingId = Number(req.params.id);

    //locate bookmark by index
    const index = bookmarks.findIndex((b) => b.id === existingId);

    //if bookmark index doesnt exist
    if (index === -1) {
      return res.status(404).json({ Message: "Bookmark not found" });
    }

    const { title, color, page, notes } = req.body;

    //editing while keeping everything in the right format
    bookmarks[index] = {
      ...bookmarks[index],
      title: tidyTitle(title),
      color: color,
      page: validateNumber(page),
      notes: tidyNotes(notes),
    };

    //write the new bookmark and stores into data
    fs.writeFile(
      "./data/data.json",
      JSON.stringify(bookmarks, null, 2),
      (err, data) => {
        if (err) {
          console.error("Write error:", err);
          return res.json(err);
        }
        return res.json({ Message: "Bookmark updated" });
      }
    );
  }

  //Delete bookmark by index
  static deleteBookmarkById(req, res) {
    const existingId = Number(req.params.id);

    //locate bookmark by index
    const index = bookmarks.findIndex((b) => b.id === existingId);

    //if bookmark index doesnt exist
    if (index === -1) {
      return res.status(404).json({ Message: "Bookmark not found" });
    }

    //remove a bookmark
    bookmarks.splice(index, 1);

    //show the data that theres nothing there now
    fs.writeFile(
      "./data/data.json",
      JSON.stringify(bookmarks, null, 2),
      (err, data) => {
        if (err) {
          console.error("Write error:", err);
          return res.json(err);
        }
        return res.json({ Message: "Bookmark deleted" });
      }
    );
  }
}
