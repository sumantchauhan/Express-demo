const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given Id was not found.");
  else res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

app.get("/api/posts/:year/:month/:day", (req, res) => {
  res.send(req.params);
});

app.get("/api/posts/:year/:month/:day", (req, res) => {
  res.send(req.query);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    res
      .status(404)
      .send("Name is required and should be minimum 3 characters.");
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.status(200).send(course);
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
