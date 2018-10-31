const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const logUp = require('log-update');
const padEnd = require('lodash.padend');

const errorMsg = require('./errors.js');

const log = console.log;

module.exports = function(id) {
  var start = Date.now();

  var stream = ytdl(id, { 
  quality: 'highestaudio', 
  filter: 'audioonly' 
  });

  function soFar() {
    return((Date.now() - start) / 1000 + 's');
  }

  ytdl.getBasicInfo(id)
  .then(info => {
    var videoTitle = info.player_response.videoDetails.title;
    var videoLength = info.player_response.videoDetails.lengthSeconds;

    log(`[INFO] ${soFar()} - title [${videoTitle}] retrieved`);
    log(`[INFO] ${soFar()} - length is ${videoLength}s`);

    ffmpeg(stream)
    .on('start', commandLine => {
      log(`[ OK ] ${soFar()} - spawned video to ffmpeg stream`);
    })
    .on('codecData', data => {
      log(`[INFO] ${soFar()} - media format is [${data.format}]`);
      log(`[INFO] ${soFar()} - audio codec is [${data.audio}]`);
    })
    .on('progress', progress => {
      var a = progress.timemark.split('.')[0].split(':');
      var percentage = Math.floor((((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) / videoLength) * 100);

      logUp(`[INFO] progress[${padEnd('>'.repeat(percentage/3), 33, " ")}] ${padEnd(percentage)}% ${progress.timemark}`)
    })
    .on('end', () => {
      log(`[ OK ] ${soFar()} - media successfully downloaded`);
      log('[ OK ] ✔️ done');
      return;
    })
    .audioBitrate(128)
    .save(`./download/${videoTitle.replace(/[\\/:"*?<>|]+/g, "_")} - ${id}.mp3`)
    .on('error', err => log(`[OOPS] ${soFar()} - error: ${err.message}`))
  })
}