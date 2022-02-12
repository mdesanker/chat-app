import express from "express";
import path from "path";

// App set up
const app = express();

// Static files
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(5000, () => console.log("Listening on port 5000"));
