import { readFile } from "node:fs/promises";
import { createServer } from "node:http";

const text = await readFile("notes.txt", "utf8");

createServer((req, res) => {
  res.end(text);
}).listen(3000);
