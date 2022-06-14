statusBathroom = "";
BathroomImg = "";
objectsBathroom = [];

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(650, 500);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model is Currently Initialized.");
    statusBathroom = true;
    objectDetector.detect(BathroomImg, gotResult);
}

function preload(){
    BathroomImg = loadImage("homepicture5.jpg");
}

function draw(){
    image(BathroomImg, 0, 0, 600, 450);

    if (statusBathroom != ""){
        for(i=0; i < objectsBathroom.length; i++){
            document.getElementById("status_label").innerHTML = "Status: Objects Detected";
            document.getElementById("statement").innerHTML = "There are 3 large objects, but the CoCoSSD Model detected one small object.";

            fill("blue");
            percentage = floor(objectsBathroom[i].confidence * 100);
            text(objectsBathroom[i].label + percentage + "%", objectsBathroom[i].x + 15, objectsBathroom[i].x + 15);
            noFill();
            stroke("blue");
            rect(objectsBathroom[i].x, objectsBathroom[i].y, objectsBathroom[i].width, objectsBathroom[i].height);
        }
    }
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objectsBathroom = result;
    }}