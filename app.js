const express = require('express');
const axios = require('axios'); // Changed from 'request' to 'axios'
const app = express();
const dotenv = require('dotenv');

dotenv.config();
app.set("view engine", "ejs");
app.use('/public', express.static('public'));

// Routes remain the same until /result
app.get("/", (req, res) => {
    res.render("home");
});

// Modified /result route with axios
app.get("/result", async (req, res) => {
    try {
        const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`;
        const response = await axios.get(url);
        res.render("result", { movieData: response.data });
    } catch (error) {
        console.error(error);
        res.send("Uh oh error");
    }
});

// Modified /result/:id route with axios
app.get("/result/:id", async (req, res) => {
    try {
        const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`;
        const response = await axios.get(url);
        const data = response.data;
        const imageUrl = data.Poster === 'N/A' ? '/public/images/placeholder.png' : data.Poster;
        res.render("aboutmovie", { movieData: data, imageUrl: imageUrl });
    } catch (error) {
        console.error(error);
        res.send("Uh oh error");
    }
});

// Keep other routes the same
app.get("/about", (req, res) => {
    const aboutMeInfo = {
        name: "purushotham",
        
    };
    res.render("about", { aboutMeInfo });
});

app.get("*", (req, res) => {
    res.send("Go back! Illegal response");
});

app.listen(3000, () => {
    console.log(`Server has started at port `);
});