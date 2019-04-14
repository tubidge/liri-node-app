require("dotenv").config();
var inqr = require("inquirer");
var axios = require("axios");
var moment = require("moment");

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

console.log(moment().format('dddd'));

inqr.prompt([{
    name: "question",
    message: "What can I help you with? Type: concert-this, spotify-this-song, movie-this, or do-what-it-says.",
}]).then(function (resp) {
    if (resp.question === "concert-this") {
        concertSearch();
    } else if (resp.question === "spotify-this-song") {
        songSearch();
    } else if (resp.question === "movie-this") {
        movieSearch();
    } else if (resp.question === "do-what-it-says") {
        doWhatItSays();
    };
});

function concertSearch() {
    inqr.prompt([{
        name: "artist",
        message: "What artist/band?"
    }]).then(function (resp) {
        var artist = resp.artist;
        var url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
        axios.get(url).then(
            function (resp) {
                console.log(url)
                console.log(resp.data.length);
                console.log(`Venue: ${resp.data[0].venue.name}`);
                console.log(`Location: ${resp.data[0].venue.city}, ${resp.data[0].venue.region}, ${resp.data[0].venue.country}`);
                var date = resp.data[0].datetime;
                console.log(date);


            }
        )

    })
};