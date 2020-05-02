import * as express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello, World!"));
app.listen(
    port,
    () => console.log(`Damp Sky Listening at http://localhost:${port}`)
)