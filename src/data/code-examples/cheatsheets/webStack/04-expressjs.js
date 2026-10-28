import express from "express";

const app = express();
app.use(express.json());

app.get("/api/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Ada" });
});

app.post("/api/users", (req, res) => {
  res.status(201).json(req.body);
});

app.listen(3000);
