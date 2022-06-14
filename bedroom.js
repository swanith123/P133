statusBedroom = "";
bedroomImg = "";
objectsBedroom = [];

function setup(){
    canvas = createCanvas(600, 450);
    canvas.position(650, 500);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status_label").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model is Currently Initialized.");
    statusBedroom = true;
    objectDetector.detect(bedroomImg, gotResult);
}

function preload(){
    bedroomImg = loadImage("homepicture2.jpg");
}

function draw(){
    image(bedroomImg, 0, 0, 600, 450);

    if (statusBedroom != ""){
        for(i=0; i < objectsBedroom.length; i++){
            document.getElementById("status_label").innerHTML = "Status: Objects Detected";
            document.getElementById("statement").innerHTML = "There are 2 large objects, but the CoCoSSD Model detected 1 large object.";

            fill("blue");
            percentage = floor(objects[i].confidence * 100);
            text(objectsBedroom[i].label + percentage + "%", objectsBedroom[i].x + 15, objectsBedroom[i].x + 15);
            noFill();
            stroke("blue");
            rect(objectsBedroom[i].x, objectsBedroom[i].y, objectsBedroom[i].width, objectsBedroom[i].height);
        }
    }
}

function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        objectsBedroom = result;
    }
}