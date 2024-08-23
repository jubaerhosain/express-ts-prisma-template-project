const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const https = require("https");

// api url
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "your-api-key";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", (req, res) => {
    console.log(req.body);

    const url = `${apiUrl}?q=${req.body.cityName}&APPID=${apiKey}`;
    // send api request to another server
    https.get(url, (response) => {
            let data = "";

            // A chunk of data has been received.
            response.on("data", (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            response.on("end", () => {
                console.log(JSON.parse(data.toString()));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

    res.json({ data: "message" });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
