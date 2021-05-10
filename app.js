const express = require('express')
const videoshow = require('videoshow');
var ffmpeg = require('ffmpeg');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const extractFrames = require('ffmpeg-extract-frames')
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });



const app = express();
const port = 8000;

app.get('/', multipartMiddleware , async (req, res) => {
    console.log("in");


await extractFrames({
      input: 'sample2.mp4',
      output: './frames/screenshot-%i.jpg',
      offsets: [
        0,
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
        1000,
        1100,
        1200,
        1300,
        1400,
        1500,
        1600,
        1700,
        1800,
        1900,
        2000,
        2100,
        2200
      ]
})

const fs = require('fs');
const dir = './frames';
var count = 0;
await fs.readdir(dir, (err, files) => {
  console.log(files.length);
  count = files.length

console.log(count);

var images = [];
for (let index = 0; index < count + 1; index++) {

   if(index === 0){
    for (let i = 0; i < 10; i++) {
      images.push("uploaded/profile.jpg");
      
    }
   }else{
    images.push("frames/screenshot-" +  index + '.jpg')

   }
  
}
// var images = [
//   'step1.jpeg',
//   'step2.jpeg',
//   // 'step3.jpg',
//   // 'step4.jpg'
// ]

var videoOptions = {
  fps: 100,
  loop: 0.1, // seconds
  transition: false,
  // transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

videoshow(images, videoOptions)
  // .audio('song.mp3')
  .save('video.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Video created in:', output)
  })
  // res.send('Hello World!')
});
res.json({
  'statusCode':200,
  'statusMessage':200,

})
});


app.get('/home', (req, res) => {
    console.log("in");
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});