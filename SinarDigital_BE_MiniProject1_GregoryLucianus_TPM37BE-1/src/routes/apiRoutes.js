import { Router } from "express";
import Bookmark from "../controllers/bookmarkController.js";
import { validateBookmark } from "../middlewares/validator.js";

const router = Router();

//CREATE bookmark
router.post("/bookmarks", validateBookmark, Bookmark.createBookmark);

//READ bookmarks (all/specific by id)
router.get("/bookmarks", Bookmark.getBookmarks);
router.get("/bookmarks/:id", Bookmark.getBookmarkById);

//UPDATE bookmark
router.put("/bookmarks/:id", validateBookmark, Bookmark.editBookmark);

//DELETE bookmark
router.delete("/bookmarks/:id", Bookmark.deleteBookmarkById);

export default router;
