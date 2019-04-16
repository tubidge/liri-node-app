require("dotenv").config();
var inqr = require("inquirer");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


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
                for (var i = 0; i < resp.data.length; i++) {
                    console.log(`\n------ Concert # ${i} ------`)
                    console.log(`Venue: ${resp.data[i].venue.name}`);
                    console.log(`Location: ${resp.data[i].venue.city}, ${resp.data[i].venue.region}, ${resp.data[i].venue.country}`);
                    var date = resp.data[i].datetime;
                    console.log(`Date: ${date}`);
                }
            }
        )
    })
};

function songSearch() {
    inqr.prompt([{
        name: "song",
        message: "What song?"
    }]).then(function (resp) {
        spotify.search({
            type: "track",
            query: resp.song,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            if (data.tracks.items[0]) {
                console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
                console.log(`Song Name: ${data.tracks.items[0].name}`)
                console.log(`Song Link: ${data.tracks.items[0].external_urls.spotify}`)
                console.log(`Album: ${data.tracks.items[0].album.name}`)
            } else {
                spotify.search({
                    type: "track",
                    query: "the sign",
                }, function (err, data) {
                    if (err) {
                        return console.log('Error occured: ' + err)
                    }
                    console.log(`Artist: ${data.tracks.items[8].album.artists[0].name}`);
                    console.log(`Song Name: ${data.tracks.items[8].name}`)
                    console.log(`Song Link: ${data.tracks.items[8].external_urls.spotify}`)
                    console.log(`Album: ${data.tracks.items[8].album.name}`)
                })
            }
        });
    })
};

function movieSearch() {
    inqr.prompt([{
        name: "movie",
        message: "What movie?"
    }]).then(function (resp) {
        var url = `http://www.omdbapi.com/?t=${resp.movie}&plot=short&apikey=trilogy`
        axios.get(url).then(
            function (resp) {
                if (resp.data["Title"]) {
                    console.log(`Title: ${resp.data["Title"]}`);
                    console.log(`Release Year: ${resp.data["Year"]}`);
                    console.log(`IMDB Rating: ${resp.data["Ratings"][0]["Value"]}`);
                    console.log(`Rotten Tomatoes Rating: ${resp.data["Ratings"][1]["Value"]}`);
                    console.log(`Produced In: ${resp.data["Country"]}`);
                    console.log(`Language: ${resp.data["Language"]}`);
                    console.log(`Plot: ${resp.data["Plot"]}`);
                    console.log(`Cast: ${resp.data["Actors"]}`);
                } else {
                    axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&plot=short&apikey=trilogy").then(
                        function (resp) {
                            console.log(url);
                            console.log(`Title: ${resp.data["Title"]}`);
                            console.log(`Release Year: ${resp.data["Year"]}`);
                            console.log(`IMDB Rating: ${resp.data["Ratings"][0]["Value"]}`);
                            console.log(`Rotten Tomatoes Rating: ${resp.data["Ratings"][1]["Value"]}`);
                            console.log(`Produced In: ${resp.data["Country"]}`);
                            console.log(`Language: ${resp.data["Language"]}`);
                            console.log(`Plot: ${resp.data["Plot"]}`);
                            console.log(`Cast: ${resp.data["Actors"]}`);
                        }
                    )
                }
            }
        )
    })
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        var output = data.split(",");
        spotify.search({
            type: "track",
            query: output[1],
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(`Artist: ${data.tracks.items[0].album.artists[0].name}`);
            console.log(`Song Name: ${data.tracks.items[0].name}`)
            console.log(`Song Link: ${data.tracks.items[0].external_urls.spotify}`)
            console.log(`Album: ${data.tracks.items[0].album.name}`)
        })
    })
};