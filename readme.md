## LIRI (Language Interpretation & Recognition Interface)

LIRI is a simple command line interface app that can receive 4 pre-defined commands. In the screenshots below, the user input is shown in blue text.

* If you want to use this application, you must be bored. Additionally, you will need to supply your own .env file containing the following data, replacing the values with your own API keys:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

```

* Lastly, don't forget to `npm install` to install the necessary node packages.




1. When running liri.js, you will be presented with 4 input options: concert-this, spotify-this-song, movie-this, and do-what-it-says:
<img src="/images/initial-inquiry.PNG">

2. [concert-this]
Give LIRI the name of a musical band or artist to see a listing of upcoming concerts:
<img src="/images/concert-this-response.PNG">

3. [spotify-this-song]
Give LIRI the name of a song to see information about it:
<img src="/images/spotify-this-song-response.PNG">

4. [movie-this]
Give LIRI the name of a movie to see information about it:
<img src="/images/movie-this-response.PNG">

5. [do-what-it-says]
Don't ask questions, just do what it says:
<img src="/images/do-what-it-says-response.PNG">

6. If you happen to search for a song or a movie that cannot be found, a great recommendation will be provided for you.