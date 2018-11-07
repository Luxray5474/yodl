const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const logUp = require('log-update');
const padEnd = require('lodash.padend');
const os = require('os');

const log = require('./log.js');

module.exports = function(id, args) { //array element delegations are found in app.js
  return new Promise((resolve, reject) => {
    var start = Date.now();

    var filters = 'audioonly';
    var qualities = 'highestaudio';

    if(args[1] == "default") args[1] = `${os.homedir()}/Downloads/yodl/`;
    if(!args[1].includes('/', args[1].length - 1)) args[1] = `${args[1]}/`;

    if(args[2] == "default") args[2] = 'mp3'; else {filters = ''; qualities = '';}

    var stream = ytdl(id, { 
      quality: qualities,
      filter: filters
    });

    function soFar() {
      return((Date.now() - start) / 1000 + 's');
    }

    ytdl.getBasicInfo(id)
    .then(info => {
      var videoTitle = info.player_response.videoDetails.title;
      var videoLength = info.player_response.videoDetails.lengthSeconds;

      log.info(`${soFar()} - title "${videoTitle}" retrieved`);
      log.info(`${soFar()} - length is ${videoLength}s`);

      ffmpeg(stream)
      .on('start', () => {
        log.info(`${soFar()} - spawned video to ffmpeg stream`);
      })
      .on('codecData', data => {
        log.info(`${soFar()} - media format is [${data.format}]`);
        log.info(`${soFar()} - audio codec is [${data.audio}]`);
      })
      .on('progress', progress => {
        var a = progress.timemark.split('.')[0].split(':');
        var percentage = Math.floor((((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) / videoLength) * 100);

        logUp(`[INFO] progress[${padEnd('>'.repeat(percentage/3), 33, " ")}] ${padEnd(percentage)}% ${progress.timemark}`);
      })
      .on('end', () => {
        log.info(`${soFar()} - media successfully downloaded`);
        log.info('✔️ done');
        resolve();
      })
      .audioBitrate(128)
      .save(`${args[1]}${videoTitle.replace(/[\\/:"*?<>|]+/g, "_")} - ${id}.${args[2]}`).format(args[2])
      .on('error', err => {
        log.err(`${soFar()} - error: ${err.message}`);
        reject(err);
      })
    })
  })
}