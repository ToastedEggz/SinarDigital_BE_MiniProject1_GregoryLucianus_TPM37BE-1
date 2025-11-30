import { availableColors } from "../config/app.config.js";

//makes sure the user inputs the right data
export const validateBookmark = (req, res, next) => {
  const { title, color, page } = req.body;

  //title needs to be a string
  if (!title || typeof title !== "string" || title.trim().length < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  }

  //color needs to be one of the available colors
  if (!color || !availableColors.includes(color)) {
    return res.status(400).json({
      success: false,
      message: `Color is required and must be one of: ${availableColors.join(
        ", "
      )}`,
    });
  }

  //page needs to be a number
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Page must be an integer >= 1" });
  }

  next();
};
