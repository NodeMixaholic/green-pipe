//Green Pipe Music
//by Samuel Lord
var express = require('express');
const usetube = require('usetube')
var path = require('path');
var app = express();


app.get('/greenpipe/', function(req, res){
    let term = req.query.q;
    let totalHTML = `<h1 align="center">GreenPipe - Based minimalist music.</h1>
    <form action="/greenpipe/" style="algin: center;" method="get" width="100%" align="center">
        <input type="text" width="100%" id="q" name="q" value="Enter your audio name here, default search is undefined"><br>
        <input type="submit" value="warp away.">
    </form> `;
    usetube.searchVideo(term).then(results => {
    results.videos.forEach(function(e,i) {
        totalHTML = `${totalHTML} <br> <a href="/greenpipe/playback?id=${results.videos[i].id}">${results.videos[i].title}</a>`
    });
    totalHTML = totalHTML.replace("undefined", "")
    res.status(200).send(totalHTML)
    });
});

app.get('/greenpipe/playback', function(req, res){
    let id = req.query.id
        res.status(200).send(`
        <h1 align="center">GreenPipe playing music. <br><h3>Refresh to replay. Close to stop.</h3></h1>
    <form action="/greenpipe/" style="algin: center;" method="get" width="100%" align="center">
        <input type="text" width="100%" id="q" name="q" value="Enter your audio name here, default search is undefined"><br>
        <input type="submit" value="warp away.">
    </form>
        <div style="position:relative;width:267px;height:25px;overflow:hidden;">
<div style="position:absolute;top:-276px;left:-5px">
<iframe width="1%" height="1%"
  src="https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=true&modestbranding=1&controls=0">
</iframe>
</div>
</div>
`)
});
app.use('/music', express.static(__dirname))
app.listen(30000, function() { console.log("Listening...") });
