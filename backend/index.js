import express from "express";


const app = express()
const port = 3300


app.use(express.json());


app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`)
});