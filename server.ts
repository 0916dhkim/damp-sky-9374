import * as express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("static"));
app.use(express.static("dist/browser"));

app.listen(
    port,
    () => console.log(`Damp Sky Listening at http://localhost:${port}`)
)