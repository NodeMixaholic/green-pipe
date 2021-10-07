//Green Pipe Music
//by Samuel Lord
var express = require('express')
const usetube = require('usetube')
const youtubeMp3Converter = require('youtube-mp3-converter')
var path = require('path')
var app = express();


app.get('/', function(req, res){
    let term = req.query.q;
    let totalHTML = `<h1 align="center">GreenPipe - Based minimalist music.</h1>
    <form action="/" style="algin: center;" method="get" width="100%" align="center">
        <input type="text" width="100%" id="q" name="q" value="Enter your audio name here, default search is undefined"><br>
        <input type="submit" value="warp away.">
    </form> `;
    usetube.searchVideo(term).then(results => {
    results.videos.forEach(function(e,i) {
        totalHTML = `${totalHTML} <br> <a href="/playback?id=${results.videos[i].id}">${results.videos[i].title}</a>`
    });
    totalHTML = totalHTML.replace("undefined", "")
    res.status(200).send(totalHTML)
    });
});

app.get('/playback', function(req, res){
    let id = req.query.id
    async function dlAndPlay() {
        //let mp3Name = `${id}-${Math.floor(Math.random() * 10000000)}`
        let mp3Name = `${id}`
        const convertLinkToMp3 = youtubeMp3Converter(path.join(__dirname, "music"))
        await convertLinkToMp3(`https://www.youtube.com/watch?v=${id}`, {
            title: `${mp3Name}`
        })
        let filepath = path.join(__dirname, "music", `${mp3Name}.mp3`);
        res.status(200).sendFile(filepath)
    }
    dlAndPlay()
});
app.use('/music', express.static(__dirname))
app.listen(30000, function() { console.log("GreenPipe is Listening...") });
