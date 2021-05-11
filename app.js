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

  var offset = [];

// for (let i = 0; i <= 73000; i++) {
//   if (i % 500 == 0 && i != 0) {
//   offset.push(i);
//    }
// };
    console.log("in" , offset);


    // await extractFrames({
    //   input: 'orig.mp4',
    //   output: './frames/frame-%d.png',
    //   fps: 10,
    // })

const fs = require('fs');
const dir = './frames';
var count = 0;
// for (let index = 1; index < 33; index++) {
//  await fs.rename('./uploaded/profile'+ index+ '.png','./frames/frame-'+ index+ '.png', (err) => {
//   if (err) throw err;
//   console.log('New image for user with id ');
// });
// }
// await fs.readdir(dir, (err, files) => {
//   console.log(files.length);
//   count = files.length

console.log(count);

// var images = [];
// for (let index = 0; index < count + 1; index++) {

//    if(index === 0){
//     for (let i = 0; i < 100; i++) {
//     //  images.push("frames/frame-" +  index + '.png')

//       images.push("uploaded/profile3.png");
      
      
//     }
//    }else if (index > 9) {
//     images.push("frames/frame-" +  index + '.png')

//    }
  
// }

// console.log(images)

  // ffmpeg('./frames/frame-%d.png')
  //   .noAudio()
  //   .outputOptions([
  //     '-s', 'hd1080'
  //   ])  
  //   .videoCodec('libx264')
  //   .fps(10)
  //   // .loop(0.2)
  //   .on('progress', (progress) => {
  //     console.log('Processing: ' + progress.percent + '% done');
  //   })
  //   .on('error', (err) => {
  //     console.error('Error during processing', err);
  //     // reject(err)
  //   })
  //   .on('end', () => {
  //     console.log('Processing finished !');
  //     // resolve()
  //   })
  //   .save('test.mp4', {end: true});

  ffmpeg('orig.mp4')
     .input('./uploaded/base.png')
     .input('./uploaded/last.png')
    //  .input('./uploaded/profile33.png')


     .complexFilter(
      [
        {
          "filter": "overlay",
          "options": {
            "enable": "between(t,0,3.1)",
            // "x": "810",
            // "y": "465"
          },
          "inputs": "[0:v][1:v]",
          "outputs": "tmp"
        },
        {
          "filter": "overlay",
          "options": {
            "enable": "between(t,93.05,99)",
            // "x": "810",
            // "y": "465"
          },
          "inputs": "[tmp][2:v]",
          "outputs": "tmp"
        }
      ], 'tmp')
      .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('error', (err) => {
        console.error('Error during processing', err);
        // reject(err)
      })
      .on('end', () => {
      console.log('Processing finished !');
      // resolve()
    })
         .save('test.mp4', {end: true});
// .output('outputfile.mp4')
  ;

  

// var images = [
//   'step1.jpeg',
//   'step2.jpeg',
//   // 'step3.jpg',
//   // 'step4.jpg'
// ]

var videoOptions = {
  fps: 100,
  loop: 0.2, // seconds
  transition: false,
  // transitionDuration: 1, // seconds
  // videoBitrate: 1024,
  // videoCodec: 'libx264',
  // size: '1080x1080?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  // pixelFormat: 'yuv420p'
}

// videoshow(images, videoOptions)
//   // .audio('song.mp3')
//   .save('video.mp4')
//   .on('start', function (command) {
//     console.log('ffmpeg process started:', command)
//   })
//   .on('error', function (err, stdout, stderr) {
//     console.error('Error:', err)
//     console.error('ffmpeg stderr:', stderr)
//   })
//   .on('end', function (output) {
//     console.error('Video created in:', output)
//   })
  // res.send('Hello World!')
// });
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