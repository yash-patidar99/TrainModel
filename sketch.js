let mobilenet;
let classifier;
let video;
let label = "";
let mobileButton;
let whistleButton;
let trainButton;
function modelReady() {
  console.log("Model is Ready !!!");
}

function videoReady() {
  console.log("Video is ready");
}
function whileTraining(loss) {
  if (loss == null) {
    console.log("Training Complete");
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
  } else {
    // console.log(results);
    label = result;
    classifier.classify(gotResults);
  }
}
// function imageReady() {
//   image(puffin, 0, 0, width, height);
// }
function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor("MobileNet", modelReady);
  classifier = mobilenet.classification(video, videoReady);

  phoneButton = createButton("happy");
  phoneButton.mousePressed(function () {
    classifier.addImage("happy");
  });
  whistleButton = createButton("sad");
  whistleButton.mousePressed(function () {
    classifier.addImage("sad");
  });
  trainButton = createButton("train");
  trainButton.mousePressed(function () {
    classifier.train(whileTraining);
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(label, 10, height - 20);
}
