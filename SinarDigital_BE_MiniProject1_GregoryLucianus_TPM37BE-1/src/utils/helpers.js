//jujur bagian ini di-chatgpt dan masih kurang ngerti gunanya but yes-
//guessing its to make sure that the input will be converted to something data.json can accept

export const tidyTitle = (title = "") =>
  title
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\-:,\.]/g, "");

export const tidyNotes = (notes = "") =>
  notes
    .toString()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(" ");

export const validateNumber = (v) => {
  const n = Number(v);
  return Number.isNaN(n) ? 1 : Math.floor(n);
};
