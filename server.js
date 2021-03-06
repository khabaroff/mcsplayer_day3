var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mcsplayer');


var app = express();



app.use(express.static('build'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var Track = mongoose.model('Track', {spotifyId: String});



var router = express.Router()

router.route('/favorites/')
        .post(function(req, res) {
            var track = new Track()
            track.spotifyId = req.body.spotifyId;

            track.save(function() {
            console.log('saved')
            })
        })

        .get(function(req, res) {
          Track.find(function(err, tracks) {
            res.json(tracks)
          })
        })

app.use('/api', router);

app.get('*', function (req, res) {
   res.sendFile('build/index.html', {root: __dirname});
});

app.listen(80, function () {
   console.log('Example app listening on port 80!');
});
