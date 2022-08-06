song1 = "";
song2 = "";
leftWristx = "";
leftWristy = "";
rightWristx = "";
rightWristy = "";
leftWristScore = 0;
leftSongStatus = "";
function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600, 550);
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
   console.log("poseNet is initialized!");
}
function draw()
{
    image(video, 0, 0, 600, 550);

    leftSongStatus = song1.isPlaying();

    fill("#8694c4");
    stroke("#8694c4");

    if(leftWristScore < 0.2)
    {
        circle(leftWristx, leftWristy, 20);
        
        song2.stop();
    }

    if(leftSongStatus == false)
    {
        song1.play();
        document.getElementById("songname").innerHTML = "Name of song!"
    }


}
function gotPoses(results)
{
    if(results.length > 0)
    {
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log(results)
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("right wrist x = " + rightWristx + "right wrist y = " + rightWristy);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristx + "left wrist y = " + leftWristy);
    }
}